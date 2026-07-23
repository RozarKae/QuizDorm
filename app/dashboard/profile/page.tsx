"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Shield, Camera, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile information updated successfully!");
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-sm text-gray-500">Manage your personal profile, email, and security settings</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Avatar Card */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-indigo-100 dark:border-indigo-950">
              <AvatarImage src="" />
              <AvatarFallback className="bg-indigo-600 text-white font-extrabold text-2xl">
                QD
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all"
              title="Change Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Avatar</h3>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG or GIF up to 2MB. Recommended 400x400px.</p>
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <User className="w-5 h-5 text-indigo-600 mr-2" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <Input defaultValue="Rozar" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <Input defaultValue="Khan" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="email" defaultValue="kratoskhanrk@gmail.com" className="pl-9" required />
            </div>
          </div>
        </div>

        {/* Password Security Card */}
        <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Lock className="w-5 h-5 text-indigo-600 mr-2" /> Change Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-8 py-3">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
