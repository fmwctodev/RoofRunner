import { Contact } from './contacts';

export interface Pipeline {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  description?: string;
  currency: string;
  close_date_offset: number;
  is_default: boolean;
  metadata: Record<string, any>;
}

export interface PipelineStage {
  id: string;
  created_at: string;
  updated_at: string;
  pipeline_id: string;
  name: string;
  description?: string;
  position: number;
  color?: string;
  metadata: Record<string, any>;
}

export interface Deal {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  pipeline_id: string;
  stage_id: string;
  contact_id: string;
  name: string;
  amount?: number;
  currency: string;
  expected_close_date?: string;
  status: 'open' | 'won' | 'lost';
  probability: number;
  tags: string[];
  custom_fields: Record<string, any>;
  metadata: Record<string, any>;
  contact?: Contact;
}

export interface DealActivity {
  id: string;
  created_at: string;
  deal_id: string;
  user_id: string;
  type: string;
  description: string;
  metadata: Record<string, any>;
}

export interface DealFilters {
  search?: string;
  pipeline_id?: string;
  stage_id?: string[];
  status?: string[];
  tags?: string[];
  amount?: {
    min?: number;
    max?: number;
  };
  expected_close_date?: {
    start: Date;
    end: Date;
  };
  custom_fields?: Record<string, any>;
}

export interface DealFormData {
  name: string;
  pipeline_id: string;
  stage_id: string;
  contact_id?: string;
  amount?: number;
  currency?: string;
  expected_close_date?: string;
  probability?: number;
  tags?: string[];
  custom_fields?: Record<string, any>;
}