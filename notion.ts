import { Client } from "@notionhq/client";

const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const db = process.env.NOTION_DATABASE_ID || "";

export async function saveLeadToNotion(p: {
  name:string; phone:string; note?:string; ip?:string; ua?:string; path?:string; utm?:any;
}) {
  if (!notion || !db) return;
  await notion.pages.create({
    parent: { database_id: db },
    properties: {
      Name: { title: [{ text: { content: p.name } }] },
      Phone: { rich_text: [{ text: { content: p.phone } }] },
      Note: p.note ? { rich_text: [{ text: { content: p.note } }] } : undefined,
      Stage: { select: { name: "New" } },
      UTM: p.utm ? { rich_text: [{ text: { content: JSON.stringify(p.utm) } }] } : undefined,
      IP: p.ip ? { rich_text: [{ text: { content: p.ip } }] } : undefined,
      UA: p.ua ? { rich_text: [{ text: { content: p.ua } }] } : undefined,
      Path: p.path ? { rich_text: [{ text: { content: p.path } }] } : undefined,
      Timestamp: { date: { start: new Date().toISOString() } }
    }
  } as any);
}
