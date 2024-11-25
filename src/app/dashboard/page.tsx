'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSupabase } from '@/components/providers'
import Navbar from '@/components/navbar'
import AddLinkModal from '@/components/add-link-modal'
import UptimeChart from '@/components/uptime-chart'

export default function Dashboard() {
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false)
  const { supabase, session } = useSupabase()

  const { data: links, isLoading, error } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', session?.user.id)
      if (error) throw error
      return data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading links</div>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => setIsAddLinkModalOpen(true)}>Add Link</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links?.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <CardTitle>{link.url}</CardTitle>
                </CardHeader>
                <CardContent>
                  <UptimeChart linkId={link.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
      />
    </div>
  )
}

