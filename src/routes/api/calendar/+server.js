import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ url }) {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const apiKey = env.GOOGLE_CALENDAR_API_KEY;
  
  if (!apiKey) {
    return json({ error: 'Google Calendar API key not configured' }, { status: 500 });
  }

  const timeMin = url.searchParams.get('timeMin') || new Date().toISOString();
  const timeMax = url.searchParams.get('timeMax');
  const maxResults = url.searchParams.get('maxResults') || '50';
  
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults
  });
  
  if (timeMax) {
    params.append('timeMax', timeMax);
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Calendar API error:', error);
      return json({ error: 'Failed to fetch calendar events' }, { status: response.status });
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}
