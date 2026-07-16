"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { value: "10,000+", label: "Active Questions" },
    { value: "100+", label: "Registered Schools" },
    { value: "50,000+", label: "Happy Students" },
    { value: "1 Million+", label: "Answers Submitted" },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="text-center space-y-2"
            >
              <p className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-550">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
