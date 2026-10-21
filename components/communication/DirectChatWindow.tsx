"use client";

import React, { useState } from "react";
import { DirectMessage } from "@/lib/types/communication";
import { DirectMessagingService } from "@/lib/communication/directMessaging";
import { Send, User, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DirectChatWindow() {
  const [messages, setMessages] = useState<DirectMessage[]>(DirectMessagingService.getMessages());
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = DirectMessagingService.sendMessage({
      senderId: "usr-teacher-1",
      senderName: "Dr. Eleanor Vance",
      senderRole: "Teacher",
      recipientId: "std-101",
      recipientName: "Karthik Rajendran",
      messageText: inputText,
    });
    setMessages([...messages, newMsg]);
    setInputText("");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[520px]">
      {/* Chat Header */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
            KR
          </div>
          <div>
            <span className="font-bold text-sm text-gray-900 dark:text-white block">Karthik Rajendran</span>
            <span className="text-[10px] text-gray-400 font-mono">Class 12 Higher Secondary Student</span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
          ONLINE
        </span>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-sans bg-gray-50/30 dark:bg-gray-900/20">
        {messages.map((m) => {
          const isMe = m.senderId === "usr-teacher-1";

          return (
            <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl space-y-1 shadow-sm ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] opacity-80 font-mono mb-0.5">
                  <span className="font-bold">{m.senderName}</span>
                  <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <p className="leading-relaxed">{m.messageText}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Send Controls */}
      <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex items-center space-x-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message to Karthik Rajendran..."
          className="text-xs flex-1 rounded-xl"
        />
        <Button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
          <Send className="w-4 h-4 mr-1" /> Send
        </Button>
      </div>
    </div>
  );
}
