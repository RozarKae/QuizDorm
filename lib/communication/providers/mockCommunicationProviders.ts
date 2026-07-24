import { ChannelType } from "@/lib/types/communication";

export interface SendMessageParams {
  channel: ChannelType;
  recipient: string;
  subject?: string;
  body: string;
}

export class MockCommunicationProvider {
  public static async sendMessage(params: SendMessageParams): Promise<{ success: boolean; messageId: string }> {
    await new Promise((r) => setTimeout(r, 250)); // Processing delay
    return {
      success: true,
      messageId: `msg_${params.channel}_${Date.now()}`,
    };
  }
}
