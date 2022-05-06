import { client, parseData } from './client';

export async function fetchEntries() {
    const request = await client
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });
    
    return parseData(request);
}

export async function createEntry({ userId, content }) {
    const request = await client
    .from('entries')
    .insert({ guest_id: userId, content });

    return parseData(request);
}
