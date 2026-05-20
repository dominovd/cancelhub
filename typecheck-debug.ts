import type { Database } from '@/lib/supabase/types'

type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};
type GenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: GenericRelationship[];
};
type GenericSchema = {
  Tables: Record<string, GenericTable>;
  Views: Record<string, any>;
  Functions: Record<string, any>;
};

type Check1 = Database['public'] extends GenericSchema ? 'YES' : 'NO'
type Check2 = Database['public']['Tables']['subscriptions'] extends GenericTable ? 'YES' : 'NO'
const a: Check1 = 'YES' as const
const b: Check2 = 'YES' as const
