import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Award, Users, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              About <span className="text-indigo-600 dark:text-indigo-400">QuizDorm</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Empowering schools, quiz institutes, teachers, and students with a modern, competitive assessment platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                QuizDorm was built to bridge the gap between traditional test prep and gamified, competitive learning. We believe assessments should be engaging, insightful, and accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                From local classroom quizzes to national institute-wide olympiads, QuizDorm provides the tools needed to create, run, and analyze competitions seamlessly.
              </p>
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <Award className="w-8 h-8 text-indigo-600 mb-2" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Excellence</h3>
                  <p className="text-xs text-gray-500 mt-1">High-quality assessment design</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <Users className="w-8 h-8 text-emerald-500 mb-2" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Community</h3>
                  <p className="text-xs text-gray-500 mt-1">Connecting students & teachers</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <Zap className="w-8 h-8 text-amber-500 mb-2" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Speed</h3>
                  <p className="text-xs text-gray-500 mt-1">Instant scoring & leaderboards</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <ShieldCheck className="w-8 h-8 text-blue-500 mb-2" />
                  <h3 className="font-bold text-gray-900 dark:text-white">Security</h3>
                  <p className="text-xs text-gray-500 mt-1">Trusted data protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
