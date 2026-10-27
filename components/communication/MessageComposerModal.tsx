"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MockCommunicationProvider } from "@/lib/communication/providers/mockCommunicationProviders";
import { ChannelType } from "@/lib/types/communication";
import { Bell,Mail,MessageSquare,PhoneCall,Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MessageComposerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageComposerModal({ open, onOpenChange }: MessageComposerModalProps) {
  const [subject, setSubject] = useState("Important Physics Exam & Review Session");
  const [body, setBody] = useState("Dear Students, the upcoming Calculus and Physics revision session starts tomorrow at 10:00 AM.");
  const [targetAudience, setTargetAudience] = useState("all");
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>(["in_app", "email"]);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const toggleChannel = (ch: ChannelType) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleSendBroadcast = async () => {
    setSending(true);
    try {
      for (const ch of selectedChannels) {
        await MockCommunicationProvider.sendMessage({
          channel: ch,
          recipient: targetAudience,
          subject,
          body,
        });
      }
      toast.success(`Broadcast message delivered across ${selectedChannels.length} channels!`);
      onOpenChange(false);
    } catch {
      toast.error("Failed to send broadcast message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Send className="w-5 h-5 text-indigo-600 mr-2" /> Multi-Channel Message Composer
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="all">Entire Institution (All Students & Teachers)</option>
              <option value="students">Students Only</option>
              <option value="teachers">Teachers Only</option>
              <option value="class-10A">Class 10A - Science & Math</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Select Delivery Channels</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "in_app", label: "In-App", icon: <Bell className="w-3.5 h-3.5" /> },
                { id: "email", label: "Email (SES)", icon: <Mail className="w-3.5 h-3.5" /> },
                { id: "sms", label: "SMS (Twilio)", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                { id: "whatsapp", label: "WhatsApp", icon: <PhoneCall className="w-3.5 h-3.5" /> },
              ].map((c) => {
                const isSel = selectedChannels.includes(c.id as ChannelType);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleChannel(c.id as ChannelType)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
                      isSel
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300"
                        : "border-gray-200 dark:border-gray-800 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {c.icon}
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="text-xs" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Message Content</label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
          <Button onClick={handleSendBroadcast} disabled={sending} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            <Send className="w-3.5 h-3.5 mr-1.5" /> {sending ? "Delivering Broadcast..." : "Send Broadcast"}
          </Button>
        </div>
      </div>
    </div>
  );
}
