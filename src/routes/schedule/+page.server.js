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
    
    const timeMin = new Date(year, actualMonth, 1).toISOString();
    const timeMax = new Date(year, actualMonth + 1, 0, 23, 59, 59).toISOString();
    
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
