import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Welcome to Uptime Tracker</h1>
          <p className="text-xl text-white mb-8">Monitor your website&apos;s uptime with ease and precision.</p>
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

