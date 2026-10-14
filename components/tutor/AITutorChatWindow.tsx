"use client";

import React, { useState } from "react";
import { AITutorEngine, DEFAULT_MESSAGES } from "@/lib/tutor/aiTutorEngine";
import { ChatMessage, SubjectTutor, ExplanationLevel } from "@/lib/types/tutor";
import { Bot, Send, Sparkles, BookOpen, User, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AITutorChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState<SubjectTutor>("mathematics");
  const [level, setLevel] = useState<ExplanationLevel>("step_by_step");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const aiMsg = await AITutorEngine.generateResponse(input, subject, level);
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col h-[580px] space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-purple-600 text-white font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              QuizDorm 1-on-1 AI Tutor Copilot
            </h3>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-bold">
              Active Persona: {subject.toUpperCase()} TUTOR
            </span>
          </div>
        </div>

        {/* Subject & Style Selectors */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as SubjectTutor)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-bold"
          >
            <option value="mathematics">Calculus & Math</option>
            <option value="physics">Physics & Dynamics</option>
            <option value="biology">Cellular Biology</option>
            <option value="chemistry">Organic Chemistry</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as ExplanationLevel)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-bold"
          >
            <option value="step_by_step">Step-by-Step</option>
            <option value="simplified">Simplified</option>
            <option value="analogy">Analogy</option>
          </select>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2 ${m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${m.sender === "user" ? "bg-indigo-600 text-white font-bold" : "bg-purple-600 text-white font-bold"}`}>
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-lg space-y-1 ${m.sender === "user" ? "bg-indigo-600 text-white font-medium" : "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800"}`}>
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>
              <span className="text-[9px] font-mono opacity-60 block text-right">{m.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-purple-600 font-mono animate-pulse">
            <Bot className="w-4 h-4" /> <span>AI Tutor is formulating explanation...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-gray-800">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI Tutor any math or science question..."
          className="text-xs rounded-2xl font-sans"
        />
        <Button onClick={handleSend} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl px-5">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
