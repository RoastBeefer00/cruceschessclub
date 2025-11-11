# Google Calendar Integration Setup

This project now supports fetching events from Google Calendar API.

## Setup Instructions

1. **Get a Google Calendar API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Calendar API for your project
   - Go to "Credentials" and create an API key
   - Restrict the API key to only the Calendar API for security

2. **Get your Calendar ID:**
   - Open Google Calendar in your browser
   - Go to calendar settings
   - Find "Integrate calendar" section
   - Copy the Calendar ID (usually looks like an email address)

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Add your API key and Calendar ID:
   ```
   GOOGLE_CALENDAR_API_KEY=your_actual_api_key_here
   GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
   ```

4. **Make your calendar public (for read-only API key access):**
   - In Google Calendar settings, go to "Access permissions"
   - Check "Make available to public"
   - This allows the API key to read events without OAuth

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage

The calendar component now accepts a `useGoogleCalendar` prop:
- `useGoogleCalendar={true}` - Fetches events from Google Calendar
- `useGoogleCalendar={false}` - Uses the static Schedule.json file (default)

The main page is currently set to use Google Calendar. To switch back to static data, change the prop in `src/routes/+page.svelte`.
