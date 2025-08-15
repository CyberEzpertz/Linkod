"use client";

import { Bell, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LinkodLogo from "./logo";
import { Button } from "./ui/button";

interface HeaderProps {}
export default function Header({}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isNotificationsPage = pathname === "/notifications";
  const isSettingsPage = pathname === "/settings";

  const handleBellClick = () => {
    if (isNotificationsPage) {
      router.push("/");
    } else {
      router.push("/notifications");
    }
  };

  const handleSettingsClick = () => {
    if (isSettingsPage) {
      router.push("/");
    } else {
      router.push("/settings");
    }
  };

  return (
    <div className="inline-flex w-full items-center rounded-b-3xl p-4">
      <LinkodLogo />
      <div className="ml-auto inline-flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="relative"
          onClick={handleBellClick}
        >
          <Bell className="size-4" />
          {!isNotificationsPage && (
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
        <Button size="icon" variant="secondary" onClick={handleSettingsClick}>
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
