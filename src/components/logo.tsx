import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LinkodLogoProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function LinkodLogo({ className, ...props }: LinkodLogoProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "inline-flex h-6 max-h-6 min-h-0 w-auto items-start justify-start",
        className
      )}
      {...props}
      onClick={() => router.push("/")}
    >
      <img src="/logo.png" alt="Linkod Logo" className="h-full" />
    </div>
  );
}
