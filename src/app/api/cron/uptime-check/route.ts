import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Fetch all links
  const { data: links, error: linksError } = await supabase
    .from('links')
    .select('*')

  if (linksError) {
    console.error('Error fetching links:', linksError)
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }

  // Check uptime for each link
  for (const link of links) {
    try {
      const response = await fetch(link.url)
      const status = response.ok ? 'up' : 'down'

      // Insert uptime check result
      const { error: insertError } = await supabase
        .from('uptime_checks')
        .insert({ link_id: link.id, status })

      if (insertError) {
        console.error('Error inserting uptime check:', insertError)
      }
    } catch (error) {
      console.error(`Error checking uptime for ${link.url}:`, error)
      // Insert downtime record
      await supabase
        .from('uptime_checks')
        .insert({ link_id: link.id, status: 'down' })
    }
  }

  return NextResponse.json({ message: 'Uptime check completed' })
}

