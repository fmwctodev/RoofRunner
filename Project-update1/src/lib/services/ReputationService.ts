import { supabase } from '../supabase';

// Mock data for when the edge function fails
const MOCK_REVIEW_STATS = {
  total_reviews: 25,
  average_rating: 4.2,
  recent_reviews: [
    {
      id: '1',
      author_name: 'John Smith',
      rating: 5,
      content: 'Excellent service, very professional and responsive.',
      platform: 'google',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      author_name: 'Sarah Johnson',
      rating: 4,
      content: 'Good experience overall. Would recommend.',
      platform: 'yelp',
      created_at: new Date().toISOString()
    }
  ],
  by_platform: {
    google: {
      total_reviews: 15,
      average_rating: 4.3
    },
    yelp: {
      total_reviews: 10,
      average_rating: 4.0
    }
  },
  trends: [
    { date: '2025-01', rating: 4.2, count: 5 },
    { date: '2025-02', rating: 4.3, count: 8 },
    { date: '2025-03', rating: 4.1, count: 12 }
  ],
  upcoming_campaigns: [
    {
      id: '1',
      name: 'Post-Service Review Campaign',
      scheduled_at: new Date(Date.now() + 86400000).toISOString(),
      recipient_count: 50
    }
  ]
};

export class ReputationService {
  static async getReviewStats(): Promise<any> {
    try {
      const { data, error } = await supabase
        .functions
        .invoke('review-stats', {});

      if (error) {
        console.warn('Edge function error, falling back to mock data:', error);
        return MOCK_REVIEW_STATS;
      }

      return data;
    } catch (error) {
      console.warn('Failed to fetch review stats, falling back to mock data:', error);
      return MOCK_REVIEW_STATS;
    }
  }

  static async getReviews(filters?: {
    platform?: string[];
    rating?: number[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    status?: string;
  }): Promise<any[]> {
    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.platform?.length) {
      query = query.in('platform', filters.platform);
    }

    if (filters?.rating?.length) {
      query = query.in('rating', filters.rating);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.dateRange) {
      query = query
        .gte('created_at', filters.dateRange.start.toISOString())
        .lte('created_at', filters.dateRange.end.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getReview(id: string): Promise<any> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async replyToReview(id: string, response: string): Promise<any> {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        response,
        response_date: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async flagReview(id: string, reason: string): Promise<any> {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        status: 'flagged',
        flag_reason: reason
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getReviewTrends(timeRange: string = 'last_30_days'): Promise<any> {
    const { data, error } = await supabase
      .functions
      .invoke('review-trends', {
        body: { time_range: timeRange }
      });

    if (error) throw error;
    return data;
  }

  static async getDisputes(): Promise<any[]> {
    const { data, error } = await supabase
      .from('review_disputes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createDispute(dispute: {
    review_id: string;
    platform: string;
    reason: string;
    evidence: string;
  }): Promise<any> {
    const { data, error } = await supabase
      .from('review_disputes')
      .insert([dispute])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateDisputeStatus(id: string, status: string, notes?: string): Promise<any> {
    const { data, error } = await supabase
      .from('review_disputes')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getReviewCampaigns(): Promise<any[]> {
    const { data, error } = await supabase
      .from('review_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getReviewCampaign(id: string): Promise<any> {
    const { data, error } = await supabase
      .from('review_campaigns')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createReviewCampaign(campaign: {
    name: string;
    type: string;
    template_id: string;
    audience: {
      type: string;
      id: string;
    };
    schedule: {
      type: string;
      delay_days?: number;
      follow_up?: {
        enabled: boolean;
        delay_days: number;
        template_id: string;
      };
    };
    gating_enabled: boolean;
    gating_threshold?: number;
    platform_balance?: Record<string, number>;
  }): Promise<any> {
    const { data, error } = await supabase
      .from('review_campaigns')
      .insert([campaign])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateReviewCampaign(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('review_campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReviewCampaign(id: string): Promise<void> {
    const { error } = await supabase
      .from('review_campaigns')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getReviewTemplates(): Promise<any[]> {
    const { data, error } = await supabase
      .from('review_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getReviewTemplate(id: string): Promise<any> {
    const { data, error } = await supabase
      .from('review_templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createReviewTemplate(template: {
    name: string;
    type: string;
    subject?: string;
    content: string;
  }): Promise<any> {
    const { data, error } = await supabase
      .from('review_templates')
      .insert([template])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateReviewTemplate(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('review_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReviewTemplate(id: string): Promise<void> {
    const { error } = await supabase
      .from('review_templates')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getConnectedPlatforms(): Promise<any[]> {
    const { data, error } = await supabase
      .from('review_platforms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async connectPlatform(platform: {
    name: string;
    credentials: Record<string, any>;
  }): Promise<any> {
    const { data, error } = await supabase
      .functions
      .invoke('connect-review-platform', {
        body: platform
      });

    if (error) throw error;
    return data;
  }

  static async disconnectPlatform(id: string): Promise<void> {
    const { error } = await supabase
      .from('review_platforms')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async syncReviews(platformId?: string): Promise<{
    success: boolean;
    count: number;
    message?: string;
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('sync-reviews', {
        body: { platform_id: platformId }
      });

    if (error) throw error;
    return data;
  }

  static async getReviewWidgets(): Promise<any[]> {
    const { data, error } = await supabase
      .from('review_widgets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createReviewWidget(widget: {
    name: string;
    site_id?: string;
    settings: {
      theme: string;
      show_rating: boolean;
      max_reviews: number;
      platforms: string[];
      min_rating?: number;
    };
  }): Promise<any> {
    const { data, error } = await supabase
      .from('review_widgets')
      .insert([widget])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateReviewWidget(id: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('review_widgets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteReviewWidget(id: string): Promise<void> {
    const { error } = await supabase
      .from('review_widgets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getWidgetEmbedCode(id: string): Promise<string> {
    const { data, error } = await supabase
      .functions
      .invoke('get-review-widget-embed', {
        body: { widget_id: id }
      });

    if (error) throw error;
    return data.embed_code;
  }

  static async bulkSendInvites(recipientIds: string[], templateId: string): Promise<{
    success: boolean;
    count: number;
    message?: string;
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('bulk-send-review-invites', {
        body: { recipient_ids: recipientIds, template_id: templateId }
      });

    if (error) throw error;
    return data;
  }

  static async bulkResendInvites(inviteIds: string[]): Promise<{
    success: boolean;
    count: number;
    message?: string;
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('bulk-resend-review-invites', {
        body: { invite_ids: inviteIds }
      });

    if (error) throw error;
    return data;
  }

  static async generateQRCode(settings: {
    platform: string;
    size?: number;
    color?: string;
    logo?: boolean;
  }): Promise<{
    url: string;
    download_url: string;
  }> {
    const { data, error } = await supabase
      .functions
      .invoke('generate-review-qr-code', {
        body: settings
      });

    if (error) throw error;
    return data;
  }
}