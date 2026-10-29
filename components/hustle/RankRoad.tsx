"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { getMedailPath } from "@/lib/hustle/medailPath";
import type { Rank } from "@/lib/types/hustle";

type Props = {
  ranks: Rank[];
  currentLevel: number;
  forged: boolean;
};

export function RankRoad({ ranks, currentLevel, forged }: Props) {
  return (
    <ol id="road">
      {ranks.map((rank) => {
        const state =
          rank.level < currentLevel
            ? "done"
            : rank.level === currentLevel
              ? "cur"
              : "lock";
        return (
          <li
            key={rank.id}
            className={`step ${state}`}
            style={{ "--i": rank.level } as CSSProperties}
          >
            {forged ? (
              <Image
                src={getMedailPath(rank.level)}
                alt=""
                width={32}
                height={32}
                className="medail-thumb"
                style={{ width: 32, height: "auto" }}
                aria-hidden
              />
            ) : (
              <span className="num-badge" aria-hidden="true">
                {rank.level}
              </span>
            )}
            <span>{rank.level}</span>
          </li>
        );
      })}
    </ol>
  );
}
