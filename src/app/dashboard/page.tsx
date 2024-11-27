"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clock, LinkIcon, Zap } from "lucide-react";

import AddLinkModal  from "@/components/add-link-modal";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { LinkCard } from "@/components/link-card";
import { useSupabase } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "@/lib/types";
import { getKPIColorAndStatus } from "@/lib/utils";

export default function DashboardPage() {
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const { supabase, session } = useSupabase();

  const {
    data: links,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", session?.user.id);
      if (error) throw error;
      return data as Link[];
    },
  });
  const totalLinks = links?.length || 0;
  const uptimeKPI = useMemo(() => {
    if (!links?.length) {
      return {
        percentage: 0.0,
        status: "Critical",
        color: "text-red-600",
      };
    }

    const upLinks = links.filter((link) => link.status === "up").length;
    const uptimePercentage = (upLinks / links.length) * 100;

    return getKPIColorAndStatus(uptimePercentage);
  }, [links]);

  const overallHealthScore = useMemo(() => {
    if (!links?.length) {
      return {
        percentage: 0.0,
        status: "Critical",
        color: "text-red-600",
      };
    }

    const upLinks = links.filter((link) => link.status === "up").length;
    const healthPercentage = (upLinks / links.length) * 100;

    return getKPIColorAndStatus(healthPercentage);
  }, [links]);
  if (error) return <div>Error loading links</div>;

  

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Activity className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Uptime Monitor</span>
                    <span className="">Dashboard</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">Dashboard</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">Links</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">Settings</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-1">
            <Card className="shadow-none">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
                <CardDescription>
                  Get advanced features and priority support.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2.5 p-4">
                <Button
                  className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <Button onClick={() => setIsAddLinkModalOpen(true)}>Add Link</Button>
        </header>
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <main className="flex-grow bg-background p-6">
            <div className="mx-auto">
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Links
                    </CardTitle>
                    <LinkIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-500">
                      {totalLinks}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Uptime
                    </CardTitle>
                    <Zap className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${uptimeKPI.color}`}>
                      {uptimeKPI.percentage.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {uptimeKPI.status}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Health Score
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-2xl font-bold ${overallHealthScore.color}`}
                    >
                      {overallHealthScore.percentage.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {overallHealthScore.status}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {links?.map((link) => <LinkCard key={link.id} link={link} />)}
              </div>
            </div>
          </main>
        )}
        <AddLinkModal
          isOpen={isAddLinkModalOpen}
          onClose={() => setIsAddLinkModalOpen(false)}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
