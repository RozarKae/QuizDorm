"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LiveChatMessage,Participant } from "@/lib/types/classroom";
import {
AlertCircle,
Check,
Clock,
Disc,
DoorOpen,
Hand,
MessageSquare,
Mic,MicOff,MonitorUp,
Send,
Sparkles,
Users,
Video,VideoOff,
Volume2,
X
} from "lucide-react";
import React,{ useEffect,useState } from "react";
import { toast } from "sonner";

const mockParticipants: Participant[] = [
  { id: "p-1", name: "Dr. Eleanor Vance (Host)", role: "host", hasVideo: true, hasAudio: true, isScreenSharing: true, handRaised: false, status: "in-class", joinedAt: "10:00 AM", attendanceVerified: true },
  { id: "p-2", name: "Marcus Chen", role: "student", hasVideo: true, hasAudio: false, isScreenSharing: false, handRaised: true, status: "in-class", joinedAt: "10:01 AM", attendanceVerified: true },
  { id: "p-3", name: "Sophia Rodriguez", role: "student", hasVideo: false, hasAudio: true, isScreenSharing: false, handRaised: false, status: "in-class", joinedAt: "10:02 AM", attendanceVerified: true },
  { id: "p-4", name: "Liam Gallagher", role: "student", hasVideo: true, hasAudio: false, isScreenSharing: false, handRaised: false, status: "in-class", joinedAt: "10:03 AM", attendanceVerified: true },
  { id: "p-5", name: "Amara Johnson", role: "guest", hasVideo: false, hasAudio: false, isScreenSharing: false, handRaised: false, status: "waiting-room", joinedAt: "10:05 AM", attendanceVerified: false },
  { id: "p-6", name: "Vikram Patel", role: "student", hasVideo: false, hasAudio: false, isScreenSharing: false, handRaised: false, status: "waiting-room", joinedAt: "10:06 AM", attendanceVerified: false },
];

const mockChatMessages: LiveChatMessage[] = [
  { id: "msg-1", senderId: "p-1", senderName: "Dr. Eleanor Vance", senderRole: "Host", text: "Welcome everyone! Today we discuss Quantum Entanglement.", timestamp: "10:00 AM", isAnnouncement: true },
  { id: "msg-2", senderId: "p-2", senderName: "Marcus Chen", senderRole: "Student", text: "Can you re-explain the Bell Inequality proof?", timestamp: "10:04 AM" },
  { id: "msg-3", senderId: "p-3", senderName: "Sophia Rodriguez", senderRole: "Student", text: "Audio is super clear today!", timestamp: "10:05 AM" },
];

