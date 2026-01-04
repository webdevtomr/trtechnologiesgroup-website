"use client";

import React, { useEffect, useState } from "react";

type TrueFocusProps = {
  text: string;
  intervalMs?: number;
  smallerLastWords?: number;
};

export function TrueFocus({ text, intervalMs = 700, smallerLastWords = 0 }: TrueFocusProps) {
  const words = text.split(" ").filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span className="tf-wrapper">
      <span className="tf-words">
        {words.map((word, index) => {
          const isActive = index === activeIndex;
          const isSmaller = smallerLastWords > 0 && index >= words.length - smallerLastWords;

          return (
            <span
              key={`${word}-${index}`}
              className={`tf-word ${
                isActive ? "tf-word-active" : "tf-word-blur"
              }`}
              style={isSmaller ? { fontSize: "0.65em" } : undefined}
            >
              {isActive && (
                <>
                  <span className="tf-corner tf-corner-tl" />
                  <span className="tf-corner tf-corner-tr" />
                  <span className="tf-corner tf-corner-bl" />
                  <span className="tf-corner tf-corner-br" />
                </>
              )}
              <span className="tf-word-text">{word}</span>
              {index !== words.length - 1 && <span className="tf-space">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </span>
  );
}
