"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { value: "535", unit: "Items", label: "Verified Question Bank", status: "Active" },
    { value: "18", unit: "Fields", label: "Academic Knowledge Domains", status: "Audited" },
    { value: "100%", unit: "Traceable", label: "Source Page Verification", status: "Passed" },
    { value: "< 250ms", unit: "Latency", label: "Quiz Evaluation Speed", status: "Sub-Second" },
  ];

  return (
    <section className="py-20 relative z-10 border-b border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-[3px] bg-card border border-border flex flex-col justify-between shadow-xs hover:border-cobalt/40 transition-colors"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/80 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>Metric 0{idx + 1}</span>
                <span className="px-1.5 py-0.5 rounded-[2px] bg-acid/20 text-foreground border border-acid/40 font-bold">
                  {stat.status}
                </span>
              </div>

              <div className="py-4">
                <div className="flex items-baseline space-x-1.5">
                  <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight tabular-nums">
                    {stat.value}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground font-semibold">
                    {stat.unit}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/80">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
