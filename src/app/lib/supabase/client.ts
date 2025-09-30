import { createClient } from "@supabase/supabase-js";

// Configura Supabase con las credenciales de tu proyecto
const SUPABASE_URL = "https://apvbruuzlfnzfamjisoo.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
