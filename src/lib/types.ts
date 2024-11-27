export interface Link {
  created_at: string;
  cron_interval: string;
  id: string;
  url: string;
  user_id: string;
  status: "up" | "down";
}

export interface UptimeCheck {
  id: string;
  link_id: string;
  created_at: number;
  status: "up" | "down";
}
