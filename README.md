# Gratitude Notifications Backend

Next.js API backend for sending push notifications when users create gratitude entries in circles.

## Setup

### 1. Environment Variables

Add these to your Vercel project settings (or `.env.local` for local development):

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
EXPO_ACCESS_TOKEN=your_expo_access_token
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

## Next Steps

1. ✅ Backend is set up
2. ⏳ Add push token registration to mobile app
3. ⏳ Call `/api/notify` after creating entries in circles
4. ⏳ Test end-to-end

See the main gratitude app for mobile app integration code.
