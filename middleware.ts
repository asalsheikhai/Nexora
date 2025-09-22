import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const params = Object.fromEntries(url.searchParams.entries());
  const payload: Record<string, string> = {};
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach((k)=>{ const v=(params as any)[k]; if(v) payload[k]=String(v).slice(0,100); });
  const ref = req.headers.get("referer"); if (ref) payload["ref"]=ref.slice(0,200);
  if (Object.keys(payload).length) { const res = NextResponse.next(); res.cookies.set("__utm", JSON.stringify(payload), { httpOnly:false, path:"/", maxAge:60*60*24*90 }); return res; }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/|favicon.ico|api/og).*)"] };
