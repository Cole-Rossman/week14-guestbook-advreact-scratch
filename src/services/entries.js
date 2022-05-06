import { client, parseData } from './client';

export async function fetchEntries() {
    const request = await client
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false });
    console.log('request', request)
    return parseData(request);
}

export async function createEntry({ userId, content }) {
    const request = await client
    .from('entries')
    .insert({ guest_id: userId, content });

    return parseData(request);
}
