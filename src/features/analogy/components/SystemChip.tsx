// chip used in the system selector and to show the current system on cards.
// the tint comes straight from the design system token for that system,
// so adding a new system is a one-place change.

import { cn } from "@/lib/utils";
import { getSystem, type AnalogySystemId } from "../systems";

type Props = {
  system: AnalogySystemId;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  showHint?: boolean;
};

export const SystemChip = ({
  system,
  selected,
  onClick,
  size = "md",
  showHint,
}: Props) => {
  const meta = getSystem(system);
  const Icon = meta.icon;
  const interactive = Boolean(onClick);

  return (
    <button
      type={interactive ? "button" : undefined}
      onClick={onClick}
      disabled={!interactive}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border transition-all",
        "text-left disabled:cursor-default",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        meta.tintClass,
        selected
          ? "border-foreground/40 ring-2 ring-primary/50 shadow-soft"
          : "border-transparent hover:border-foreground/20",
      )}
    >
      <Icon
        className={cn(
          "shrink-0 text-foreground/70",
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
        )}
      />
      <span className="font-medium text-foreground/90">{meta.label}</span>
      {showHint && (
        <span className="hidden text-foreground/55 sm:inline">
          {"  ·  "}
          {meta.hint}
        </span>
      )}
    </button>
  );
};
