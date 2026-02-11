import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { requireAuth } from '@/lib/auth';

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
    // Verify authentication (required: false during migration, flip to true later)
    const { auth, errorResponse } = await requireAuth(request, { required: false });
    if (errorResponse) return errorResponse;

    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    
    // Use authenticated userId if available, fall back to form data during migration
    const formUserId = formData.get('userId') as string | null;
    const userId = auth?.userId || formUserId;

    console.log('Upload request received');
    console.log('File:', file ? `name=${file.name}, type=${file.type}, size=${file.size}` : 'null');
    console.log('UserId:', userId, auth ? '(authenticated)' : '(from form data)');

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

    // Convert file to buffer first to check size
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Buffer size:', buffer.length);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: 'Empty file received' },
        { status: 400 }
      );
    }

    // Determine file type - React Native might not send correct mime type
    let contentType = file.type;
    if (!contentType || contentType === 'application/octet-stream') {
      // Default to jpeg for React Native uploads
      contentType = 'image/jpeg';
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(contentType)) {
      console.log('Invalid content type:', contentType);
      return NextResponse.json(
        { error: `Invalid file type: ${contentType}. Allowed: jpeg, png, webp, heic` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = contentType.split('/')[1] === 'jpeg' ? 'jpg' : contentType.split('/')[1];
    const timestamp = Date.now();
    const randomId = crypto.randomBytes(8).toString('hex');
    const filename = `${userId}/${timestamp}-${randomId}.${ext}`;

    // Upload to R2
    console.log('Uploading to R2:', filename, 'size:', buffer.length, 'type:', contentType);
    
    const command = new PutObjectCommand({
      Bucket: getBucketName(),
      Key: filename,
      Body: buffer,
      ContentType: contentType,
    });

    await s3Client.send(command);

    // Return public URL
    const imageUrl = `${R2_PUBLIC_URL}/${filename}`;

    console.log('Image uploaded successfully:', imageUrl);

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

