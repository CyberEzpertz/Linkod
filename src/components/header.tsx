"use client";

import { Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {}
export default function Header({}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isNotificationsPage = pathname === "/notifications";

  const handleBellClick = () => {
    if (isNotificationsPage) {
      router.back();
    } else {
      router.push("/notifications");
    }
  };

  return (
    <div className="bg-primary text-primary-foreground inline-flex w-full items-center rounded-b-3xl p-4 pb-8">
      <span>E-Lingkod</span>
      <div className="ml-auto inline-flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="relative"
          onClick={handleBellClick}
        >
          <Bell className="size-4" />
          {!isNotificationsPage && (
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
        <Button size="icon" variant="secondary">
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
