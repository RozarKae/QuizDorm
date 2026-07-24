export class MobileAuthService {
  public static async authenticateBiometrics(): Promise<{ success: boolean; method: string }> {
    await new Promise((r) => setTimeout(r, 300));
    return {
      success: true,
      method: "Face ID / Touch ID Biometric Verification",
    };
  }
}
