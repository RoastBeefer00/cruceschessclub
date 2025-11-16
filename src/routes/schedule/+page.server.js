import { env } from '$env/dynamic/private';

export async function load() {
  const calendarId = env.GOOGLE_CALENDAR_ID || 'primary';
  const apiKey = env.GOOGLE_CALENDAR_API_KEY;

  if (!apiKey) {
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

    // Determine if this month is in MST or MDT
    // DST in 2025: March 9 - November 2
    const isDST = (actualMonth > 2 && actualMonth < 10) ||
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

      if (response.ok) {
        const data = await response.json();
        monthsData[monthIndex] = data.items || [];
      } else {
        monthsData[monthIndex] = [];
      }
    } catch (error) {
      console.error(`Error fetching calendar for month ${monthIndex}:`, error);
      monthsData[monthIndex] = [];
    }
  }

  return { calendarEvents: monthsData };
}
