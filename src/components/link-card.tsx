import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UptimeChart } from "@/components/uptime-chart";
import { Link } from "@/lib/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{link.url}</span>
          <StatusBadge status={link.status} />
        </CardTitle>
        <CardDescription>
          Last checked: Less than {link.cron_interval}hrs ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className="text-2xl font-semibold uppercase">{link.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Next Check
              </p>
              <p className="text-2xl font-semibold">
                Under {link.cron_interval} hr
              </p>
            </div>
          </div>
          <UptimeChart linkId={link.id} />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "up" | "down" | "issue" }) {
  switch (status) {
    case "up":
      return (
        <Badge variant="success">
          <CheckCircle className="mr-1 h-4 w-4" /> Up
        </Badge>
      );
    case "down":
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-4 w-4" /> Down
        </Badge>
      );
    case "issue":
      return (
        <Badge variant="warning">
          <AlertCircle className="mr-1 h-4 w-4" /> Issue
        </Badge>
      );
  }
}
