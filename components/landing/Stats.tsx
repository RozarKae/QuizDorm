"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { value: "10,000+", label: "AI Generated Questions", glow: "from-blue-500/20 to-transparent" },
    { value: "500+", label: "Partner Institutions", glow: "from-emerald-500/20 to-transparent" },
    { value: "150,000+", label: "Active Students", glow: "from-indigo-500/20 to-transparent" },
    { value: "50 Million+", label: "Answers Evaluated", glow: "from-amber-500/20 to-transparent" },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-8 rounded-[24px] bg-white/[0.05] backdrop-blur-[20px] border border-white/[0.08] text-center hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle ambient glow behind text */}
              <div className={`absolute inset-0 bg-gradient-to-b ${stat.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <p className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-3">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#B8BCC8]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
