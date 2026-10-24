import { CurrencyCode } from "@/lib/types/billing";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  ratePerINR: number; // 1 INR in target currency
  decimals: number;
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    ratePerINR: 1.0,
    decimals: 0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    ratePerINR: 0.012,
    decimals: 2,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    ratePerINR: 0.0111,
    decimals: 2,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    ratePerINR: 0.0095,
    decimals: 2,
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    name: "UAE Dirham",
    flag: "🇦🇪",
    ratePerINR: 0.0441,
    decimals: 0,
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    flag: "🇸🇬",
    ratePerINR: 0.0162,
    decimals: 2,
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    ratePerINR: 0.0165,
    decimals: 2,
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    flag: "🇦🇺",
    ratePerINR: 0.0185,
    decimals: 2,
  },
};

const EUROZONE_COUNTRIES = new Set([
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "FI", "PT", "GR", "LU", "EE", "LV", "LT", "SK", "SI", "CY", "MT"
]);

export class CurrencyManager {
  /**
   * Maps an ISO 2-letter country code (from GeoIP or header) to supported CurrencyCode
   */
  public static mapCountryToCurrency(countryCode?: string): CurrencyCode {
    if (!countryCode) return "INR"; // Base platform default
    const normalized = countryCode.trim().toUpperCase();

    if (normalized === "IN") return "INR";
    if (normalized === "US") return "USD";
    if (normalized === "GB") return "GBP";
    if (normalized === "AE") return "AED";
    if (normalized === "SG") return "SGD";
    if (normalized === "CA") return "CAD";
    if (normalized === "AU") return "AUD";
    if (EUROZONE_COUNTRIES.has(normalized)) return "EUR";

    // Global international default for countries outside the specific list
    return "USD";
  }

  /**
   * Fast client-side timezone-based country heuristic when server headers are unavailable
   */
  public static detectClientCountryFromTimezone(): string {
    if (typeof window === "undefined") return "IN";
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "IN";
      if (tz.includes("New_York") || tz.includes("Los_Angeles") || tz.includes("Chicago") || tz.includes("Denver")) return "US";
      if (tz.includes("London")) return "GB";
      if (tz.includes("Dubai")) return "AE";
      if (tz.includes("Singapore")) return "SG";
      if (tz.includes("Toronto") || tz.includes("Vancouver")) return "CA";
      if (tz.includes("Sydney") || tz.includes("Melbourne")) return "AU";
      if (tz.includes("Berlin") || tz.includes("Paris") || tz.includes("Rome") || tz.includes("Madrid") || tz.includes("Amsterdam")) return "DE";
    } catch {
      // Fallback
    }
    return "IN";
  }

  /**
   * Converts base INR amount into target currency with clean rounding
   */
  public static convertINR(amountINR: number, targetCurrency: CurrencyCode): number {
    if (amountINR <= 0) return 0;
    if (targetCurrency === "INR") return Math.round(amountINR);

    const config = SUPPORTED_CURRENCIES[targetCurrency] || SUPPORTED_CURRENCIES.USD;
    const rawConverted = amountINR * config.ratePerINR;

    if (config.decimals === 0) {
      // Round to nearest 5 or 10 for currencies like AED
      return Math.round(rawConverted);
    }

    // Clean psychological pricing (.99) for international fiat
    const floored = Math.floor(rawConverted);
    const candidate = floored + 0.99;
    return Number(candidate.toFixed(2));
  }

  /**
   * Formats an amount with its currency symbol and locale numbering
   */
  public static format(amount: number, currency: CurrencyCode): string {
    const config = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.INR;
    
    if (currency === "INR") {
      // Indian numbering system (e.g. 1,00,000)
      const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(Math.round(amount));
      return `${config.symbol}${formatted}`;
    }

    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(amount);

    return `${config.symbol}${formatted}`;
  }

  /**
   * Convenience helper to convert and format from INR in a single call
   */
  public static convertAndFormat(amountINR: number, targetCurrency: CurrencyCode): string {
    const converted = this.convertINR(amountINR, targetCurrency);
    return this.format(converted, targetCurrency);
  }
}
