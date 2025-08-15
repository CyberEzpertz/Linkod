"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function KioskFaqPage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-12">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-8">
        <button
          className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-2 self-start transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
          Back
        </button>
        <h1 className="mb-2 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>
              What’s a Barangay Clearance for?
            </AccordionTrigger>
            <AccordionContent>
              It shows you or your business has no pending disputes and follows
              barangay rules. It’s needed for jobs, permits, and other official
              transactions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>
              What are the basic requirements?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-1 pl-5">
                <li>Valid ID</li>
                <li>Proof of residency (bill, lease, or ID with address)</li>
                <li>Cedula (current year)</li>
                <li>Extra documents depending on the certificate type</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>
              Can I apply for business documents here?
            </AccordionTrigger>
            <AccordionContent>
              Yes! For a new business or renewal, just prepare your DTI/SEC
              registration, lease or ownership proof, Cedula for the business,
              and fees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>What’s a Barangay Cedula?</AccordionTrigger>
            <AccordionContent>
              It’s your Community Tax Certificate — used for ID and tax
              purposes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger>How much are the fees?</AccordionTrigger>
            <AccordionContent>
              Fees depend on the document. You’ll see the exact amount before
              you confirm your application.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-6">
            <AccordionTrigger>Who can I ask for help?</AccordionTrigger>
            <AccordionContent>
              Our Help Desk right here at the barangay hall.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
