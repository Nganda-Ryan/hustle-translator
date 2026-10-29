"use client";

import type { RoleOption } from "@/lib/types/hustle";
import { roleEmoji } from "@/lib/hustle/roleEmojis";

type Props = {
  options: RoleOption[];
  value: string;
  onChange: (value: string) => void;
  labelId: string;
};

function shortLabel(label: string): string {
  return label
    .replace(" Developer", "")
    .replace(" Engineer", "")
    .replace("Autre spécialité", "Autre");
}

export function RoleChipStrip({ options, value, onChange, labelId }: Props) {
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <div
        className="chip-strip"
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={(e) => {
          if (
            !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(
              e.key
            )
          ) {
            return;
          }
          e.preventDefault();
          const start = selectedIndex >= 0 ? selectedIndex : 0;
          const delta =
            e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
          const next = (start + delta + options.length) % options.length;
          onChange(options[next].value);
          const btn = e.currentTarget.querySelectorAll<HTMLButtonElement>(
            ".chip"
          )[next];
          btn?.focus();
        }}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className="chip"
              role="radio"
              aria-checked={checked}
              onClick={() => onChange(option.value)}
            >
              <span className="e" aria-hidden="true">
                {roleEmoji(option.value)}
              </span>
              {shortLabel(option.label)}
            </button>
          );
        })}
      </div>
      <p className="role-desc" aria-live="polite">
        {selected?.description ?? ""}
      </p>
    </>
  );
}