export function LiveTeachingStudio() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  
  // Media controls state
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [myHandRaised, setMyHandRaised] = useState(false);
  const [viewMode, setViewMode] = useState<"speaker" | "grid">("speaker");
  
  // Active Sidebar tab
  const [activeTab, setActiveTab] = useState<"participants" | "chat" | "breakouts">("participants");
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  // Timer simulation
  const [secondsElapsed, setSecondsElapsed] = useState(1450); // ~24 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ":" : ""}${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg: LiveChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "p-1",
      senderName: "Dr. Eleanor Vance",
      senderRole: "Host",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages([...chatMessages, msg]);
    setNewMessage("");
  };

  const handleAdmitParticipant = (id: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "in-class", attendanceVerified: true } : p))
    );
    toast.success("Participant admitted to the live classroom!");
  };

  const handleRejectParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    toast.info("Participant removed from waiting room.");
  };

  const handleSendReaction = (emoji: string) => {
    setActiveReaction(emoji);
    toast.success(`Reaction ${emoji} sent to class stream!`);
    setTimeout(() => setActiveReaction(null), 3000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? "Cloud recording paused." : "Cloud recording resumed in HD.");
  };

  const inClassParticipants = participants.filter((p) => p.status === "in-class");
  const waitingParticipants = participants.filter((p) => p.status === "waiting-room");

  return (
    <div className="space-y-4">
      {/* Studio Top Navigation & Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute top-0 right-0" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold">
              <Video className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white">Quantum Mechanics & Entanglement Session</h2>
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30 flex items-center gap-1">
                <Disc className={`w-3 h-3 ${isRecording ? "animate-spin text-red-500" : "text-slate-400"}`} />
                {isRecording ? "REC ON" : "REC PAUSED"}
              </span>
            </div>
            <p className="text-xs text-slate-400">Classroom: PHY-9042 • Host: Dr. Eleanor Vance</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="font-mono font-bold text-slate-200">{formatTime(secondsElapsed)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <Users className="w-4 h-4 text-rose-400" />
            <span className="font-bold">{inClassParticipants.length} Online</span>
            {waitingParticipants.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                {waitingParticipants.length} Waiting
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant={viewMode === "speaker" ? "default" : "outline"}
              onClick={() => setViewMode("speaker")}
              className="text-[11px] h-8 rounded-lg"
            >
              Speaker
            </Button>
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className="text-[11px] h-8 rounded-lg"
            >
              Grid View
            </Button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Video Stream + Control Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[580px]">
        {/* Primary Video Stage (Cols 3) */}
        <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4 shadow-2xl">
          {/* Reaction Overlay Popup */}
          {activeReaction && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 animate-bounce bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-4xl shadow-2xl border border-white/30">
              {activeReaction}
            </div>
          )}

          {/* Screen Share / Speaker View Display Container */}
          <div className="relative flex-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
            {isScreenSharing ? (
              <div className="w-full h-full p-6 bg-slate-900 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <MonitorUp className="w-12 h-12 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Presenting &ldquo;Quantum_Sim_v3.pdf&rdquo;</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Screen sharing active in 1080p 60fps. All participants can see your shared presentation workspace.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Live Annotations Enabled
                </div>
              </div>
            ) : isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center relative">
                {/* Simulated Presenter Avatar & Video Feed */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl animate-pulse">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-3xl text-white">
                    EV
                  </div>
                </div>
                <p className="text-white font-bold text-base mt-4">Dr. Eleanor Vance (Host)</p>
                <div className="flex items-center gap-2 text-xs text-indigo-300 mt-1">
                  <Volume2 className="w-4 h-4 text-rose-400 animate-pulse" /> Speaking...
                </div>

                {/* Equalizer Bar Animation */}
                <div className="flex items-center gap-1 mt-3">
                  <div className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-10 bg-rose-400 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce delay-200" />
                  <div className="w-1.5 h-8 bg-rose-400 rounded-full animate-bounce delay-75" />
                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Dr. Eleanor Vance (Instructor)
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 space-y-2">
                <VideoOff className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-xs">Camera feed is currently paused.</p>
              </div>
            )}

            {/* In-Class Participant Thumbnail Strip */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {inClassParticipants.slice(1, 4).map((p) => (
                <div
                  key={p.id}
                  className="w-28 h-20 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 flex flex-col items-center justify-center relative p-1 shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                    {p.name.charAt(0)}
                  </div>
                  <span className="text-[10px] text-slate-200 truncate w-full text-center mt-1 font-semibold">
                    {p.name.split(" ")[0]}
                  </span>
                  {p.handRaised && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 p-1 rounded-full text-black shadow-md animate-bounce">
                      <Hand className="w-3 h-3" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Control Toolbar */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2">
              <Button
                variant={isMicOn ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setIsMicOn(!isMicOn)}
                className="rounded-xl text-xs"
              >
                {isMicOn ? <Mic className="w-4 h-4 mr-1 text-rose-400" /> : <MicOff className="w-4 h-4 mr-1" />}
                {isMicOn ? "Mute" : "Unmute"}
              </Button>

              <Button
                variant={isVideoOn ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-xl text-xs"
              >
                {isVideoOn ? <Video className="w-4 h-4 mr-1 text-indigo-400" /> : <VideoOff className="w-4 h-4 mr-1" />}
                {isVideoOn ? "Stop Cam" : "Start Cam"}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  toast.info(isScreenSharing ? "Screen sharing ended." : "Screen sharing started.");
                }}
                className="rounded-xl text-xs border-slate-700 bg-slate-800 hover:bg-slate-700"
              >
                <MonitorUp className="w-4 h-4 mr-1 text-amber-400" />
                {isScreenSharing ? "Stop Share" : "Share Screen"}
              </Button>
            </div>

            {/* Center Reaction Bar */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              {["👏", "👍", "❤️", "💡", "❓"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSendReaction(emoji)}
                  className="hover:scale-125 transition-transform px-2 py-1 text-sm rounded-lg hover:bg-slate-800"
                >
                  {emoji}
                </button>
              ))}
              <Button
                size="sm"
                variant={myHandRaised ? "default" : "ghost"}
                onClick={() => {
                  setMyHandRaised(!myHandRaised);
                  toast.info(myHandRaised ? "Hand lowered." : "Hand raised to instructor!");
                }}
                className={`text-xs h-7 px-2 rounded-lg ${myHandRaised ? "bg-amber-500 text-black font-bold" : "text-slate-300"}`}
              >
                <Hand className="w-3.5 h-3.5 mr-1" />
                {myHandRaised ? "Lower Hand" : "Raise Hand"}
              </Button>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className="text-xs rounded-xl border-slate-700 bg-slate-800 hover:bg-slate-700"
              >
                <Disc className={`w-3.5 h-3.5 mr-1 ${isRecording ? "text-red-500 animate-spin" : "text-slate-400"}`} />
                {isRecording ? "Pause Rec" : "Record Class"}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => toast.error("Session ended by moderator.")}
                className="text-xs rounded-xl font-bold bg-red-600 hover:bg-red-700"
              >
                End Class
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar: Participants, Chat & Breakouts (Col 1) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden shadow-xl">
          {/* Sidebar Tab Header */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-2 gap-1">
            <button
              onClick={() => setActiveTab("participants")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                activeTab === "participants" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Members ({inClassParticipants.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                activeTab === "chat" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>

            <button
              onClick={() => setActiveTab("breakouts")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                activeTab === "breakouts" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <DoorOpen className="w-3.5 h-3.5" />
              <span>Rooms</span>
            </button>
          </div>

          {/* Sidebar Tab Contents */}
          <div className="p-3 flex-1 overflow-y-auto space-y-3">
            {activeTab === "participants" && (
              <div className="space-y-4">
                {/* Waiting Room Section */}
                {waitingParticipants.length > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Waiting Room ({waitingParticipants.length})
                      </span>
                    </div>
                    {waitingParticipants.map((p) => (
                      <div key={p.id} className="flex items-center justify-between bg-slate-800 p-2 rounded-lg text-xs">
                        <span className="text-white font-semibold">{p.name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAdmitParticipant(p.id)}
                            className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md"
                            title="Admit"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRejectParticipant(p.id)}
                            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                            title="Decline"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* In-Class Participants List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>In Session</span>
                    <button onClick={() => toast.info("All participants muted.")} className="text-indigo-400 hover:underline">
                      Mute All
                    </button>
                  </div>

                  {inClassParticipants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[11px]">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{p.name}</p>
                          <p className="text-[10px] text-slate-400 capitalize">{p.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400">
                        {p.handRaised && <Hand className="w-3.5 h-3.5 text-amber-400 animate-bounce" />}
                        {p.hasAudio ? <Mic className="w-3.5 h-3.5 text-rose-400" /> : <MicOff className="w-3.5 h-3.5 text-slate-600" />}
                        {p.hasVideo ? <Video className="w-3.5 h-3.5 text-indigo-400" /> : <VideoOff className="w-3.5 h-3.5 text-slate-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="flex flex-col h-full justify-between space-y-3">
                <div className="space-y-2.5 overflow-y-auto max-h-[400px] pr-1">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl text-xs space-y-1 ${
                        msg.isAnnouncement
                          ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-200"
                          : "bg-slate-800 border border-slate-700/60 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-xs">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type live message..."
                    className="h-9 bg-slate-800 border-slate-700 text-white text-xs rounded-xl"
                  />
                  <Button type="submit" size="sm" className="h-9 bg-indigo-600 hover:bg-indigo-700 rounded-xl px-3">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            )}

            {activeTab === "breakouts" && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <DoorOpen className="w-4 h-4 text-amber-400" /> Breakout Rooms Manager
                  </h4>
                  <p className="text-slate-400 text-[11px]">Divide the 42 students into small collaborative discussion pods.</p>
                  <Button
                    onClick={() => toast.success("4 Breakout Rooms generated and students assigned!")}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs rounded-lg font-semibold py-1.5"
                  >
                    Auto-Assign 4 Rooms
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>Room A: Quantum Optics</span>
                      <span className="text-[10px] text-slate-400">4 Students</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Marcus C., Sophia R., Liam G., Amara J.</p>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>Room B: Bell Inequality</span>
                      <span className="text-[10px] text-slate-400">3 Students</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Vikram P., David M., Sarah C.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
