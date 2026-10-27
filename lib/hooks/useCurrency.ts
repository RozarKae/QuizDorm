"use client";

import { CurrencyConfig,CurrencyManager,SUPPORTED_CURRENCIES } from "@/lib/billing/currencyManager";
import { CurrencyCode } from "@/lib/types/billing";
import { useCallback,useEffect,useState,useSyncExternalStore } from "react";

const STORAGE_KEY = "quizdorm_user_currency";
const COOKIE_NAME = "quizdorm_currency";
const emptySubscribe = () => () => {};

export function useCurrency() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && SUPPORTED_CURRENCIES[saved]) return saved;
      const tzCountry = CurrencyManager.detectClientCountryFromTimezone();
      return CurrencyManager.mapCountryToCurrency(tzCountry);
    }
    return "INR";
  });

  const [detectedCountry, setDetectedCountry] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return CurrencyManager.detectClientCountryFromTimezone();
    }
    return "IN";
  });

  const [isManualOverride, setIsManualOverride] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      return Boolean(saved && SUPPORTED_CURRENCIES[saved]);
    }
    return false;
  });

  useEffect(() => {
    if (isManualOverride) return;

    // Asynchronous network detection via server GeoIP API
    fetch("/api/geo/detect")
      .then((res) => res.json())
      .then((data) => {
        if (data?.currency && SUPPORTED_CURRENCIES[data.currency as CurrencyCode]) {
          const currentSaved = localStorage.getItem(STORAGE_KEY);
          if (!currentSaved) {
            setCurrencyState(data.currency as CurrencyCode);
            if (data.country) setDetectedCountry(data.country);
          }
        }
      })
      .catch(() => {});
  }, [isManualOverride]);

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
