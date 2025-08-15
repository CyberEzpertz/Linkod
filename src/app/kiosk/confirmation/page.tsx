"use client";

import HomepageButton from "@/components/homepage-button";
import { LogIn, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-12">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-12">
        <HomepageButton
          icon={LogIn}
          title="Sign in with ID"
          onClick={() => router.push("/kiosk/confirmation/scan")}
          className="h-[120px] w-[800px]"
        />
        <HomepageButton
          icon={User}
          title="Continue as Guest"
          onClick={() => router.push("/kiosk/services")}
          className="h-[120px] w-[800px]"
        />
      </div>
    </div>
  );
}
