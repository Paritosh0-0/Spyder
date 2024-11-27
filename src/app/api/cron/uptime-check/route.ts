import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Extract the cron interval from the URL query parameters
  const { searchParams } = new URL(request.url);
  const cronInterval = searchParams.get('interval')?.split('')[0] || '1';

  console.log(cronInterval)

  // Fetch links that match the current cron interval
  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq('cron_interval', cronInterval);

  if (linksError) {
    console.error("Error fetching links:", linksError);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }

  // Check uptime for each link
  for (const link of links) {
    try {
      const startTime = performance.now();
      const response = await fetch(link.url, { 
        method: 'GET', 
      });
      const endTime = performance.now();
      
      // Calculate response time in milliseconds
      const response_time = endTime - startTime;
      const status = response.ok ? "up" : "down";
    
      // Insert uptime check result
      const { error: insertError } = await supabase
        .from("uptime_checks")
        .insert({ 
          link_id: link.id, 
          status, 
          response_time: Math.round(response_time) 
        });
    
      if (insertError) {
        console.error("Error inserting uptime check:", insertError);
      }
    } catch (error) {
      console.error(`Error checking uptime for ${link.url}:`, error);
      
      // Insert downtime record with null response time
      await supabase
        .from("uptime_checks")
        .insert({ 
          link_id: link.id, 
          status: "down", 
          response_time: null 
        });
    }
  }

  return NextResponse.json({ 
    message: "Uptime check completed", 
    interval: cronInterval,
    linksChecked: links.length 
  });
}