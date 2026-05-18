import { json } from "@sveltejs/kit";
import { p as private_env } from "../../../../chunks/shared-server.js";
import { b as logMissingKey, c as logRequest, a as logHttpError, d as logSuccess, l as logException } from "../../../../chunks/calendarLog.js";
const SOURCE = "api";
async function GET({ url }) {
  const calendarId = private_env.GOOGLE_CALENDAR_ID || "primary";
  const apiKey = private_env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    logMissingKey(SOURCE);
    return json(
      { error: "Google Calendar API key not configured" },
      { status: 500 }
    );
  }
  const timeMin = url.searchParams.get("timeMin") || (/* @__PURE__ */ new Date()).toISOString();
  const timeMax = url.searchParams.get("timeMax");
  const maxResults = url.searchParams.get("maxResults") || "50";
  const params = new URLSearchParams({
    key: apiKey,
    timeMin,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults
  });
  if (timeMax) {
    params.append("timeMax", timeMax);
  }
  const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  logRequest(SOURCE, apiUrl, calendarId);
  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      const detail = await logHttpError(SOURCE, apiUrl, response);
      return json(
        {
          error: "Failed to fetch calendar events",
          status: response.status,
          detail: String(detail).slice(0, 500)
        },
        { status: response.status }
      );
    }
    const data = await response.json();
    logSuccess(SOURCE, (data.items || []).length, {
      timeMin,
      timeMax: timeMax || "(none)"
    });
    return json(data);
  } catch (error) {
    logException(SOURCE, error, { calendarId });
    return json(
      {
        error: "Failed to fetch calendar events",
        detail: error?.message ?? String(error)
      },
      { status: 500 }
    );
  }
}
export {
  GET
};
