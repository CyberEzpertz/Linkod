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
    <div className="border-border bg-primary text-primary-foreground flex flex-col gap-2 rounded-xl border p-4 font-semibold">
      <Icon className="size-8" />
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm leading-4">{title}</span>
        <div className="bg-secondary text-secondary-foreground rounded-full p-2">
          <ArrowRight className="size-4" />
        </div>
      </div>
    </div>
  );
}
