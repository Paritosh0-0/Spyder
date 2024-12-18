"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type SupabaseContext = {
  supabase: SupabaseClient;
  session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient());
  const [session, setSession] = useState<Session | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};
