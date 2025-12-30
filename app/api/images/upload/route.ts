import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const R2_PUBLIC_URL = 'https://pub-6d45957254cf4079bab8f194fdd6ec27.r2.dev';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CL_S3_URL,
  credentials: {
    accessKeyId: process.env.CL_EXPO_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CL_SECRET_ACCESS_KEY!,
  },
});

// Extract bucket name from S3 URL (e.g., https://xxx.r2.cloudflarestorage.com/bucket-name)
function getBucketName(): string {
  const url = process.env.CL_S3_URL!;
  // R2 endpoint format: https://<account-id>.r2.cloudflarestorage.com
  // We need to get the bucket name from elsewhere or assume it
  // For R2, the bucket is specified in the PutObject command, not the endpoint
  return 'gratitude-images'; // Update this to match your bucket name
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'No userId provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: jpeg, png, webp, heic' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(8).toString('hex');
    const filename = `${userId}/${timestamp}-${randomId}.${ext}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: getBucketName(),
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Return public URL
    const imageUrl = `${R2_PUBLIC_URL}/${filename}`;

    console.log('Image uploaded:', imageUrl);

    return NextResponse.json({ 
      success: true, 
      imageUrl,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

