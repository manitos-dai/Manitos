const SUPABASE_URL = 'https://ofngjvojskucaqnehcpv.supabase.co';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbmdqdm9qc2t1Y2FxbmVoY3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzUyNzAsImV4cCI6MjA5NDk1MTI3MH0.YmU0yZae9M0fVSShXIsPLEN2iE-pBQ_FI4Mr4mYD424';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
