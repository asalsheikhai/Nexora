"use client";
import { useEffect, useMemo, useState } from "react";
type Lead = { ts?: string; name: string; phone: string; note?: string; ip?: string; ua?: string; path?: string; utm?: any };
export default function LeadsTable() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  useEffect(()=>{ fetch("/api/leads/sheet").then(r=>r.json()).then(setRows).catch(()=>setRows([])); },[]);
  const filtered = useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s) return rows; return rows.filter(r=>JSON.stringify(r).toLowerCase().includes(s)); },[rows,q]);
  return (<div>
    <input className="input mb-4" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
    <div className="overflow-auto"><table className="min-w-full text-sm"><thead className="text-neutral-400"><tr><th className="text-left p-2">Time</th><th className="text-left p-2">Name</th><th className="text-left p-2">Phone</th><th className="text-left p-2">Note</th><th className="text-left p-2">UTM</th><th className="text-left p-2">IP</th><th className="text-left p-2">UA</th><th className="text-left p-2">Path</th></tr></thead><tbody>{filtered.map((r,i)=>(<tr key={i} className="border-t border-neutral-800"><td className="p-2">{r.ts||"-"}</td><td className="p-2">{r.name}</td><td className="p-2">{r.phone}</td><td className="p-2">{r.note||"-"}</td><td className="p-2"><code className="text-xs">{r.utm?JSON.stringify(r.utm):"-"}</code></td><td className="p-2">{r.ip||"-"}</td><td className="p-2 truncate max-w-[240px]">{r.ua||"-"}</td><td className="p-2">{r.path||"-"}</td></tr>))}</tbody></table></div>
    {rows.length===0 && <p className="text-neutral-500 text-sm mt-3">No rows (check SHEETS_PUBLISHED_CSV_URL).</p>}
  </div>);
}
