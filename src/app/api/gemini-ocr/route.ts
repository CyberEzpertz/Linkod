// src/app/api/gemini-ocr/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt for OCR
    const prompt = `
You are an OCR assistant specializing in Philippine driver's licenses and national IDs. 
Analyze this image and extract the following information in JSON format:

{
  "name": "Full name of the person",
  "dob": "Date of birth in YYYY-MM-DD format",
  "licenseNumber": "License or ID number",
  "address": "Complete address",
  "expires": "Expiry date in YYYY-MM-DD format"
}

Important instructions:
- Extract text exactly as it appears
- For dates, convert to YYYY-MM-DD format (e.g., "Apr 19, 2004" becomes "2004-04-19")
- If any field is not clearly visible or doesn't exist, use an empty string ""
- Return only the JSON object, no additional text
- Be as accurate as possible with the text extraction
`;

    // Prepare the image for Gemini
    const imagePart = {
      inlineData: {
        data: image,
        mimeType: mimeType || "image/png",
      },
    };

    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response
    try {
      // Clean the response text (remove any markdown code blocks or extra text)
      const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
      const ocrData = JSON.parse(cleanText);

      // Validate the structure
      const requiredFields = [
        "name",
        "dob",
        "licenseNumber",
        "address",
        "expires",
      ];
      const isValid = requiredFields.every(
        (field) =>
          ocrData.hasOwnProperty(field) && typeof ocrData[field] === "string"
      );

      if (!isValid) {
        throw new Error("Invalid OCR data structure");
      }

      return NextResponse.json({ ocrData });
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.error("Raw response:", text);

      return NextResponse.json(
        {
          error:
            "Failed to parse OCR results. Please try again or enter manually.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Gemini OCR error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `OCR processing failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred during OCR processing" },
      { status: 500 }
    );
  }
}
