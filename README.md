# Gratitude Notifications Backend

Next.js API backend for sending push notifications when users create gratitude entries in circles.

## Setup

### 1. Environment Variables

Add these to your Vercel project settings (or `.env.local` for local development):

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
EXPO_ACCESS_TOKEN=your_expo_access_token
BACKUP_SECRET=your_random_secret_for_manual_backups
CL_S3_URL=https://xxx.r2.cloudflarestorage.com
CL_EXPO_ACCESS_KEY_ID=your_r2_access_key
CL_SECRET_ACCESS_KEY=your_r2_secret_key
```

**Get DATABASE_URL:**
- Use the same database URL from your main gratitude app
- From Neon dashboard → Connection Details

**Get EXPO_ACCESS_TOKEN:**
1. Go to https://expo.dev/accounts/[your-account]/settings/access-tokens
2. Create a new access token
3. Copy and add to Vercel environment variables

### 2. Create Push Tokens Table

Run this SQL in your Neon database to create the `push_tokens` table:

```sql
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  device_id TEXT,
  platform TEXT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
  updated_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
);

CREATE INDEX IF NOT EXISTS push_tokens_user_id_idx ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS push_tokens_token_idx ON push_tokens(token);
```

### 3. Deploy to Vercel

```bash
# If not already connected
vercel

# Deploy
vercel --prod
```

Or push to GitHub and Vercel will auto-deploy.

## API Endpoints

### POST `/api/push-tokens`
Register or update a push notification token for a user.

**Request:**
```json
{
  "userId": "user_xxx",
  "token": "ExponentPushToken[xxx]",
  "platform": "ios"
}
```

### POST `/api/notify`
Send push notifications to circle members when a new entry is created.

**Request:**
```json
{
  "entryId": "uuid",
  "circleId": "uuid",
  "authorId": "user_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "notified": 3
}
```

### GET `/api/backup`
Daily database backup to Cloudflare R2. Runs automatically via Vercel cron at 3 AM UTC.

**Authentication:**
- Vercel cron requests are automatically authorized
- Manual trigger requires `BACKUP_SECRET` via query param or Bearer token

**Manual trigger:**
```bash
curl "https://grateful.so/api/backup?secret=YOUR_BACKUP_SECRET"
```

**Response:**
```json
{
  "success": true,
  "filename": "dbbackups/backup-2025-01-01T03-00-00-000Z.jsonl",
  "timestamp": "2025-01-01T03-00-00-000Z",
  "counts": {
    "users": 10,
    "circles": 5,
    "circleMembers": 15,
    "gratitudeEntries": 100,
    "pushTokens": 8,
    "entryReactions": 50
  },
  "totalRows": 188
}
```

**Backup location:** `gratitude-images` R2 bucket under `dbbackups/` folder.

## Next Steps

1. ✅ Backend is set up
2. ⏳ Add push token registration to mobile app
3. ⏳ Call `/api/notify` after creating entries in circles
4. ⏳ Test end-to-end

See the main gratitude app for mobile app integration code.
