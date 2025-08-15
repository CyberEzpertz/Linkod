import { ArrowRight, LucideIcon } from "lucide-react";

interface HomepageButtonProps {
  title: string;
  onClick?: () => void;
  icon: LucideIcon;
}
export default function HomepageButton({
  title,
  onClick,
  icon: Icon,
}: HomepageButtonProps) {
  return (
    <div
      onClick={onClick}
      className="border-border bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer flex-col gap-2 rounded-xl border p-4 font-semibold transition-colors"
    >
      <Icon className="size-8" />
      <div className="flex flex-row items-center justify-between gap-2">
        <span className="text-sm leading-4">{title}</span>
        <div className="bg-secondary text-secondary-foreground rounded-full p-2">
          <ArrowRight className="size-4" />
        </div>
      </div>
    </div>
  );
}
