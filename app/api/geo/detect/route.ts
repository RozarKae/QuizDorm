import { NextRequest, NextResponse } from "next/server";
import { CurrencyManager } from "@/lib/billing/currencyManager";

export async function GET(request: NextRequest) {
  // 1. Check CDN & Edge geolocation headers
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-appengine-country");

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  let country = countryHeader ? countryHeader.trim().toUpperCase() : "";

  // 2. If running locally or private IP without CDN headers, detect via Accept-Language or fallback
  if (!country || country === "XX") {
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.includes("en-IN") || acceptLanguage.includes("hi") || acceptLanguage.includes("ta") || acceptLanguage.includes("ml")) {
      country = "IN";
    } else if (acceptLanguage.includes("en-GB")) {
      country = "GB";
    } else if (acceptLanguage.includes("en-US")) {
      country = "US";
    } else {
      country = "IN"; // Base QuizDorm Indian platform anchor
    }
  }

  const currency = CurrencyManager.mapCountryToCurrency(country);

  return NextResponse.json(
    {
      country,
      currency,
      ip: clientIp,
      baseCurrency: "INR",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    }
  );
}
