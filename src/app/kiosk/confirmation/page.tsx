"use client";

import BackNavBar from "@/components/back-nav-bar";
import { LogIn, User } from "lucide-react";
import { useRouter } from "next/navigation";
import SquareKioskButton from "./_components/square-kiosk-button";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen flex-col p-0">
      <BackNavBar title="Login Confirmation" />
      <div className="grid w-full grid-cols-2 items-center justify-center gap-12 p-32">
        <SquareKioskButton
          icon={LogIn}
          title="Sign in with ID"
          onClick={() => router.push("/kiosk/confirmation/scan")}
        />
        <SquareKioskButton
          icon={User}
          title="Continue as Guest"
          onClick={() => router.push("/kiosk/services")}
        />
      </div>
    </div>
  );
}
