'use client'

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSupabase } from '@/components/providers'

interface UptimeChartProps {
  linkId: string
}

export default function UptimeChart({ linkId }: UptimeChartProps) {
  const { supabase } = useSupabase()

  const { data: uptimeData, isLoading, error } = useQuery({
    queryKey: ['uptime', linkId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('uptime_checks')
        .select('*')
        .eq('link_id', linkId)
        .order('created_at', { ascending: true })
      if (error) throw error
      return data
    },
  })

  if (isLoading) return <div>Loading chart...</div>
  if (error) return <div>Error loading chart</div>

  const chartData = uptimeData?.map((check) => ({
    time: new Date(check.created_at).toLocaleTimeString(),
    status: check.status === 'up' ? 1 : 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 1]} ticks={[0, 1]} />
        <Tooltip />
        <Line type="monotone" dataKey="status" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

