import { createClient } from "npm:@supabase/supabase-js@2";
import { unzip } from "https://deno.land/x/zipjs@v2.7.34/index.js";

export async function initializeStorageBucket() {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const bucketName = 'make-a88c82e1-event-photos';

  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 52428800, // 50MB
      });

      if (error) {
        console.error('Error creating bucket:', error);
        throw error;
      }
      
      console.log(`Bucket ${bucketName} created successfully`);
    }

    return bucketName;
  } catch (error) {
    console.error('Error initializing storage bucket:', error);
    throw error;
  }
}

export async function processZipFile(
  zipFileBuffer: Uint8Array,
  eventId: string
): Promise<{ photoCount: number; photoUrls: string[] }> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const bucketName = await initializeStorageBucket();
  const photoUrls: string[] = [];
  let photoCount = 0;

  try {
    // Save zip file to temp directory
    const tempZipPath = `/tmp/${eventId}-${Date.now()}.zip`;
    await Deno.writeFile(tempZipPath, zipFileBuffer);

    // Extract zip file
    const extractPath = `/tmp/${eventId}-${Date.now()}`;
    await Deno.mkdir(extractPath, { recursive: true });

    // Use unzip command
    const unzipProcess = new Deno.Command('unzip', {
      args: ['-q', tempZipPath, '-d', extractPath],
      stdout: 'piped',
      stderr: 'piped',
    });

    const { code } = await unzipProcess.output();

    if (code !== 0) {
      throw new Error('Failed to extract zip file');
    }

    // Find all image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imageFiles: string[] = [];

    async function findImages(dir: string) {
      for await (const entry of Deno.readDir(dir)) {
        const fullPath = `${dir}/${entry.name}`;
        
        if (entry.isDirectory) {
          await findImages(fullPath);
        } else if (entry.isFile) {
          const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'));
          if (imageExtensions.includes(ext)) {
            imageFiles.push(fullPath);
          }
        }
      }
    }

    await findImages(extractPath);

    // Upload each image to Supabase Storage
    for (const imagePath of imageFiles) {
      const imageData = await Deno.readFile(imagePath);
      const fileName = `${eventId}/${Date.now()}-${photoCount}.${imagePath.split('.').pop()}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageData, {
          contentType: `image/${imagePath.split('.').pop()}`,
          upsert: false,
        });

      if (error) {
        console.error(`Error uploading ${fileName}:`, error);
        continue;
      }

      // Generate signed URL (valid for 1 year)
      const { data: urlData } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 31536000); // 1 year in seconds

      if (urlData?.signedUrl) {
        photoUrls.push(urlData.signedUrl);
      }

      photoCount++;
    }

    // Cleanup temp files
    await Deno.remove(tempZipPath);
    await Deno.remove(extractPath, { recursive: true });

    console.log(`Successfully processed ${photoCount} photos for event ${eventId}`);
    
    return { photoCount, photoUrls };
  } catch (error) {
    console.error('Error processing zip file:', error);
    throw error;
  }
}
