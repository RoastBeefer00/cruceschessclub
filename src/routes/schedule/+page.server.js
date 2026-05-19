import { env } from '$env/dynamic/private';
import {
  logException,
  logHttpError,
  logMissingKey,
  logRequest,
  logSuccess,
} from '$lib/calendarLog.js';

const SOURCE = 'schedule';

export async function load() {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const apiKey = env.GOOGLE_CALENDAR_API_KEY;

  if (!apiKey) {
    logMissingKey(SOURCE);
    return { calendarEvents: {} };
  }

  const currentDate = new Date();
  const baseMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthsData = {};

  for (let i = 0; i < 3; i++) {
    const monthIndex = baseMonth + i;
    const year = monthIndex > 11 ? currentYear + 1 : currentYear;
    const actualMonth = monthIndex > 11 ? monthIndex - 12 : monthIndex;

    // DST in 2025: March 9 - November 2
    const isDST =
      (actualMonth > 2 && actualMonth < 10) ||
      (actualMonth === 2 && new Date(year, actualMonth, 9).getDate() <= 9) ||
      (actualMonth === 10 && new Date(year, actualMonth, 2).getDate() > 2);
    const offset = isDST ? '-06:00' : '-07:00';

    const timeMin = `${year}-${String(actualMonth + 1).padStart(2, '0')}-01T00:00:00${offset}`;
    const lastDay = new Date(year, actualMonth + 1, 0).getDate();
    const timeMax = `${year}-${String(actualMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}T23:59:59${offset}`;

    const params = new URLSearchParams({
      key: apiKey,
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '50',
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
    const ctx = `month=${monthIndex} (${year}-${String(actualMonth + 1).padStart(2, '0')})`;
    logRequest(`${SOURCE} ${ctx}`, url, calendarId);

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        await logHttpError(`${SOURCE} ${ctx}`, url, response);
        monthsData[monthIndex] = [];
        continue;
      }

      const data = await response.json();
      const items = data.items || [];
      monthsData[monthIndex] = items;
      logSuccess(`${SOURCE} ${ctx}`, items.length, { timeMin, timeMax });
    } catch (error) {
      logException(`${SOURCE} ${ctx}`, error, { calendarId });
      monthsData[monthIndex] = [];
    }
  }

  return { calendarEvents: monthsData };
}
