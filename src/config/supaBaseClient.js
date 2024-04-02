import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://REDACTED.com';
const supabaseKey =
  'REDACTED';
const supabase = createClient(supabaseUrl, supabaseKey); //object created

export default supabase; // export the object
