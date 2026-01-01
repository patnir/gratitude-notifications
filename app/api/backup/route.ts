import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/drizzle/schema';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CL_S3_URL,
  credentials: {
    accessKeyId: process.env.CL_EXPO_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CL_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = 'gratitude-images';

export async function GET() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupData: Record<string, unknown[]> = {};

    // Fetch all tables
    console.log('Starting database backup...');

    const [users, circles, circleMembers, gratitudeEntries, pushTokens, entryReactions] = await Promise.all([
      db.select().from(schema.users),
      db.select().from(schema.circles),
      db.select().from(schema.circleMembers),
      db.select().from(schema.gratitudeEntries),
      db.select().from(schema.pushTokens),
      db.select().from(schema.entryReactions),
    ]);

    backupData.users = users;
    backupData.circles = circles;
    backupData.circleMembers = circleMembers;
    backupData.gratitudeEntries = gratitudeEntries;
    backupData.pushTokens = pushTokens;
    backupData.entryReactions = entryReactions;

    console.log('Fetched data:', {
      users: users.length,
      circles: circles.length,
      circleMembers: circleMembers.length,
      gratitudeEntries: gratitudeEntries.length,
      pushTokens: pushTokens.length,
      entryReactions: entryReactions.length,
    });

    // Convert to JSONL format (one JSON object per line)
    const jsonlLines: string[] = [];
    for (const [tableName, rows] of Object.entries(backupData)) {
      for (const row of rows) {
        jsonlLines.push(JSON.stringify({ table: tableName, data: row }));
      }
    }
    const jsonlContent = jsonlLines.join('\n');

    // Upload to R2
    const filename = `dbbackups/backup-${timestamp}.jsonl`;
    
    console.log('Uploading backup to R2:', filename, 'size:', jsonlContent.length);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: jsonlContent,
      ContentType: 'application/jsonl',
    });

    await s3Client.send(command);

    console.log('Backup completed successfully:', filename);

    return NextResponse.json({
      success: true,
      filename,
      timestamp,
      counts: {
        users: users.length,
        circles: circles.length,
        circleMembers: circleMembers.length,
        gratitudeEntries: gratitudeEntries.length,
        pushTokens: pushTokens.length,
        entryReactions: entryReactions.length,
      },
      totalRows: jsonlLines.length,
    });
  } catch (error) {
    console.error('Backup failed:', error);
    return NextResponse.json(
      { error: 'Backup failed', details: String(error) },
      { status: 500 }
    );
  }
}

