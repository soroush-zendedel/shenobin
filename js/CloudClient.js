import { supabase } from './supabase-client.js';

export default class CloudClient {
    // ذخیره پروژه (ایجاد جدید یا آپدیت)
    async saveProject(data, user, name) {
        const payload = {
            user_id: user.id,
            name: name,
            data: data
        };

        let response;
        // بررسی اینکه آیا پروژه از قبل آیدی ابری دارد یا خیر
        if (data.cloudId) {
            response = await supabase
                .from('projects')
                .update(payload)
                .eq('id', data.cloudId)
                .select()
                .single();
        } else {
            response = await supabase
                .from('projects')
                .insert(payload)
                .select()
                .single();
        }

        if (response.error) throw new Error(response.error.message);
        return { id: response.data.id };
    }

    // دریافت لیست پروژه‌های کاربر
    async listProjects(user) {
        const { data, error } = await supabase
            .from('projects')
            .select('id, name, created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);

        // تبدیل نام کلید تاریخ برای سازگاری با کدهای فرانت‌اند شما
        return data.map(proj => ({
            id: proj.id,
            name: proj.name,
            timestamp: new Date(proj.created_at).getTime()
        }));
    }

    // دریافت اطلاعات کامل یک پروژه
    async loadProject(projectId, user) {
        const { data, error } = await supabase
            .from('projects')
            .select('data')
            .eq('id', projectId)
            .eq('user_id', user.id)
            .single();

        if (error) throw new Error(error.message);
        return { data: data.data };
    }

    // حذف یک پروژه
    async deleteProject(projectId, user) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId)
            .eq('user_id', user.id);

        if (error) throw new Error(error.message);
        return { success: true };
    }
}