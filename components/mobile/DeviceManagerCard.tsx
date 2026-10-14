"use client";

import React, { useState } from "react";
import { DeviceManager } from "@/lib/mobile/deviceManager";
import { MobileDevice } from "@/lib/types/mobile";
import { Smartphone, Tablet, ShieldCheck, Fingerprint, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DeviceManagerCard() {
  const [devices, setDevices] = useState<MobileDevice[]>(DeviceManager.getDevices());

  const handleToggleBiometrics = (id: string) => {
    const updated = devices.map((d) => (d.id === id ? { ...d, biometricEnabled: !d.biometricEnabled } : d));
    setDevices(updated);
    toast.success("Biometric authentication preference updated!");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Smartphone className="w-5 h-5 text-indigo-600 mr-2" /> Registered Devices & Biometric Sessions
          </h3>
          <p className="text-xs text-gray-500">
            Trusted mobile devices with Face ID / Touch ID biometric unlock permissions.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {devices.map((d) => (
          <div key={d.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                {d.deviceType.includes("tablet") || d.deviceType.includes("ipad") ? (
                  <Tablet className="w-4 h-4 text-indigo-500 mr-1.5" />
                ) : (
                  <Smartphone className="w-4 h-4 text-indigo-500 mr-1.5" />
                )}
                {d.deviceName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase">
                {d.trusted ? "TRUSTED" : "UNTRUSTED"}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>OS: {d.osVersion} | App: {d.appVersion}</span>
              <span>Last Active: {new Date(d.lastActiveAt).toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200/40">
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300 flex items-center">
                <Fingerprint className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Touch/Face ID:{" "}
                <span className="font-bold ml-1">{d.biometricEnabled ? "Enabled" : "Disabled"}</span>
              </span>

              <Button
                onClick={() => handleToggleBiometrics(d.id)}
                size="sm"
                variant="outline"
                className="text-[11px] h-7 rounded-xl"
              >
                Toggle Biometrics
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
