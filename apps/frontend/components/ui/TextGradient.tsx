import { cn } from "@/lib/utils";

interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
  direction?:
    | "to-r"
    | "to-l"
    | "to-t"
    | "to-b"
    | "to-tr"
    | "to-tl"
    | "to-br"
    | "to-bl";
}

export const TextGradient = ({
  children,
  className,
  from = "from-primary",
  to = "to-blue-500",
  direction = "to-r",
}: TextGradientProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        `from-${from} to-${to} bg-gradient-${direction}`,
        className,
      )}
    >
      {children}
    </span>
  );
};
