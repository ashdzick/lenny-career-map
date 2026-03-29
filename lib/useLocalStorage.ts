"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Syncs with localStorage after mount so the first server and client renders match
 * (initialValue only), avoiding React hydration errors.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStored(JSON.parse(item) as T);
      }
    } catch {
      // keep initialValue
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next =
          typeof value === "function"
            ? (value as (prev: T) => T)(prev)
            : value;
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(next));
          }
        } catch {}
        return next;
      });
    },
    [key]
  );

  return [stored, setValue];
}
