"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Shield, Camera, Save, KeyRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthIndicator, { evaluatePasswordStrength } from "@/components/auth/PasswordStrengthIndicator";
import { updatePassword } from "@/app/auth/actions";
import { toast } from "sonner";

export default function ProfilePage() {
  const { profile, updateProfileState } = useAuth();
  const [name, setName] = useState(profile?.name || "Rozar Khan");
  const [email, setEmail] = useState(profile?.email || "kratoskhanrk@gmail.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateProfileState({ name, email });
      setLoading(false);
      toast.success("Profile information updated successfully!");
    }, 400);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setPassLoading(false);
      return;
    }

    const strength = evaluatePasswordStrength(newPassword);
    if (strength.score < 2) {
      toast.error("Please choose a stronger password");
      setPassLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("password", newPassword);
    formData.set("confirmPassword", confirmPassword);

    const res = await updatePassword(formData);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
    setPassLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile & Account</h1>
        <p className="text-sm text-gray-500">Manage your personal credentials, profile picture, and security</p>
      </div>

      {/* Avatar & Account Info Header */}
      <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-indigo-100 dark:border-indigo-950">
              <AvatarImage src={profile?.avatar} />
              <AvatarFallback className="bg-indigo-600 text-white font-extrabold text-2xl">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all"
              title="Change Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h2>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase text-[10px] font-bold">
                {profile?.role || "Student"}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">{email}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Account ID: {profile?.id || "usr-101"}</p>
          </div>
        </div>

        <div className="text-right text-xs text-gray-400 shrink-0">
          <p>Member Since: <span className="font-semibold text-gray-700 dark:text-gray-300">{profile?.createdAt || "Jul 2026"}</span></p>
          <p className="text-emerald-600 font-semibold mt-1">● Active Account</p>
        </div>
      </div>

      {/* Personal Details Form */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <User className="w-5 h-5 text-indigo-600 mr-2" /> Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-2.5">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Profile Details"}
          </Button>
        </div>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handleChangePassword} className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <KeyRound className="w-5 h-5 text-indigo-600 mr-2" /> Security & Password
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <PasswordStrengthIndicator password={newPassword} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={passLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-2.5">
            <Lock className="w-4 h-4 mr-2" />
            {passLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
