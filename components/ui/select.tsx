"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Select({
  id,
  label,
  options,
  value,
  onChange,
  error,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const selected = options.find((o) => o.value === value);
  const selectedIdx = options.findIndex((o) => o.value === value);

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIdx(-1);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIdx((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIdx((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
      if (e.key === "Enter" && focusedIdx >= 0) {
        e.preventDefault();
        onChange(options[focusedIdx].value);
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, focusedIdx, options, onChange, close]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    setFocusedIdx(selectedIdx);
  }, [open, selectedIdx]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    close();
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.28em] text-silver-300 transition-colors duration-500 ease-(--ease-cinema)"
      >
        {label}
      </label>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-label={label}
        onClick={handleToggle}
        className={cn(
          "w-full border-b pb-3 pt-2 text-left text-base transition-all duration-500 ease-(--ease-cinema) focus:outline-none focus-visible:outline-none",
          open
            ? "border-accent/40 bg-[var(--ink)]/30"
            : "border-(--hairline) bg-transparent hover:border-(--hairline-strong)",
        )}
      >
        <span
          className={cn(
            "block truncate transition-colors duration-500",
            selected ? "text-silver-50" : "text-silver-400/70",
          )}
        >
          {selected ? selected.label : "Selecionar"}
        </span>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-silver-400 transition-all duration-500 ease-(--ease-cinema)",
            open && "rotate-180 text-accent/60",
          )}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M2.5 4.25L5.5 7.25L8.5 4.25"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.97 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
            transition={{ duration: 0.25, ease }}
            className="absolute left-0 right-0 z-50 mt-1 origin-top overflow-hidden rounded-xl border border-(--hairline-strong) bg-ink-soft shadow-(--shadow-editorial)"
          >
            <ul
              ref={listRef}
              id={`${id}-listbox`}
              role="listbox"
              aria-label={label}
              className="py-1.5"
            >
              {options.map((option, idx) => {
                const isSelected = option.value === value;
                const isFocused = idx === focusedIdx;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setFocusedIdx(idx)}
                    className={cn(
                      "relative cursor-pointer px-4 py-2.5 text-sm transition-colors duration-200",
                      isSelected
                        ? "text-silver-50"
                        : "text-silver-300 hover:text-silver-50",
                      isFocused && !isSelected && "bg-ink/50",
                      isSelected && "bg-accent/8",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                          isSelected
                            ? "bg-accent/60"
                            : "bg-transparent",
                        )}
                      />
                      <span>{option.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {error ? (
        <p className="mt-2 text-xs text-silver-100">{error}</p>
      ) : null}
    </div>
  );
}
