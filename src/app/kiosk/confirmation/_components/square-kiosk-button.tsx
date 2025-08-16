import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SquareKioskButtonsProps {
  title: string;
  onClick?: () => void;
  icon: LucideIcon;
  className?: string;
  textClassName?: string;
}
export default function SquareKioskButton({
  title,
  onClick,
  icon: Icon,
  className,
  textClassName,
}: SquareKioskButtonsProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "border-border bg-card text-card-foreground hover:bg-primary/90 from-secondary/20 flex cursor-pointer flex-col items-center gap-8 rounded-xl border bg-linear-to-tr from-80% to-100% p-16 font-semibold transition-colors",
        className
      )}
    >
      <div className="bg-secondary text-secondary-foreground rounded-full p-8">
        <Icon className="size-20" />
      </div>
      <span className={cn("text-2xl leading-4", textClassName)}>{title}</span>
    </Card>
  );
}
