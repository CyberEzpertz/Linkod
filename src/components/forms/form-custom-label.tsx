import { ReactNode } from "react";
import { FormLabel } from "../ui/form";

export function FormCustomLabel({
  children,
  optional = false,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <FormLabel className="capitalize">
      {children}{" "}
      {optional && (
        <span className="text-[13px] font-normal text-muted-foreground">
          (optional)
        </span>
      )}
    </FormLabel>
  );
}
