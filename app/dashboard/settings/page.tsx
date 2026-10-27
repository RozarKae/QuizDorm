"use client";

import { signOutUser } from "@/app/auth/actions";
import { useSound } from "@/components/audio/useSound";
import { useAuth } from "@/components/auth/AuthProvider";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { Bell,LogOut,Play,Settings,Shield,Sliders,Sun,Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [competitionAlerts, setCompetitionAlerts] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { logout } = useAuth();
  const {
    isSoundEnabled,
    volume,
    toggleSound,
    setVolume,
    playTap,
    playHover,
    playCorrect,
    playError,
    playTick,
    playRankSwap,
    playFanfare,
  } = useSound();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await logout();
      await signOutUser();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("quizdorm_demo_user");
        document.cookie =
          "quizdorm_demo_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        window.location.href = "/auth/login?logout=true";
      }
    }
  };

  const handleSaveSettings = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#F2F7F3]">
      <div className="border-b border-[rgba(240, 160, 180,0.14)] pb-5">
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
          <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_#FF4D6D]" />
          <span>DORM SETTINGS // PREFERENCES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
          <Settings className="w-6 h-6 text-[#FF4D6D] mr-2" /> Application Settings
        </h1>
        <p className="text-xs font-mono text-[#A0AEA5] mt-1">
          Customize your theme, notification alerts, study squad preferences, and locale.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="bg-[#1D1013] p-1 rounded-[4px] border border-[rgba(240, 160, 180,0.16)] flex items-center gap-1">
          <TabsTrigger value="appearance" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#2A141A] data-[state=active]:text-[#FF4D6D] data-[state=active]:border data-[state=active]:border-[rgba(255, 77, 109,0.3)]">
            <Sun className="w-3.5 h-3.5 mr-1.5" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#2A141A] data-[state=active]:text-[#FF4D6D] data-[state=active]:border data-[state=active]:border-[rgba(255, 77, 109,0.3)]">
            <Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#2A141A] data-[state=active]:text-[#FF4D6D] data-[state=active]:border data-[state=active]:border-[rgba(255, 77, 109,0.3)]">
            <Shield className="w-3.5 h-3.5 mr-1.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="general" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#2A141A] data-[state=active]:text-[#FF4D6D] data-[state=active]:border data-[state=active]:border-[rgba(255, 77, 109,0.3)]">
            <Sliders className="w-3.5 h-3.5 mr-1.5" /> General
          </TabsTrigger>
          <TabsTrigger value="audio" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#2A141A] data-[state=active]:text-[#FF4D6D] data-[state=active]:border data-[state=active]:border-[rgba(255, 77, 109,0.3)]">
            <Volume2 className="w-3.5 h-3.5 mr-1.5" /> Audio FX
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
              Theme &amp; UI Preference
            </h3>

            <div className="flex items-center justify-between py-3 border-b border-[rgba(240, 160, 180,0.12)]">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Theme Mode</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Toggle between Light mode and Dark Future OS mode</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Compact Navigation</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Use denser padding for high resolution displays</p>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#FF4D6D] rounded" />
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
              Activity & Battle Alerts
            </h3>

            <div className="flex items-center justify-between py-3 border-b border-[rgba(240, 160, 180,0.12)]">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Weekly Digest</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Receive weekly quiz performance summaries via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#FF4D6D] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Live Competition Alerts</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Get notified 15 minutes before scheduled tournaments launch</p>
              </div>
              <input
                type="checkbox"
                checked={competitionAlerts}
                onChange={(e) => setCompetitionAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#FF4D6D] rounded cursor-pointer"
              />
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
              Security &amp; Session Credentials
            </h3>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Add an extra cryptographic verification layer with TOTP</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("2FA Setup will be available in Phase 1.1")}
                className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] rounded-[4px] text-[#A0AEA5] hover:text-[#F2F7F3]"
              >
                Enable 2FA
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-[rgba(240, 160, 180,0.12)]">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Sign Out of Account</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Terminate active authentication cookies and return to login portal</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-xs font-mono rounded-[4px] border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.1)] text-[#F87171] hover:bg-[rgba(248,113,113,0.2)]"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
              General System Preferences
            </h3>
            <div>
              <label className="block text-xs font-mono font-semibold text-[#A0AEA5] mb-1.5">
                Default Assessment Timezone
              </label>
              <Select
                options={[
                  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
                  { value: "EST", label: "Eastern Standard Time (EST)" },
                  { value: "IST", label: "India Standard Time (IST)" },
                ]}
                className="text-xs font-mono bg-[#1D1013] border-[rgba(240, 160, 180,0.18)] text-[#F2F7F3] rounded-[4px]"
              />
            </div>
          </div>
        </TabsContent>

        {/* Audio FX Tab */}
        <TabsContent value="audio">
          <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3]">
                Cybernetic Audio Engine (Web Audio API)
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]">
                Zero-Asset // 0 KB Overhead
              </span>
            </div>

            {/* Master Sound Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-[rgba(240, 160, 180,0.12)]">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Master Sound Effects</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">
                  Enable or mute all procedural UI feedback sounds, countdown ticks, and arena fanfares
                </p>
              </div>
              <Button
                variant={isSoundEnabled ? "outline" : "secondary"}
                size="sm"
                onClick={toggleSound}
                className={`text-xs font-mono rounded-[4px] ${
                  isSoundEnabled
                    ? "border-[rgba(255, 77, 109,0.4)] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] hover:bg-[rgba(255, 77, 109,0.2)]"
                    : "border-[rgba(240, 160, 180,0.2)] text-[#69786F]"
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 mr-1.5" />
                {isSoundEnabled ? "Active (Audible)" : "Muted"}
              </Button>
            </div>

            {/* Master Volume Slider */}
            <div className="py-3 border-b border-[rgba(240, 160, 180,0.12)] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Master Volume Gain</p>
                  <p className="text-[11px] font-mono text-[#A0AEA5]">
                    Fine-tune the output gain of procedural sound oscillators
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF4D6D]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#2A141A] rounded-lg appearance-none cursor-pointer accent-[#FF4D6D]"
              />
            </div>

            {/* Interactive Audio Test Bench */}
            <div className="space-y-3 pt-2">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono uppercase tracking-wider">
                  Oscillator Test Bench
                </p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">
                  Click any trigger below to sample the procedural acoustic cues generated in real time
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playTap}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#FF4D6D] hover:text-[#FF4D6D] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#FF4D6D]" /> UI Tap
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playHover}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#FF4D6D] hover:text-[#FF4D6D] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#FF758F]" /> Hover Blip
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playCorrect}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#FF4D6D] hover:text-[#FF4D6D] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#FF4D6D]" /> Correct Chime
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playError}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#F87171] hover:text-[#F87171] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#F87171]" /> Error Thud
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playTick}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#FBBF24] hover:text-[#FBBF24] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#FBBF24]" /> Urgency Tick
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playRankSwap}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#60A5FA] hover:text-[#60A5FA] rounded-[4px] justify-start"
                >
                  <Play className="w-3 h-3 mr-1 text-[#60A5FA]" /> Rank Swap
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playFanfare}
                  className="font-mono text-xs border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] hover:border-[#A78BFA] hover:text-[#A78BFA] rounded-[4px] justify-start col-span-2 sm:col-span-1 md:col-span-2"
                >
                  <Play className="w-3 h-3 mr-1 text-[#A78BFA]" /> Victory Fanfare
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono font-bold text-xs rounded-[4px] px-6 h-9 shadow-[0_0_12px_rgba(255, 77, 109,0.18)]"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
