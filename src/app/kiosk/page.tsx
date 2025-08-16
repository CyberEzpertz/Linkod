"use client";

import LinkodLogo from "@/components/logo";
import { HelpCircle, Phone, Settings, Signature } from "lucide-react";
import { useRouter } from "next/navigation";
import IdlePage from "./_components/idle-page";
import KioskHomepageButton from "./_components/kiosk-homepage-button";

export default function KioskPage() {
  const router = useRouter();

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="bg-secondary/30 absolute top-0 -z-10 h-64 w-full rounded-b-[80%]" />
      <IdlePage />
      <div className="flex flex-col gap-16">
        <LinkodLogo
          className="h-32 max-h-32 items-center justify-center"
          isDisabled
        />
        <div className="grid w-full grid-cols-2 flex-col items-center justify-center gap-4 p-32 pt-0">
          <KioskHomepageButton
            icon={Signature}
            title="Digital Services"
            onClick={() => router.push("/kiosk/confirmation")}
            className=""
          />
          <KioskHomepageButton
            icon={Phone}
            title="Call an Assistant"
            className=""
          />
          <KioskHomepageButton
            icon={HelpCircle}
            title="Frequently Asked Questions"
            onClick={() => router.push("/kiosk/faq")}
            className=""
          />
          <KioskHomepageButton
            icon={Settings}
            title="Settings"
            onClick={() => router.push("/kiosk/settings")}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
