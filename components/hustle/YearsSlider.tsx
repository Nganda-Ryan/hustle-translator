"use client";

type Props = {
  value: number;
  min: number;
  max: number;
  labelId: string;
  yearOne: string;
  yearMany: string;
  onChange: (value: number) => void;
};

function formatYears(
  y: number,
  yearOne: string,
  yearMany: string
): string {
  return `${y} ${y > 1 ? yearMany : yearOne}`;
}

export function YearsSlider({
  value,
  min,
  max,
  labelId,
  yearOne,
  yearMany,
  onChange,
}: Props) {
  return (
    <div className="years">
      <input
        id="years"
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-labelledby={labelId}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <output htmlFor="years">
        {formatYears(value, yearOne, yearMany)}
      </output>
    </div>
  );
}
