"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ServiceButtonProps {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  disabled?: boolean;
}
export default function KioskServiceButton({
  title,
  href,
  icon: Icon,
  description,
  disabled,
}: ServiceButtonProps) {
  const router = useRouter();

  return (
    <div
      className={`flex h-40 flex-row items-center gap-4 rounded-xl p-4 ${
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "bg-secondary text-secondary-foreground"
      }`}
      onClick={() => !disabled && router.push(href)}
    >
      <div
        className={cn(
          "bg-primary/20 text-primary inline-flex items-center rounded-full p-4",
          disabled && "bg-muted-foreground text-muted"
        )}
      >
        {Icon && <Icon className="size-10" />}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        {description && (
          <span
            className={cn(
              "text-secondary-foreground/80",
              disabled && "text-muted-foreground"
            )}
          >
            {description}
          </span>
        )}
      </div>
      {!disabled && (
        <div className="ml-auto rounded-full">
          <ChevronRight className="size-4" />
        </div>
      )}
    </div>
  );
}
