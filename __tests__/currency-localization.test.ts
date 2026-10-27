import assert from "node:assert";
import { describe,it } from "node:test";
import { CurrencyManager } from "../lib/billing/currencyManager";
import { SUBSCRIPTION_PLANS } from "../lib/billing/subscriptionManager";

describe("INR Base Billing & Currency Localization Engine", () => {
  it("Verifies all subscription plans have valid base INR pricing", () => {
    assert.strictEqual(SUBSCRIPTION_PLANS.length, 5);

    const freePlan = SUBSCRIPTION_PLANS.find((p) => p.id === "free");
    assert.strictEqual(freePlan?.priceMonthlyINR, 0);
    assert.strictEqual(freePlan?.priceAnnualINR, 0);

    const basicPlan = SUBSCRIPTION_PLANS.find((p) => p.id === "basic");
    assert.strictEqual(basicPlan?.priceMonthlyINR, 99);
    assert.strictEqual(basicPlan?.priceAnnualINR, 990);

    const proPlan = SUBSCRIPTION_PLANS.find((p) => p.id === "professional");
    assert.strictEqual(proPlan?.priceMonthlyINR, 249);
    assert.strictEqual(proPlan?.priceAnnualINR, 2490);

    const instPlan = SUBSCRIPTION_PLANS.find((p) => p.id === "institution");
    assert.strictEqual(instPlan?.priceMonthlyINR, 649);
    assert.strictEqual(instPlan?.priceAnnualINR, 6490);

    const entPlan = SUBSCRIPTION_PLANS.find((p) => p.id === "enterprise");
    assert.strictEqual(entPlan?.priceMonthlyINR, 1599);
    assert.strictEqual(entPlan?.priceAnnualINR, 15990);
  });

  it("Accurately maps country codes to supported local currencies", () => {
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("IN"), "INR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("in"), "INR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("US"), "USD");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("GB"), "GBP");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("AE"), "AED");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("SG"), "SGD");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("CA"), "CAD");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("AU"), "AUD");

    // Eurozone countries
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("DE"), "EUR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("FR"), "EUR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("IT"), "EUR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("ES"), "EUR");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("NL"), "EUR");

    // Unknown or undefined countries default to USD for international, or INR if empty
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("BR"), "USD");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency("ZA"), "USD");
    assert.strictEqual(CurrencyManager.mapCountryToCurrency(undefined), "INR");
  });

  it("Converts INR amounts with clean psychological rounding", () => {
    // ₹0 stays 0
    assert.strictEqual(CurrencyManager.convertINR(0, "USD"), 0);

    // ₹249 Pro plan converts cleanly
    const usdPrice = CurrencyManager.convertINR(249, "USD");
    assert.strictEqual(usdPrice, 2.99);

    const gbpPrice = CurrencyManager.convertINR(249, "GBP");
    assert.strictEqual(gbpPrice, 2.99);

    const eurPrice = CurrencyManager.convertINR(249, "EUR");
    assert.strictEqual(eurPrice, 2.99);

    const aedPrice = CurrencyManager.convertINR(249, "AED");
    assert.strictEqual(aedPrice, 11); // Zero-decimal currency rounded cleanly

    // INR retains exact amount
    assert.strictEqual(CurrencyManager.convertINR(249, "INR"), 249);
  });

  it("Formats amounts with proper currency symbols and localized grouping", () => {
    // INR formatting
    const inrFormatted = CurrencyManager.format(249, "INR");
    assert.strictEqual(inrFormatted, "₹249");

    const inrAnnualFormatted = CurrencyManager.format(2490, "INR");
    assert.strictEqual(inrAnnualFormatted, "₹2,490");

    // USD formatting
    const usdFormatted = CurrencyManager.format(2.99, "USD");
    assert.strictEqual(usdFormatted, "$2.99");

    // GBP formatting
    const gbpFormatted = CurrencyManager.format(2.99, "GBP");
    assert.strictEqual(gbpFormatted, "£2.99");

    // EUR formatting
    const eurFormatted = CurrencyManager.format(2.99, "EUR");
    assert.strictEqual(eurFormatted, "€2.99");

    // AED formatting
    const aedFormatted = CurrencyManager.format(11, "AED");
    assert.strictEqual(aedFormatted, "AED 11");
  });

  it("Provides unified convertAndFormat method", () => {
    assert.strictEqual(CurrencyManager.convertAndFormat(99, "INR"), "₹99");
    assert.strictEqual(CurrencyManager.convertAndFormat(249, "USD"), "$2.99");
    assert.strictEqual(CurrencyManager.convertAndFormat(649, "USD"), "$7.99");
  });
});
