import React from "react";
import { useEffect, useState } from "react";

export function Loading() {
  const [length, setLength] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setLength(length === 3 ? 1 : length + 1);
    }, 200);
    return () => clearInterval(interval);
  });
  return (
    <span style={{ width: 1 }}>
      {Array.from({ length }, () => ".").join("")}
    </span>
  );
}
