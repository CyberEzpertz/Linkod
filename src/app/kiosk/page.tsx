"use client";

import HomepageButton from "@/components/homepage-button";
import { HelpCircle, Phone, Signature } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KioskPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-12">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-12">
        <HomepageButton
          icon={Signature}
          title="Digital Services"
          onClick={() => router.push("/kiosk/confirmation")}
          className="h-[120px] w-[800px]"
        />
        <HomepageButton
          icon={Phone}
          title="Call an Assistant"
          onClick={() => router.push("/kiosk/assistance")}
          className="h-[120px] w-[800px]"
        />
        <HomepageButton
          icon={HelpCircle}
          title="Frequently Asked Questions"
          onClick={() => router.push("/kiosk/faq")}
          className="h-[120px] w-[800px]"
        />
      </div>
    </div>
  );
}