"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceButtonProps {
  title: string;
  href: string;
}
export default function ServiceButton({ title, href }: ServiceButtonProps) {
  const router = useRouter();

  return (
    <div
      className="bg-primary text-primary-foreground flex h-20 flex-row items-center justify-between gap-2 rounded-xl p-4 font-semibold"
      onClick={() => router.push(href)}
    >
      {title}
      <div className="bg-secondary text-secondary-foreground rounded-full p-2">
        <ArrowRight className="size-4" />
      </div>
    </div>
  );
}
