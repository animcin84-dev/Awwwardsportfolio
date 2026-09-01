import { ImageResponse } from "next/og";

export const alt = "ANTARES — Engineering a Red Supergiant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width:"100%", height:"100%", display:"flex", position:"relative", overflow:"hidden", background:"#050505", color:"#f5efe8", padding:"48px", fontFamily:"sans-serif" }}>
      <div style={{position:"absolute",width:470,height:470,borderRadius:9999,right:40,top:80,background:"radial-gradient(circle at 35% 35%,#ffd0a0 0%,#ff7a26 13%,#ff3b19 40%,#8e180d 65%,#220704 76%)",boxShadow:"0 0 110px rgba(255,64,24,.5)"}} />
      <div style={{position:"absolute",width:570,height:260,borderRadius:"50%",right:-10,top:185,border:"1px solid rgba(255,122,38,.45)",transform:"rotate(-15deg)"}} />
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",zIndex:2,width:"100%"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:18,letterSpacing:4}}><span>ANTARES / FTC</span><span>ALMATY · KAZAKHSTAN</span></div>
        <div style={{display:"flex",flexDirection:"column"}}><span style={{fontSize:18,letterSpacing:5,color:"#ff5928",marginBottom:18}}>ENGINEERING A RED SUPERGIANT</span><strong style={{fontSize:144,lineHeight:.75,letterSpacing:-12}}>ANTARES</strong><span style={{fontSize:28,marginTop:28}}>ROBOTS BUILT UNDER PRESSURE.</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:16,letterSpacing:3,color:"#aaa39a"}}><span>FTC · EST. 2023</span><span>ENGINEERING / MISSIONS / RECORD</span></div>
      </div>
    </div>,
    size,
  );
}
