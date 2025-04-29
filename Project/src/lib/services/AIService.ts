import { supabase } from '../supabase';

export class AIService {
  static async suggestReply(reviewId: string): Promise<string> {
    const { data, error } = await supabase
      .functions
      .invoke('suggest-review-reply', {
        body: { review_id: reviewId }
      });

    if (error) throw error;
    return data.suggested_reply;
  }

  static async autopilot(settings: {
    enabled: boolean;
    min_rating?: number;
    max_rating?: number;
    platforms?: string[];
    tone?: 'professional' | 'friendly' | 'apologetic';
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('configure-review-autopilot', {
        body: settings
      });

    if (error) throw error;
    return data;
  }

  static async getAutopilotSettings(): Promise<{
    enabled: boolean;
    min_rating?: number;
    max_rating?: number;
    platforms?: string[];
    tone?: 'professional' | 'friendly' | 'apologetic';
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('get-review-autopilot-settings', {});

    if (error) throw error;
    return data;
  }

  static async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
    keywords: string[];
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('analyze-sentiment', {
        body: { text }
      });

    if (error) throw error;
    return data;
  }
}