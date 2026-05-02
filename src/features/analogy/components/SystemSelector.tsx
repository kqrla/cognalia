// horizontal selector showing every available analogy system as a chip.
// used on the home screen and the explanation screen header so the user
// can switch system per explanation, as required by the spec.

import { analogySystems, type AnalogySystemId } from "../systems";
import { SystemChip } from "./SystemChip";

type Props = {
  value: AnalogySystemId;
  onChange: (next: AnalogySystemId) => void;
  compact?: boolean;
};

export const SystemSelector = ({ value, onChange, compact }: Props) => {
  return (
    <div
      role="radiogroup"
      aria-label="analogy system"
      className="flex flex-wrap gap-2"
    >
      {analogySystems.map((system) => (
        <SystemChip
          key={system.id}
          system={system.id}
          selected={system.id === value}
          onClick={() => onChange(system.id)}
          size={compact ? "sm" : "md"}
        />
      ))}
    </div>
  );
};
