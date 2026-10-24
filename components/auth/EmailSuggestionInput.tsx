"use client";

import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const DEFAULT_EMAIL_DOMAINS = [
  "@quizdorm.com",
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@icloud.com",
  "@hotmail.com",
  "@school.edu",
  "@edu.in",
];

export interface EmailSuggestionInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  domains?: string[];
  showPills?: boolean;
  maxPills?: number;
  onValueChange?: (val: string) => void;
  containerClassName?: string;
}

export default function EmailSuggestionInput({
  domains = DEFAULT_EMAIL_DOMAINS,
  showPills = true,
  maxPills = 5,
  onValueChange,
  containerClassName,
  className,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder = "you@quizdorm.com",
  name = "email",
  id,
  ...restProps
}: EmailSuggestionInputProps) {
  const generatedId = useId();
  const inputId = id || `email-input-${generatedId}`;
  const datalistId = `email-suggestions-${generatedId}`;

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Controlled or uncontrolled support
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    String(defaultValue || "")
  );
  const currentValue = isControlled ? String(value || "") : internalValue;

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Parse username prefix and domain portion
  const atIndex = currentValue.indexOf("@");
  const hasAt = atIndex !== -1;
  const prefix = hasAt ? currentValue.slice(0, atIndex) : currentValue;
  const typedDomainPart = hasAt ? currentValue.slice(atIndex) : "";

  // Compute matching domains
  const matchingDomains = React.useMemo(() => {
    if (!hasAt) {
      return domains;
    }
    const query = typedDomainPart.toLowerCase();
    // If user typed "@", suggest all domains
    if (query === "@") {
      return domains;
    }
    // Filter domains starting with or matching the typed domain
    return domains.filter((d) => d.toLowerCase().startsWith(query));
  }, [domains, hasAt, typedDomainPart]);

  // If user has already entered an exact full domain (e.g. "user@gmail.com"), don't prompt dropdown
  const hasCompletedDomain = React.useMemo(() => {
    if (!hasAt || !typedDomainPart) return false;
    const lower = typedDomainPart.toLowerCase();
    return domains.some((d) => d.toLowerCase() === lower);
  }, [domains, hasAt, typedDomainPart]);

  const shouldShowDropdown =
    isFocused &&
    isOpen &&
    prefix.length > 0 &&
    matchingDomains.length > 0 &&
    !hasCompletedDomain;

  // Dispatch change both to standard React handlers and native form
  const applyEmailValue = useCallback(
    (newVal: string, placeCursorBeforeAt: boolean = false) => {
      if (!isControlled) {
        setInternalValue(newVal);
      }

      if (onValueChange) {
        onValueChange(newVal);
      }

      const inputEl = inputRef.current;
      if (inputEl) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeSetter?.call(inputEl, newVal);

        // Native input event for form listeners
        const event = new Event("input", { bubbles: true });
        inputEl.dispatchEvent(event);

        // If parent passed standard onChange
        if (onChange) {
          const syntheticEvent = {
            target: inputEl,
            currentTarget: inputEl,
            bubbles: true,
            cancelable: false,
            defaultPrevented: false,
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            persist: () => {},
            timeStamp: Date.now(),
            type: "change",
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }

        // Manage cursor position
        requestAnimationFrame(() => {
          inputEl.focus();
          if (placeCursorBeforeAt) {
            const atPos = newVal.indexOf("@");
            if (atPos !== -1) {
              inputEl.setSelectionRange(atPos, atPos);
            }
          } else {
            inputEl.setSelectionRange(newVal.length, newVal.length);
          }
        });
      }

      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [isControlled, onChange, onValueChange]
  );

  const handleSelectDomain = (domain: string) => {
    if (!currentValue) {
      // Empty input: fill domain and position cursor at start
      applyEmailValue(domain, true);
      return;
    }

    if (hasAt) {
      const cleanPrefix = prefix || "";
      applyEmailValue(`${cleanPrefix}${domain}`);
    } else {
      applyEmailValue(`${currentValue}${domain}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onValueChange) {
      onValueChange(val);
    }
    if (onChange) {
      onChange(e);
    }
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setIsOpen(true);
    if (onFocus) onFocus(e);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay closing to allow clicking suggestions
    setTimeout(() => {
      setIsFocused(false);
      setIsOpen(false);
    }, 200);
    if (onBlur) onBlur(e);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (shouldShowDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < matchingDomains.length - 1 ? prev + 1 : 0
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : matchingDomains.length - 1
        );
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        if (highlightedIndex >= 0 && highlightedIndex < matchingDomains.length) {
          e.preventDefault();
          handleSelectDomain(matchingDomains[highlightedIndex]);
          return;
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
    }

    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full space-y-1.5", containerClassName)}>
      <div className="relative">
        <Input
          ref={inputRef}
          id={inputId}
          name={name}
          type="email"
          autoComplete="email"
          list={datalistId}
          value={currentValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className={cn("w-full font-mono text-xs h-10 rounded-[3px]", className)}
          {...restProps}
        />

        {/* Floating Autocomplete Dropdown */}
        {shouldShowDropdown && (
          <div
            className="absolute left-0 right-0 top-full mt-1 z-50 overflow-hidden rounded-md border border-[rgba(240,160,180,0.25)] bg-[#140A0D] dark:bg-[#140A0D] light:bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_15px_rgba(255,77,109,0.15)] py-1 text-xs font-mono animate-in fade-in-50 zoom-in-95 duration-150"
            role="listbox"
          >
            <div className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-[#A0AEA5] border-b border-[rgba(240,160,180,0.12)] mb-1 flex items-center justify-between">
              <span>Domain Suggestions</span>
              <span className="text-[9px] opacity-70">↑↓ Navigate · ↵ Select</span>
            </div>
            {matchingDomains.map((domain, index) => {
              const suggestedFull = `${prefix}${domain}`;
              const isSelected = highlightedIndex === index;
              return (
                <button
                  type="button"
                  key={domain}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    handleSelectDomain(domain);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 flex items-center justify-between transition-colors cursor-pointer text-xs",
                    isSelected
                      ? "bg-[#FF4D6D]/20 text-[#FF4D6D] font-bold"
                      : "text-[#F2F7F3] hover:bg-[#FF4D6D]/15 hover:text-[#FF4D6D]"
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="truncate">
                    <span className="opacity-90">{prefix}</span>
                    <span className="text-[#FF4D6D] font-semibold">{domain}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#A0AEA5] opacity-60 ml-2 shrink-0">
                    Tab ⇥
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Suggestion Pills */}
      {showPills && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5] font-medium shrink-0">
            Suggested:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {domains.slice(0, maxPills).map((domain) => {
              const isActive = hasAt && typedDomainPart.toLowerCase() === domain.toLowerCase();
              return (
                <button
                  key={domain}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectDomain(domain);
                  }}
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-[3px] border transition-all cursor-pointer select-none",
                    isActive
                      ? "border-[#FF4D6D] bg-[#FF4D6D]/20 text-[#FF4D6D] font-bold shadow-[0_0_8px_rgba(255,77,109,0.25)]"
                      : "border-[rgba(240,160,180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#FF4D6D] hover:border-[#FF4D6D]/60 hover:bg-[#FF4D6D]/10"
                  )}
                  title={`Use ${domain}`}
                >
                  {domain}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Native HTML5 fallback datalist for browser autocomplete engines */}
      <datalist id={datalistId}>
        {domains.map((domain) => (
          <option key={domain} value={prefix ? `${prefix}${domain}` : domain} />
        ))}
      </datalist>
    </div>
  );
}
