"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSupabase } from "@/components/providers";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "./ui/skeleton";

export function UptimeChart({ linkId }: { linkId: string }) {
  const { supabase } = useSupabase();

  const { data: uptimeData, isLoading } = useQuery({
    queryKey: ["uptime", linkId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("uptime_checks")
        .select("created_at, response_time")
        .eq("link_id", linkId)
        .order("created_at", { ascending: true })
        .limit(100);
      if (error) throw error;
      return data.map((log) => ({
        timestamp: new Date(log.created_at).toLocaleTimeString(),
        responseTime: log.response_time,
      }));
    },
  });

  if (isLoading) return <Skeleton className="h-10 w-full" />;

  return (
    <Card className="p-4">
      <ChartContainer
        config={{
          responseTime: {
            label: "Response Time",
            color: "hsl(142, 76%, 36%)", // Green color
          },
        }}
        className="h-[200px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={uptimeData}>
            <XAxis
              dataKey="timestamp"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}ms`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="responseTime"
              stroke="var(--color-responseTime)"
              strokeWidth={2}
              fill="url(#colorResponseTime)"
            />
            <defs>
              <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}

