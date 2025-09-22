# NEXORA — AR Showroom v4 (Notion + Server-side Pixels)

## What's new vs v3
- **Notion DB Sync**: creates a row with Stage=New + full metadata
- **Server-side Pixels**: Meta CAPI + GA4 Measurement Protocol on lead submit
- Health endpoint shows `notion`, `meta`, `ga4` toggles

## ENV (add to Vercel)
- Public: `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_AR_URL`
- Telegram (opt): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Email (opt): `RESEND_API_KEY`, `LEADS_TO_EMAIL`
- Rate limit (opt): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Sheets (opt): `SHEETS_WEBHOOK_URL`, `SHEETS_PUBLISHED_CSV_URL`
- CRM gate (opt): `CRM_PUBLIC_KEY`
- **Notion** (opt): `NOTION_API_KEY`, `NOTION_DATABASE_ID`
- **Meta** (opt): `META_PIXEL_ID`, `META_ACCESS_TOKEN`
- **GA4** (opt): `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`

## Notion database properties to create
Name (Title), Phone (Rich text), Note (Rich text), Stage (Select: New/In Progress/Won/Lost),
UTM (Rich text), IP (Rich text), UA (Rich text), Path (Rich text), Timestamp (Date)

## Test
- `/?utm_source=ig` → submit form → check Telegram/Email/Notion/Sheet
- `/api/health` → all true if envs present
