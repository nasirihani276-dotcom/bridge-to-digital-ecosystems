// Shared content types for ecosystem/company data files.
// (Not to be confused with src/integrations/supabase/types.ts, which holds
// the generated Supabase database types.)

export type EcosystemCategory = {
  slug: string;
  name: string;
  description: string;
};

export type Company = {
  slug: string;
  name: string;
  website: string;
  domain: string;
  ecosystem: string;
  category: string;
  summary: string;
  profile: string;
  logo?: string;
};
