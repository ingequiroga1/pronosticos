import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jtqbfvnztrmdyykmvovu.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cWJmdm56dHJtZHl5a212b3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMjk5NDMsImV4cCI6MjA3MDcwNTk0M30.6isUDsxDnSalKChpMWe-bxye0P3WCrPymw2vrfcLQLw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);