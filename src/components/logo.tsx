import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LinkodLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
}
export default function LinkodLogo({
  className,
  isDisabled,
  ...props
}: LinkodLogoProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "inline-flex h-6 max-h-6 min-h-0 w-auto items-start justify-start",
        className
      )}
      {...props}
      onClick={() => {
        if (!isDisabled) router.push("/");
      }}
    >
      <img src="/logo.png" alt="Linkod Logo" className="h-full object-cover" />
    </div>
  );
}
