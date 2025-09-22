"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const schema = z.object({ name: z.string().min(2), phone: z.string().min(5), note: z.string().optional() });
type FormData = z.infer<typeof schema>;
export default function LeadForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try { const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!res.ok) throw new Error("bad"); setStatus("ok"); reset(); } catch { setStatus("err"); }
  };
  return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
    <div><Label>نام</Label><Input placeholder="اسم شما" {...register("name")} /></div>
    <div><Label>شماره تماس</Label><Input placeholder="09xx..." {...register("phone")} /></div>
    <div><Label>توضیح پروژه (اختیاری)</Label><Textarea placeholder="ابعاد، رنگ، فضا..." {...register("note")} /></div>
    <Button variant="brass" className="w-full" type="submit">ثبت درخواست</Button>
    {status === "ok" && <p className="text-green-400 text-sm">ثبت شد — به‌زودی تماس می‌گیریم.</p>}
    {status === "err" && <p className="text-red-400 text-sm">خطا — اتصال اینترنت/سرور را چک کن.</p>}
  </form>);
}
