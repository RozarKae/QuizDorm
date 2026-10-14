import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individual teachers and small quiz clubs.",
      features: [
        "Up to 5 active quizzes",
        "Max 50 students per quiz",
        "Basic question types",
        "Instant score report",
        "Standard support",
      ],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro Institute",
      price: "$49",
      period: "/month",
      description: "Designed for coaching centers and high school departments.",
      features: [
        "Unlimited quizzes & questions",
        "Up to 1,000 active students",
        "Advanced Question Builder",
        "Live Competition Mode",
        "Real-time Leaderboard & Medals",
        "Priority Support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise School",
      price: "Custom",
      description: "Full institutional management for school networks.",
      features: [
        "Unlimited students & faculties",
        "Custom branding & domains",
        "Dedicated account manager",
        "LMS integration ready",
        "SLA & Enterprise security",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple & Transparent Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Flexible Plans for Every Scale
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Choose the right tier to host competitive quizzes, monitor progress, and inspire students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  tier.highlighted
                    ? "bg-indigo-600 text-white shadow-xl scale-105 border-2 border-indigo-500"
                    : "bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      tier.highlighted ? "text-white" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${
                      tier.highlighted ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span
                        className={`ml-1 text-sm font-medium ${
                          tier.highlighted ? "text-indigo-200" : "text-gray-500"
                        }`}
                      >
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <ul className="mt-8 space-y-4">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check
                          className={`w-4 h-4 mr-3 shrink-0 ${
                            tier.highlighted ? "text-emerald-300" : "text-emerald-500"
                          }`}
                        />
                        <span
                          className={
                            tier.highlighted ? "text-indigo-50" : "text-gray-700 dark:text-gray-300"
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <Link href="/auth/register">
                    <Button
                      className={`w-full py-6 rounded-xl text-sm font-semibold transition-all ${
                        tier.highlighted
                          ? "bg-white text-indigo-600 hover:bg-gray-100"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
