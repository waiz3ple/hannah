import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { processZipFile } from "./upload-handler.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a88c82e1/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-a88c82e1/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.text("Email and password are required", 400);
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Create user with admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error for ${email}: ${error.message}`);
      return c.text(error.message, 400);
    }

    console.log(`User created successfully: ${email}`);
    return c.json({ success: true, user: data.user });
  } catch (error: any) {
    console.log(`Signup exception: ${error.message}`);
    return c.text(error.message || "Failed to create account", 500);
  }
});

// Upload event photos endpoint
app.post("/make-server-a88c82e1/upload-event-photos", async (c) => {
  try {
    console.log('Upload event photos request received');
    
    // Parse multipart form data
    const formData = await c.req.formData();
    const zipFile = formData.get('zipFile') as File;
    const eventId = formData.get('eventId') as string;

    if (!zipFile) {
      return c.text('No zip file provided', 400);
    }

    if (!eventId) {
      return c.text('No event ID provided', 400);
    }

    console.log(`Processing zip file for event ${eventId}, file size: ${zipFile.size} bytes`);

    // Convert File to Uint8Array
    const arrayBuffer = await zipFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Process the zip file
    const result = await processZipFile(uint8Array, eventId);

    console.log(`Successfully uploaded ${result.photoCount} photos for event ${eventId}`);

    return c.json({
      success: true,
      photoCount: result.photoCount,
      message: `Successfully uploaded ${result.photoCount} photos`,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return c.text(error.message || 'Failed to upload photos', 500);
  }
});

Deno.serve(app.fetch);