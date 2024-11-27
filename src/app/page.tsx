"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 bg-opacity-80 backdrop-blur-md z-50">
        <Image
          src="/Spyder Logo New.png"
          alt="Spyder Logo"
          width={210}
          height={210}
          className="object-contain"
        />
        <nav className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("get-started")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </button>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Button
            className={`text-sm ${
              isDarkTheme
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={toggleTheme}
          >
            {isDarkTheme ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section
          id="hero"
          className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            Welcome to Spyder
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            A platform that lets you track, monitor, and optimize your
            performance in real-time.
          </p>
          <Link href="/auth/login">
            <Button className="text-lg bg-black text-white hover:bg-gray-800">
              Get Started
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          {/* Cards */}
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className={`${
                isDarkTheme ? "bg-gray-700" : "bg-white shadow-lg"
              }`}
            >
              <CardHeader>
                <CardTitle>Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monitor your data and performance in real time with ease.</p>
              </CardContent>
            </Card>
            <Card
              className={`${
                isDarkTheme ? "bg-gray-700" : "bg-white shadow-lg"
              }`}
            >
              <CardHeader>
                <CardTitle>Custom Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Create personalized dashboards tailored to your needs.</p>
              </CardContent>
            </Card>
            <Card
              className={`${
                isDarkTheme ? "bg-gray-700" : "bg-white shadow-lg"
              }`}
            >
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain deep insights with advanced analytics and reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 flex flex-col items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$3/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> 5 websites
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> 1-minute checks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Email alerts
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$9/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> 20 websites
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> 30-second checks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Email & SMS alerts
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$39/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Unlimited websites
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> 10-second checks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> All alert types
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section
          id="get-started"
          className={`w-full py-12 md:py-24 flex flex-col items-center ${
            isDarkTheme
              ? "bg-gray-800 text-white"
              : "bg-gradient-to-br from-white to-gray-100 text-black"
          }`}
        >
          <p className="text-lg text-center mb-6">
            Kickstart your journey with Spyder in just a few steps!
          </p>
          <Link href="/auth/login">
            <Button
              className={`text-lg ${
                isDarkTheme ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Get Started Now
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-white text-center">
        <p>© 2024 Spyder. All rights reserved.</p>
      </footer>
    </div>
  );
}
