"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Avoid applying localStorage values that crash consumers (e.g. JSON `null`, or `{}`
 * when callers expect an array).
 */
function isCompatibleWithInitial<T>(parsed: unknown, initialValue: T): boolean {
  if (parsed === null || parsed === undefined) return false;
  if (Array.isArray(initialValue)) return Array.isArray(parsed);
  if (typeof initialValue === "object" && initialValue !== null) {
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
  }
  return typeof parsed === typeof initialValue;
}

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
        const parsed: unknown = JSON.parse(item);
        if (isCompatibleWithInitial(parsed, initialValue)) {
          setStored(parsed as T);
        }
      }
    } catch {
      // keep initialValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialValue is only used for shape checks; inline []/{} would churn deps every render
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
