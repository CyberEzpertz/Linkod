"use client";
// src/app/kiosk/confirm/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import BackNavBar from "@/components/back-nav-bar";
import Image from "next/image";

interface OCRData {
  name: string;
  dob: string;
  licenseNumber: string;
  address: string;
  expires: string;
}

export default function KioskConfirmNationalIdPage() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
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

  // Crop image to white rectangle area (robustness: in case scan step changes)
  useEffect(() => {
    const processImage = async () => {
      const img = sessionStorage.getItem("scannedIdImage");
      if (!img) return;

      setImage(img);

      // Crop and zoom in on the center of the image using a canvas
      const cropToWhiteRect = async (dataUrl: string) => {
        return new Promise<string>((resolve) => {
          const image = new window.Image();
          image.onload = () => {
            // Rectangle dimensions (should match scan step)
            const RECT_WIDTH = 480;
            const RECT_HEIGHT = Math.round(RECT_WIDTH / 1.585); // ≈ 303

            // ZOOM FACTOR: how much to zoom in (2 = 2x zoom, crop smaller area)
            const ZOOM = 2;

            // Calculate the crop size (smaller area, zoomed in)
            const cropWidth = Math.floor(RECT_WIDTH / ZOOM);
            const cropHeight = Math.floor(RECT_HEIGHT / ZOOM);

            // Center crop coordinates
            const sx = Math.max(0, Math.floor((image.width - cropWidth) / 2));
            const sy = Math.max(0, Math.floor((image.height - cropHeight) / 2));

            const canvas = document.createElement("canvas");
            canvas.width = RECT_WIDTH;
            canvas.height = RECT_HEIGHT;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              // Draw the smaller center crop, scaled up to fill the preview
              ctx.drawImage(
                image,
                sx,
                sy,
                cropWidth,
                cropHeight,
                0,
                0,
                RECT_WIDTH,
                RECT_HEIGHT
              );
              resolve(canvas.toDataURL("image/png"));
            } else {
              resolve(dataUrl);
            }
          };
          image.src = dataUrl;
        });
      };

      // Crop before setting croppedImage
      const croppedImg = await cropToWhiteRect(img);
      setCroppedImage(croppedImg);

      setIsProcessing(true);
      setOcrError(null);

      try {
        const ocrData = await processImageWithGemini(croppedImg);

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

    // Get existing extra documents from sessionStorage
    const extraDocs = JSON.parse(
      sessionStorage.getItem("extraDocuments") || "[]"
    );
    // Add the new document
    extraDocs.push({ ...newDocument, thumbnail: croppedImage || image });
    // Save back to sessionStorage
    sessionStorage.setItem("extraDocuments", JSON.stringify(extraDocs));
    // Redirect to kiosk homepage or confirmation page
    window.location.href = "/kiosk";
  };

  return (
    <div className="bg-background min-h-screen">
      <BackNavBar title="Confirm ID Details" />
      <div className="flex w-full flex-col items-center justify-center p-8">
        <Card className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-center gap-8 p-10">
          {croppedImage ? (
            <Image
              src={croppedImage}
              alt="Scanned Driver's License (Cropped)"
              className="h-60 w-96 rounded border object-cover"
              width={384}
              height={240}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-60 w-96 items-center justify-center rounded border text-xl">
              {image ? "Loading cropped image..." : "No image captured"}
            </div>
          )}

          {isProcessing && (
            <div className="text-muted-foreground flex items-center gap-2 text-lg">
              <Loader2 className="h-6 w-6 animate-spin" />
              Processing image with AI...
            </div>
          )}

          {ocrError && (
            <div className="text-center text-lg text-red-500">
              OCR Error: {ocrError}
              <br />
              <span className="text-base">
                You can still manually enter the information below.
              </span>
            </div>
          )}

          <div className="flex w-full flex-col gap-4">
            <div className="text-2xl font-bold">
              {isProcessing ? "Processing..." : "OCR Results (Editable)"}
            </div>
            <div className="flex flex-col gap-4 text-lg">
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
                  className="text-lg"
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
                  className="text-lg"
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
                  className="text-lg"
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
                  className="text-lg"
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
                  className="text-lg"
                />
              </div>
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            className="mt-6 w-full py-6 text-2xl"
            onClick={handleConfirm}
            data-testid="confirm-btn"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              "Sign in with Information"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
}
