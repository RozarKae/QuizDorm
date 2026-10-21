"use client";

import React, { useState } from "react";
import { Settings, Moon, Sun, Bell, Shield, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { toast } from "sonner";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [competitionAlerts, setCompetitionAlerts] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#F2F7F3]">
      <div className="border-b border-[rgba(160,190,170,0.14)] pb-5">
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
          <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
          <span>ENVIRONMENT // PREFERENCES & TELEMETRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
          <Settings className="w-6 h-6 text-[#65F59A] mr-2" /> Application Settings
        </h1>
        <p className="text-xs font-mono text-[#A0AEA5] mt-1">
          Configure appearance, telemetry notification frequency, security credentials, and locale.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="bg-[#111B17] p-1 rounded-[4px] border border-[rgba(160,190,170,0.16)] flex items-center gap-1">
          <TabsTrigger value="appearance" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#17251E] data-[state=active]:text-[#65F59A] data-[state=active]:border data-[state=active]:border-[rgba(101,245,154,0.3)]">
            <Sun className="w-3.5 h-3.5 mr-1.5" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#17251E] data-[state=active]:text-[#65F59A] data-[state=active]:border data-[state=active]:border-[rgba(101,245,154,0.3)]">
            <Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#17251E] data-[state=active]:text-[#65F59A] data-[state=active]:border data-[state=active]:border-[rgba(101,245,154,0.3)]">
            <Shield className="w-3.5 h-3.5 mr-1.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="general" className="rounded-[3px] px-3.5 py-1.5 text-xs font-mono font-semibold data-[state=active]:bg-[#17251E] data-[state=active]:text-[#65F59A] data-[state=active]:border data-[state=active]:border-[rgba(101,245,154,0.3)]">
            <Sliders className="w-3.5 h-3.5 mr-1.5" /> General
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(160,190,170,0.12)] pb-2.5">
              Theme &amp; UI Preference
            </h3>

            <div className="flex items-center justify-between py-3 border-b border-[rgba(160,190,170,0.12)]">
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
              <input type="checkbox" className="w-4 h-4 accent-[#65F59A] rounded" />
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(160,190,170,0.12)] pb-2.5">
              Notification Telemetry
            </h3>

            <div className="flex items-center justify-between py-3 border-b border-[rgba(160,190,170,0.12)]">
              <div>
                <p className="font-semibold text-[#F2F7F3] text-xs font-mono">Weekly Digest</p>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Receive weekly quiz performance summaries via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#65F59A] rounded cursor-pointer"
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
                className="w-4 h-4 accent-[#65F59A] rounded cursor-pointer"
              />
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(160,190,170,0.12)] pb-2.5">
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
                className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] text-[#A0AEA5] hover:text-[#F2F7F3]"
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#F2F7F3] border-b border-[rgba(160,190,170,0.12)] pb-2.5">
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
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px]"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] px-6 h-9 shadow-[0_0_12px_rgba(101,245,154,0.18)]"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
