"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/components/providers";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const { supabase, session } = useSupabase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold">Uptime Tracker</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
