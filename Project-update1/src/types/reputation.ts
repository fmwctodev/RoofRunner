import { z } from 'zod';

export type ReviewPlatform = 'google' | 'facebook' | 'yelp';
export type ReviewStatus = 'pending' | 'approved' | 'flagged' | 'hidden';

export interface Review {
  id: string;
  platform: ReviewPlatform;
  rating: number;
  content: string;
  author_name: string;
  author_image?: string;
  contact_id?: string;
  job_id?: string;
  status: ReviewStatus;
  response?: string;
  created_at: string;
  updated_at: string;
  metadata: Record<string, any>;
}

export interface ReviewCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms';
  template_id: string;
  audience: {
    type: 'contact' | 'segment' | 'pipeline';
    id: string;
  };
  schedule: {
    type: 'immediate' | 'delay';
    delay_days?: number;
    follow_up?: {
      enabled: boolean;
      delay_days: number;
      template_id: string;
    };
  };
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms';
  subject?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  total: number;
  average_rating: number;
  by_rating: Record<number, number>;
  by_platform: Record<ReviewPlatform, number>;
  trend: {
    date: string;
    count: number;
    average: number;
  }[];
}

export const reviewCampaignSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['email', 'sms']),
  template_id: z.string(),
  audience: z.object({
    type: z.enum(['contact', 'segment', 'pipeline']),
    id: z.string()
  }),
  schedule: z.object({
    type: z.enum(['immediate', 'delay']),
    delay_days: z.number().optional(),
    follow_up: z.object({
      enabled: z.boolean(),
      delay_days: z.number(),
      template_id: z.string()
    }).optional()
  })
});

export const reviewTemplateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['email', 'sms']),
  subject: z.string().optional(),
  content: z.string()
});