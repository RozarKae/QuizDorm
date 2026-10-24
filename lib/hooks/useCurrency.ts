"use client";

import { useState, useEffect, useCallback } from "react";
import { CurrencyCode } from "@/lib/types/billing";
import { CurrencyManager, SUPPORTED_CURRENCIES, CurrencyConfig } from "@/lib/billing/currencyManager";

const STORAGE_KEY = "quizdorm_user_currency";
const COOKIE_NAME = "quizdorm_currency";

export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [detectedCountry, setDetectedCountry] = useState<string>("IN");
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // 1. Check if user already explicitly selected a currency
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      setCurrencyState(saved);
      setIsManualOverride(true);
      return;
    }

    // 2. Synchronous fast fallback via timezone heuristic (no flashing)
    const tzCountry = CurrencyManager.detectClientCountryFromTimezone();
    const tzCurrency = CurrencyManager.mapCountryToCurrency(tzCountry);
    setDetectedCountry(tzCountry);
    setCurrencyState(tzCurrency);

    // 3. Asynchronous network detection via server GeoIP API
    fetch("/api/geo/detect")
      .then((res) => res.json())
      .then((data) => {
        if (data?.currency && SUPPORTED_CURRENCIES[data.currency as CurrencyCode]) {
          // Only apply if user hasn't manually selected while request was pending
          const currentSaved = localStorage.getItem(STORAGE_KEY);
          if (!currentSaved) {
            setCurrencyState(data.currency as CurrencyCode);
            if (data.country) setDetectedCountry(data.country);
          }
        }
      })
      .catch(() => {
        // Retain timezone heuristic on error
      });
  }, []);

  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    if (!SUPPORTED_CURRENCIES[newCurrency]) return;
    setCurrencyState(newCurrency);
    setIsManualOverride(true);

    try {
      localStorage.setItem(STORAGE_KEY, newCurrency);
      document.cookie = `${COOKIE_NAME}=${newCurrency}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage unavailable
    }
  }, []);

  const resetToAutoDetect = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `${COOKIE_NAME}=; path=/; max-age=0;`;
    } catch {}
    setIsManualOverride(false);
    const tzCountry = CurrencyManager.detectClientCountryFromTimezone();
    const tzCurrency = CurrencyManager.mapCountryToCurrency(tzCountry);
    setCurrencyState(tzCurrency);
  }, []);

  const formatPrice = useCallback(
    (amountINR: number) => {
      return CurrencyManager.convertAndFormat(amountINR, currency);
    },
    [currency]
  );

  const convertPrice = useCallback(
    (amountINR: number) => {
      return CurrencyManager.convertINR(amountINR, currency);
    },
    [currency]
  );

  const config: CurrencyConfig = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.INR;

  return {
    currency,
    setCurrency,
    resetToAutoDetect,
    formatPrice,
    convertPrice,
    config,
    isManualOverride,
    detectedCountry,
    mounted,
    supportedCurrencies: Object.values(SUPPORTED_CURRENCIES),
  };
}
