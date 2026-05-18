const TAG = "[calendar]";
function redact(url) {
  return url.replace(/([?&])key=[^&]+/, "$1key=REDACTED");
}
function logMissingKey(source) {
  console.warn(
    `${TAG} ${source}: GOOGLE_CALENDAR_API_KEY not set — returning empty events`
  );
}
function logRequest(source, url, calendarId) {
  console.log(
    `${TAG} ${source}: fetching calendarId=${calendarId} url=${redact(url)}`
  );
}
async function logHttpError(source, url, response) {
  let body = "";
  try {
    body = await response.text();
  } catch {
    body = "<unreadable body>";
  }
  let parsed = body;
  try {
    const json = JSON.parse(body);
    parsed = json?.error?.message ? `${json.error.code ?? "?"} ${json.error.status ?? ""} — ${json.error.message}` : body;
  } catch {
  }
  console.error(
    `${TAG} ${source}: HTTP ${response.status} ${response.statusText} url=${redact(url)} body=${String(parsed).slice(0, 500)}`
  );
  return parsed;
}
function logException(source, error, context = {}) {
  const extra = Object.entries(context).map(([k, v]) => `${k}=${v}`).join(" ");
  console.error(
    `${TAG} ${source}: exception ${extra} message=${error?.message ?? error} stack=${error?.stack ?? "n/a"}`
  );
}
function logSuccess(source, count, context = {}) {
  const extra = Object.entries(context).map(([k, v]) => `${k}=${v}`).join(" ");
  console.log(`${TAG} ${source}: ok events=${count} ${extra}`);
}
export {
  logHttpError as a,
  logMissingKey as b,
  logRequest as c,
  logSuccess as d,
  logException as l
};
