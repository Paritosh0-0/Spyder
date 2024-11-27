import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getKPIColorAndStatus(
  percentage: number,
  thresholds = {
    excellent: 90,
    good: 70,
    warning: 50,
  },
) {
  let status = "Critical";
  let color = "text-red-600";

  if (percentage > thresholds.excellent) {
    status = "Excellent";
    color = "text-green-600";
  } else if (percentage > thresholds.good) {
    status = "Good";
    color = "text-yellow-600";
  } else if (percentage > thresholds.warning) {
    status = "Warning";
    color = "text-orange-600";
  }

  return {
    percentage,
    status,
    color,
  };
}
