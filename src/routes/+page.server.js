import { env } from '$env/dynamic/private';

export async function load() {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const apiKey = env.GOOGLE_CALENDAR_API_KEY;
  
  if (!apiKey) {
    return { calendarEvents: [] };
  }

  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const timeMin = new Date(year, month, 1).toISOString();
  const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
  
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50'
  });

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
      console.error('Google Calendar API error');
      return { calendarEvents: [] };
    }

    const data = await response.json();
    return { calendarEvents: data.items || [] };
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return { calendarEvents: [] };
  }
}
