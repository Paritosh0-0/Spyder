import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle, Globe, Shield, Zap, Github, ArrowRight } from 'lucide-react'
import { Globe as GlobeComponent } from '@/components/globe'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Image src={"/logo.png"} width={140} height={110} alt='logo'/>
                    
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href={"/auth/login"}><Button variant="outline">Sign In</Button></Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge variant="outline" className="px-3 py-1">
                Proudly Open Source
              </Badge>
              <div className="space-y-2 max-w-[900px]">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  A better way to monitor your services
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Monitor your API and website globally, identify performance issues, downtime and receive alerts before your users are affected.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/auth/login"}><Button size="lg" className="px-8">
                  Get Started
                </Button></Link>
                <Link href={"https://github.com/Paritosh0-0/Spyder"}><Button size="lg" variant="outline" className="px-8">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button></Link>
                
              </div>
        
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800 items-center justify-center flex flex-col">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <GlobeComponent />
              </div>
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Global Monitoring Network
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 md:text-lg">
                    Monitor your services from multiple locations worldwide. Get real-time insights into your application&apos;s performance and availability.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "24/7 uptime monitoring from multiple regions",
                    "Real-time latency measurements",
                    "Instant downtime alerts",
                    "Historical performance data"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <Link href={"/auth/login"}>
                    <Button variant="outline" className="group">
                      Learn more about our network
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Advanced Monitoring Features
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-lg">
                  Everything you need to ensure your services are running smoothly
                </p>
              </div>
              <div className="lg:col-span-2 grid gap-8 md:grid-cols-2">
                {[
                  {
                    title: "Latency Monitoring",
                    description: "Track response times from multiple locations worldwide",
                    icon: Zap
                  },
                  {
                    title: "Uptime Tracking",
                    description: "Get notified immediately when your services go down",
                    icon: Activity
                  },
                  {
                    title: "SSL Monitoring",
                    description: "Never miss an SSL certificate expiration",
                    icon: Shield
                  },
                  {
                    title: "Global Coverage",
                    description: "Monitor from multiple continents and regions",
                    icon: Globe
                  }
                ].map((feature) => (
                  <div key={feature.title} className="flex flex-col space-y-2">
                    <div className="p-2 w-fit rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 border-t flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to Start Monitoring?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg mb-8">
              Join thousands of satisfied customers who trust LinkPulse for their uptime monitoring needs.
            </p>
            <div className="space-x-4">
              <Link href={"/auth/login"}><Button size="lg">Get Started for Free</Button></Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400 ">Made by Paritosh Nimdeo</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/Paritosh0-0/Spyder">GitHub</Link>
        </nav>
      </footer>
    </div>
  )
}

