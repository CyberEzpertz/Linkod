"use client";

import HomepageButton from "@/components/homepage-button";
import { Bug, Languages, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KioskSettingsPage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-12">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-12">
        <HomepageButton
          icon={Languages}
          title="Change Language"
          onClick={() => {}}
          className="h-[120px] w-[800px]"
        />
        <HomepageButton
          icon={Bug}
          title="Report a Bug"
          onClick={() => {}}
          className="h-[120px] w-[800px]"
        />
        <HomepageButton
          icon={Moon}
          title="Dark Mode"
          onClick={() => {}}
          className="h-[120px] w-[800px]"
        />
      </div>
    </div>
  );
}
