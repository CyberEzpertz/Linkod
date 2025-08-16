import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KioskHomepageButtonProps {
  title: string;
  onClick?: () => void;
  icon: LucideIcon;
  className?: string;
  textClassName?: string;
}
export default function KioskHomepageButton({
  title,
  onClick,
  icon: Icon,
  className,
  textClassName,
}: KioskHomepageButtonProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "border-border bg-card text-card-foreground hover:bg-primary/90 from-secondary/20 flex cursor-pointer flex-row items-center gap-4 rounded-xl border bg-linear-to-tr from-80% to-100% p-8 font-semibold transition-colors",
        className
      )}
    >
      <div className="bg-secondary text-secondary-foreground rounded-full p-4">
        <Icon className="size-8" />
      </div>
      <span className={cn("text-2xl tracking-tight", textClassName)}>
        {title}
      </span>
    </Card>
  );
}
