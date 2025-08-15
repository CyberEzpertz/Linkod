import { ArrowRight, LucideIcon } from "lucide-react";

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
    <div
      onClick={onClick}
      className={`border-border bg-primary text-primary-foreground hover:bg-primary/90 flex h-full w-full cursor-pointer flex-row items-center gap-8 rounded-xl border p-8 font-semibold transition-colors ${className ?? ''}`}
    >
      <Icon className="size-12" />
      <span className="text-2xl">{title}</span>
      <div className="ml-auto bg-secondary text-secondary-foreground rounded-full p-2">
        <ArrowRight className="size-6" />
      </div>
    </div>
  );
}
