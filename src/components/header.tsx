import { Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {}
export default function Header({}: HeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground inline-flex w-full items-center p-4">
      <span>E-Lingkod</span>
      <div className="ml-auto inline-flex gap-2">
        <Button size="icon" variant="secondary">
          <Bell className="size-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
