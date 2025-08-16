"use client";
// src/app/personal-documents/confirm/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Header from "@/components/header";
import Image from "next/image";

interface OCRData {
  name: string;
  dob: string;
  licenseNumber: string;
  address: string;
  expires: string;
}

export default function ConfirmNationalIdPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const router = useRouter();

  // Editable fields state - start with empty values
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [expires, setExpires] = useState("");

  // Function to process image with Gemini
  const processImageWithGemini = async (
    imageDataUrl: string
  ): Promise<OCRData> => {
    try {
      // Convert data URL to base64 (remove data:image/png;base64, prefix)
      const base64Image = imageDataUrl.split(",")[1];

      const response = await fetch("/api/gemini-ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          mimeType: "image/png",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data.ocrData;
    } catch (error) {
      console.error("Gemini OCR error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const processImage = async () => {
      const img = sessionStorage.getItem("scannedIdImage");
      if (!img) return;

      setImage(img);
      setIsProcessing(true);
      setOcrError(null);

      try {
        const ocrData = await processImageWithGemini(img);

        // Update form fields with OCR results
        setName(ocrData.name || "");
        setDob(ocrData.dob || "");
        setLicenseNumber(ocrData.licenseNumber || "");
        setAddress(ocrData.address || "");
        setExpires(ocrData.expires || "");
      } catch (error) {
        setOcrError(
          error instanceof Error ? error.message : "Failed to process image"
        );
        console.error("OCR processing failed:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, []);

  const handleConfirm = () => {
    // Document data using editable fields
    const newDocument = {
      id: "new-" + Date.now(),
      name: "Driver's License",
      type: "ID Card",
      thumbnail: image || "/idcard.svg",
      issued: dob,
      expires: expires,
      description: `Scanned Driver's License for ${name}. License No: ${licenseNumber}, Address: ${address}`,
      ocr: {
        name,
        dob,
        licenseNumber,
        address,
        expires,
      },
    };

    // Get existing extra documents from localStorage
    const extraDocs = JSON.parse(
      sessionStorage.getItem("extraDocuments") || "[]"
    );
    // Add the new document
    extraDocs.push({ ...newDocument, thumbnail: image });
    // Save back to sessionStorage
    sessionStorage.setItem("extraDocuments", JSON.stringify(extraDocs));
    // Redirect to homepage
    router.push("/");
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="flex w-full flex-col items-center justify-center p-4">
        <Card className="mx-auto mt-6 flex w-full max-w-md flex-col items-center gap-6 p-6">
          {image ? (
            <Image
              src={image}
              alt="Scanned Driver's License"
              className="h-40 w-64 rounded border object-cover"
              width={256}
              height={160}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-40 w-64 items-center justify-center rounded border">
              No image captured
            </div>
          )}

          {isProcessing && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing image with AI...
            </div>
          )}

          {ocrError && (
            <div className="text-center text-sm text-red-500">
              OCR Error: {ocrError}
              <br />
              <span className="text-xs">
                You can still manually enter the information below.
              </span>
            </div>
          )}

          <div className="flex w-full flex-col gap-2">
            <div className="text-lg font-bold">
              {isProcessing ? "Processing..." : "OCR Results (Editable)"}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-name">Name:</Label>
                <Input
                  id="edit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="edit-name"
                  disabled={isProcessing}
                  placeholder={isProcessing ? "Processing..." : "Enter name"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-dob">Date of Birth:</Label>
                <Input
                  id="edit-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  data-testid="edit-dob"
                  disabled={isProcessing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-license">License Number:</Label>
                <Input
                  id="edit-license"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  data-testid="edit-license"
                  disabled={isProcessing}
                  placeholder={
                    isProcessing ? "Processing..." : "Enter license number"
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-address">Address:</Label>
                <Input
                  id="edit-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  data-testid="edit-address"
                  disabled={isProcessing}
                  placeholder={isProcessing ? "Processing..." : "Enter address"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-expires">Expiry:</Label>
                <Input
                  id="edit-expires"
                  type="date"
                  value={expires}
                  onChange={(e) => setExpires(e.target.value)}
                  data-testid="edit-expires"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            className="mt-4 w-full"
            onClick={handleConfirm}
            data-testid="confirm-btn"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm and Add Document"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
}
