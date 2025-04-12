import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[hsl(var(--input))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:border-[hsl(var(--ring))] focus-visible:ring-[hsl(var(--ring))]/50 aria-invalid:ring-[hsl(var(--destructive))]/20 dark:aria-invalid:ring-[hsl(var(--destructive))]/40 aria-invalid:border-[hsl(var(--destructive))] dark:bg-[hsl(var(--input))]/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
