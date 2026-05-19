import { env } from '$env/dynamic/private';
import {
  logException,
  logHttpError,
  logMissingKey,
  logRequest,
  logSuccess,
} from '$lib/calendarLog.js';

const SOURCE = 'home';

export async function load() {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const apiKey = env.GOOGLE_CALENDAR_API_KEY;

  if (!apiKey) {
    logMissingKey(SOURCE);
    return { calendarEvents: [] };
  }

  const now = new Date();
  const timeMin = now.toISOString();
  const timeMaxDate = new Date(now);
  timeMaxDate.setMonth(timeMaxDate.getMonth() + 3);
  const timeMax = timeMaxDate.toISOString();

  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  logRequest(SOURCE, url, calendarId);

  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!response.ok) {
      await logHttpError(SOURCE, url, response);
      return { calendarEvents: [] };
    }

    const data = await response.json();
    const items = data.items || [];
    logSuccess(SOURCE, items.length, { timeMin, timeMax });
    return { calendarEvents: items };
  } catch (error) {
    logException(SOURCE, error, { calendarId });
    return { calendarEvents: [] };
  }
}
