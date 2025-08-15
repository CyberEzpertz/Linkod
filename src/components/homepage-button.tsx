import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface HomepageButtonProps {
  title: string;
  onClick?: () => void;
  icon: LucideIcon;
  className?: string;
}
export default function HomepageButton({
  title,
  onClick,
  icon: Icon,
  className,
}: HomepageButtonProps) {
  return (
    <Card
      onClick={onClick}
      className="border-border bg-card text-card-foreground hover:bg-primary/90 from-secondary/20 flex cursor-pointer flex-row items-center gap-2 rounded-xl border bg-linear-to-tr from-80% to-100% p-4 font-semibold transition-colors"
    >
      <div className="bg-secondary text-secondary-foreground self-start rounded-full p-2">
        <Icon className="size-4" />
      </div>
      <span className="text-sm leading-4">{title}</span>
    </Card>
  );
}
