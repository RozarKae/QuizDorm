"use client";

import React, { useState } from "react";
import { Settings, Moon, Sun, Bell, Shield, Sliders, CheckCircle2 } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500">Configure application appearance, notification preferences, and system settings</p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-950 p-1 rounded-2xl border border-gray-200 dark:border-gray-800">
          <TabsTrigger value="appearance" className="rounded-xl px-4 py-2 text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-4 py-2 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-4 py-2 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="general" className="rounded-xl px-4 py-2 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5 mr-2" /> General
          </TabsTrigger>
        </TabsList>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Theme & UI Preference</h3>
            
            <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-900">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Theme Mode</p>
                <p className="text-xs text-gray-500">Toggle between Light mode and Dark mode</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Compact Navigation</p>
                <p className="text-xs text-gray-500">Use smaller padding for high density screens</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notification Controls</h3>
            
            <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-900">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Email Digest</p>
                <p className="text-xs text-gray-500">Receive weekly quiz analytics summary via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Live Competition Alerts</p>
                <p className="text-xs text-gray-500">Get notified 15 minutes before scheduled competitions start</p>
              </div>
              <input
                type="checkbox"
                checked={competitionAlerts}
                onChange={(e) => setCompetitionAlerts(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security & Sessions</h3>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Two-Factor Authentication (2FA)</p>
                <p className="text-xs text-gray-500">Add an extra layer of security using TOTP authenticator app</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast.info("2FA Setup will be available in Phase 1.1")}>
                Enable 2FA
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">General Preferences</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Default Timezone
              </label>
              <Select
                options={[
                  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
                  { value: "EST", label: "Eastern Standard Time (EST)" },
                  { value: "IST", label: "India Standard Time (IST)" },
                ]}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
