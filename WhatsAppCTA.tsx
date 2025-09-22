"use client";
import { MessageCircle } from "lucide-react";
export default function WhatsAppCTA() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || "+989121234567";
  const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("سلام، می‌خوام NexoraLuxe رو ببینم.")}`;
  return (<a href={url} target="_blank" className="btn btn-brass"><MessageCircle className="h-5 w-5" />WhatsApp</a>);
}
