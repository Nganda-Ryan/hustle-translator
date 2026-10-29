"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import type { RankColors } from "@/lib/types/hustle";

type Props = {
  active: boolean;
  colors: RankColors;
};

export function ConfettiBurst({ active, colors }: Props) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      return;
    }

    const palette = [
      colors.primary,
      colors.secondary,
      colors.accent,
      "#C6A77B",
      "#8B6914",
    ];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.55 },
      colors: palette,
    });

    const sideBurst = window.setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: palette,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: palette,
      });
    }, 250);

    return () => window.clearTimeout(sideBurst);
  }, [active, colors]);

  return null;
}
