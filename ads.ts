export async function sendMetaLead({ ip, ua, event_id }: { ip?:string; ua?:string; event_id:string }) {
  const pixel = process.env.META_PIXEL_ID, token = process.env.META_ACCESS_TOKEN;
  if (!pixel || !token) return;
  const url = `https://graph.facebook.com/v17.0/${pixel}/events?access_token=${token}`;
  const body = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now()/1000),
      event_source_url: "https://nexoraluxe.ir/",
      action_source: "website",
      event_id,
      user_data: { client_ip_address: ip, client_user_agent: ua }
    }]
  };
  await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body) });
}

export async function sendGA4Lead({ event_id }: { event_id:string }) {
  const mid = process.env.GA4_MEASUREMENT_ID, secret = process.env.GA4_API_SECRET;
  if (!mid || !secret) return;
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${mid}&api_secret=${secret}`;
  const body = {
    client_id: `srv.${event_id}`,
    events: [{ name: "lead", params: { engagement_time_msec: 1, event_id } }]
  };
  await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body) });
}
