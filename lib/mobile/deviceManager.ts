import { MobileDevice } from "@/lib/types/mobile";

export const DEFAULT_DEVICES: MobileDevice[] = [
  {
    id: "dev-101",
    deviceName: "iPhone 15 Pro Max (Primary)",
    deviceType: "iphone",
    osVersion: "iOS 17.5",
    appVersion: "v3.0.0",
    registeredAt: "2026-07-20T10:00:00Z",
    lastActiveAt: "2026-07-24T10:50:00Z",
    trusted: true,
    biometricEnabled: true,
    ipAddress: "192.168.1.42",
  },
  {
    id: "dev-102",
    deviceName: "Samsung Galaxy Tab S9",
    deviceType: "android_tablet",
    osVersion: "Android 14",
    appVersion: "v3.0.0",
    registeredAt: "2026-07-22T14:00:00Z",
    lastActiveAt: "2026-07-24T09:15:00Z",
    trusted: true,
    biometricEnabled: false,
    ipAddress: "172.16.0.12",
  },
];

export class DeviceManager {
  public static getDevices(): MobileDevice[] {
    return DEFAULT_DEVICES;
  }
}
