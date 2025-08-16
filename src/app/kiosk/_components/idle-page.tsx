"use client";
import LinkodLogo from "@/components/logo";
import { useState } from "react";

interface IdlePageProps {}
export default function IdlePage({}: IdlePageProps) {
  const [isIdle, setIsIdle] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsIdle(false);
  };

  if (!isIdle) {
    return null; // or redirect to another page
  }

  return (
    <div
      className="bg-background absolute z-30 flex h-screen w-screen flex-col items-center justify-center gap-8 text-center"
      onClick={handleClick}
    >
      <LinkodLogo className="h-48 max-h-48" isDisabled />
      <div className="animate-pulse text-2xl font-semibold">
        Tap here to get started!
      </div>
    </div>
  );
}
