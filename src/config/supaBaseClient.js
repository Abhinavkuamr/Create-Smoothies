import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfvbqyqokjijrermwcfq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmdmJxeXFva2ppanJlcm13Y2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNzQxOTksImV4cCI6MjAyNzY1MDE5OX0.ySmMPbzCyVb9VnneKsLxhIZ6M1CeyIvMtUy3jmhTJOk';
const supabase = createClient(supabaseUrl, supabaseKey); //object created

export default supabase; // export the object
