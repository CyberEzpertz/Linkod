"use client";
import { useEffect, useState } from "react";
// src/app/personal-documents/page.tsx
import Header from "@/components/header";
import PersonalDocumentList from "@/components/personal-documents/PersonalDocumentList";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const staticDocuments = [
  {
    id: "1",
    name: "Philippine Passport",
    type: "Passport",
    thumbnail: "/passport.jpg",
    issued: "2022-01-15",
    expires: "2032-01-15",
    description: "Official government-issued passport."
  },
  {
    id: "2",
    name: "Birth Certificate",
    type: "Certificate",
    thumbnail: "/birth-certificate.jpg",
    issued: "2000-08-15",
    expires: "",
    description: "PSA-issued birth certificate."
  }
];

export default function PersonalDocumentsPage() {
  const [allDocuments, setAllDocuments] = useState(staticDocuments);

  useEffect(() => {
    // Get extra documents from localStorage
    const extraDocs = JSON.parse(localStorage.getItem("extraDocuments") || "[]");
    // Merge static and extra documents
    setAllDocuments([...staticDocuments, ...extraDocs]);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <h2 className="font-bold text-xl">Personal Documents</h2>
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full flex items-center gap-2"
        >
          <a href="/personal-documents/scan">
            <Camera className="size-5" />
            Scan National ID
          </a>
        </Button>
        <PersonalDocumentList documents={allDocuments} />
      </div>
    </div>
  );
}