"use client";

import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;
const mobileQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

const subscribers = new Set<() => void>();
let mediaQueryList: MediaQueryList | null = null;
let isMobileSnapshot = false;

function ensureMediaListener() {
  if (mediaQueryList || typeof window === "undefined") return;
  mediaQueryList = window.matchMedia(mobileQuery);
  isMobileSnapshot = mediaQueryList.matches;
  mediaQueryList.addEventListener("change", () => {
    isMobileSnapshot = mediaQueryList!.matches;
    subscribers.forEach((notify) => notify());
  });
}

function subscribe(notify: () => void) {
  ensureMediaListener();
  subscribers.add(notify);
  return () => subscribers.delete(notify);
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => isMobileSnapshot,
    () => false,
  );
}
