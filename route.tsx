import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "NEXORA — AR Showroom";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export async function GET() {
  return new ImageResponse((<div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",background:"#0b0b0b",color:"white",padding:48,backgroundImage:"radial-gradient(800px 400px at 80% -10%, rgba(176,141,87,0.18), transparent 60%)"}}><div style={{display:"flex",alignItems:"center",gap:16}}><div style={{width:16,height:16,borderRadius:4,border:"2px solid #B08D57"}}/><div style={{letterSpacing:6,color:"#B08D57"}}>NEXORALUXE</div></div><div style={{fontSize:64,fontWeight:700,marginTop:12}}>AR Showroom</div><div style={{fontSize:24,color:"#c9c9c9",marginTop:8}}>Graphite micro-cement • Brass wash • Zebra/Dual/Motorized</div></div>), { ...size });
}
