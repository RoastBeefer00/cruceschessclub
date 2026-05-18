import { p as private_env } from "../../chunks/shared-server.js";
import { b as logMissingKey, c as logRequest, a as logHttpError, d as logSuccess, l as logException } from "../../chunks/calendarLog.js";
const SOURCE = "home";
async function load() {
  const calendarId = private_env.GOOGLE_CALENDAR_ID || "primary";
  const apiKey = private_env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    logMissingKey(SOURCE);
    return { calendarEvents: [] };
  }
  const now = /* @__PURE__ */ new Date();
  const timeMin = now.toISOString();
  const timeMaxDate = new Date(now);
  timeMaxDate.setMonth(timeMaxDate.getMonth() + 3);
  const timeMax = timeMaxDate.toISOString();
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50"
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  logRequest(SOURCE, url, calendarId);
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
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
export {
  load
};
