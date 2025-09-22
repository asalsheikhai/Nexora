import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function getClientIp(headers: Headers) { const xff = headers.get("x-forwarded-for"); if (!xff) return "0.0.0.0"; return xff.split(",")[0]?.trim() || "0.0.0.0"; }
