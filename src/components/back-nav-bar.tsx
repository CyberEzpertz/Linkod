"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface BackNavBarProps {
  title: string;
  backLink?: string;
}
export default function BackNavBar({ title, backLink }: BackNavBarProps) {
  const router = useRouter();

  return (
    <div className="relative flex w-full items-center p-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => {
          if (backLink) {
            router.push(backLink);
          } else {
            router.back();
          }
        }}
      >
        <ArrowLeft className="size-4" />
      </Button>
      <span className="absolute right-[50%] w-max translate-x-[50%] font-bold">
        {title}
      </span>
    </div>
  );
}
