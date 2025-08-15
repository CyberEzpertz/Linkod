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
      className="bg-primary text-primary-foreground flex h-32 w-full flex-row items-center justify-between gap-4 rounded-xl p-6 text-xl font-semibold"
      onClick={() => router.push(href)}
    >
      {title}
      <div className="bg-secondary text-secondary-foreground rounded-full p-3">
        <ArrowRight className="size-6" />
      </div>
    </div>
  );
}
