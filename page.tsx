import LeadsTable from "./table";
import Link from "next/link";
export default function CRMPage({ searchParams }: { searchParams?: { key?: string } }) {
  const gate = process.env.CRM_PUBLIC_KEY || "";
  const ok = gate ? (searchParams?.key === gate) : true;
  if (!ok) {
    return (<main className="container py-10"><div className="card p-6"><h1 className="text-xl font-semibold mb-2">CRM Access</h1><p className="text-neutral-400 text-sm mb-4">/crm?key=YOUR_KEY</p><p className="text-neutral-500 text-xs mt-3">ENV: <b>CRM_PUBLIC_KEY</b></p><Link href="/" className="btn btn-primary mt-6 inline-block">Back</Link></div></main>);
  }
  return (<main className="container py-10"><div className="card p-6"><h1 className="text-xl font-semibold mb-3">Leads — Google Sheets</h1><LeadsTable /></div></main>);
}
