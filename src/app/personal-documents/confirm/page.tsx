"use client";
// src/app/personal-documents/confirm/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";

export default function ConfirmNationalIdPage() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  // Editable fields state
  const [name, setName] = useState("Jose Angelo Sevilla Geronimo");
  const [dob, setDob] = useState("2004-04-19");
  const [licenseNumber, setLicenseNumber] = useState("NO1-25-011607");
  const [address, setAddress] = useState(
    "266, Samonte, Holy Spirit, Quezon City NCR. Second District, 1127"
  );
  const [expires, setExpires] = useState("2029-04-19");

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

  useEffect(() => {
    const img = localStorage.getItem("scannedIdImage");
    setImage(img);
    // eslint-disable-next-line
  }, []);

  const handleConfirm = () => {
    // Get existing extra documents from localStorage
    const extraDocs = JSON.parse(
      localStorage.getItem("extraDocuments") || "[]"
    );
    // Add the new document
    extraDocs.push({ ...newDocument, thumbnail: image });
    // Save back to localStorage
    localStorage.setItem("extraDocuments", JSON.stringify(extraDocs));
    // Redirect to personal documents page
    window.location.href = "/personal-documents";
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="flex w-full flex-col items-center justify-center p-4">
        <Card className="mx-auto mt-6 flex w-full max-w-md flex-col items-center gap-6 p-6">
          {image ? (
            <img
              src={image}
              alt="Scanned Driver's License"
              className="h-40 w-64 rounded border object-cover"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-40 w-64 items-center justify-center rounded border">
              No image captured
            </div>
          )}
          <div className="flex w-full flex-col gap-2">
            <div className="text-lg font-bold">OCR Results (Editable)</div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-name">Name:</Label>
                <Input
                  id="edit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="edit-name"
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
          >
            Confirm and Add Document
          </Button>
        </Card>
      </div>
    </div>
  );
}
