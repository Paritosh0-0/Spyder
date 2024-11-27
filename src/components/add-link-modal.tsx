'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSupabase } from '@/components/providers'
import { toast } from 'sonner'

interface AddLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddLinkModal({ isOpen, onClose }: AddLinkModalProps) {
  const [url, setUrl] = useState('')
  const [duration, setDuration] = useState('1')
  const { supabase, session } = useSupabase()
  const queryClient = useQueryClient()

  const addLinkMutation = useMutation({
    mutationFn: async (newLink: { url: string; cron_interval: number; user_id: string }) => {
      const { data, error } = await supabase
        .from('links')
        .insert([newLink])
        .select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success( 'Link added successfully' )
      onClose()
    },
    onError: () => {
      toast.error('Failed to add link')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user.id) return
    addLinkMutation.mutate({ url, cron_interval: parseInt(duration), user_id: session.user.id })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
              <SelectItem value="6">6 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">Add Link</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

