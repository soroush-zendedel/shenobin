/*
 * ShenoBin - Visual Theory & Creative Studio
 * Copyright (C) 2026 soroush-zendedel.github.io/shenobin/
 *
 * This file is part of ShenoBin.
 *
 * ShenoBin is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ShenoBin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ShenoBin. If not, see <https://www.gnu.org/licenses/>.
 *
 * All branding, logos, and the name "ShenoBin" are properties of soroush-zendedel.github.io/shenobin/.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// اضافه کردن ایمپورت کلاینت سوپابیس (مسیر را بر اساس پوشه‌بندی پروژه تنظیم کنید)
// import { supabase } from './js/supabase-client.js'; 
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const APP_DOMAIN = 'https://soroush-zendedel.github.io/shenobin/';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const globalAPI = (typeof browser !== 'undefined') ? browser : chrome;

if (globalAPI.action && globalAPI.action.onClicked) {
    globalAPI.action.onClicked.addListener((tab) => {
        globalAPI.tabs.create({
            url: globalAPI.runtime.getURL("index.html")
        });
    });
}

async function getIdentity() {
    let data = await globalAPI.storage.local.get('clientId');
    let clientId = data.clientId;

    if (!clientId) {
        clientId = self.crypto.randomUUID();
        await globalAPI.storage.local.set({ clientId });
    }

    let sessionData = await globalAPI.storage.session.get(['sessionId', 'lastActive']);
    let sessionId = sessionData.sessionId;
    let lastActive = sessionData.lastActive;
    
    const now = Date.now();

    if (!sessionId || !lastActive || (now - lastActive) > SESSION_TIMEOUT_MS) {
        sessionId = self.crypto.randomUUID(); 
    }

    await globalAPI.storage.session.set({ sessionId, lastActive: now });
    return { clientId, sessionId };
}

async function trackEvent(eventName, params = {}) {
    try {
        const { clientId, sessionId } = await getIdentity();
        const timestamp = Date.now();

        const payload = {
            client_id: clientId,
            session_id: sessionId,
            events: [{
                name: eventName,
                params: params,
                timestamp: timestamp
            }]
        };

        if (navigator.onLine) {
            sendData(payload).catch((err) => {
                console.warn('[SenseAudio Analytics] Send failed, queuing offline.', err);
                saveOffline(payload);
            });
        } else {
            saveOffline(payload);
        }
    } catch (error) {
        console.error('[SenseAudio Analytics] Error in tracking:', error);
    }
}

// به‌روزرسانی تابع sendData برای استفاده مستقیم از Supabase
async function sendData(payload) {
    // استفاده از API مستقیم سوپابیس (PostgREST) با fetch بومی مرورگر
    const response = await fetch(`${SUPABASE_URL}/rest/v1/analytics`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
            client_id: payload.client_id,
            session_id: payload.session_id,
            event_data: payload.events 
        })
    });

    if (!response.ok) {
        throw new Error(`Supabase Error: ${response.status}`);
    }

    flushOfflineQueue();
}

async function saveOffline(payload) {
    const data = await globalAPI.storage.local.get('offlineQueue');
    const offlineQueue = data.offlineQueue || [];
    
    offlineQueue.push(payload);
    await globalAPI.storage.local.set({ offlineQueue });
    console.debug('[SenseAudio Analytics] Event queued offline.');
}

async function flushOfflineQueue() {
    const data = await globalAPI.storage.local.get('offlineQueue');
    const offlineQueue = data.offlineQueue || [];

    if (offlineQueue.length === 0) return;

    console.debug(`[SenseAudio Analytics] Flushing ${offlineQueue.length} offline events...`);

    const newQueue = [];
    
    for (const item of offlineQueue) {
        try {
            await sendData(item);
        } catch (e) {
            newQueue.push(item);
        }
    }

    await globalAPI.storage.local.set({ offlineQueue: newQueue });
}

globalAPI.runtime.onInstalled.addListener((details) => {
    trackEvent('extension_installed', { reason: details.reason });
});

globalAPI.runtime.onStartup.addListener(() => {
    trackEvent('browser_startup');
    setTimeout(flushOfflineQueue, 5000);
});

globalAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'ANALYTICS_EVENT') {
        trackEvent(request.name, request.params);
    }
});

self.addEventListener('online', () => {
    flushOfflineQueue();
});