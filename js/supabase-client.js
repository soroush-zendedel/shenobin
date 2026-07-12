// js/supabase-client.js

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config.js'; 

// دیگر نیازی به import کردن فایل umd نداریم
// چون در HTML لود شده، مستقیماً از window می‌خوانیم
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getAuthToken() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    return session.access_token;
}