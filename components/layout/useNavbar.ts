"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function useNavbar() {
  const isScrolled = useScrollPosition(32);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  if (trackedPathname !== pathname) {
    setTrackedPathname(pathname);
    if (isMenuOpen) setIsMenuOpen(false);
  }

  useLockBodyScroll(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const isHome = pathname === "/";
  const isProjectDetail =
    pathname.startsWith("/portfolio/") && pathname !== "/portfolio";
  const isTransparent = isHome || isProjectDetail;

  return {
    isScrolled,
    isMenuOpen,
    isHome,
    isProjectDetail,
    isTransparent,
    pathname,
    toggleMenu,
    closeMenu,
  };
}
