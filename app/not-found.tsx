import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal Lost | ANTARES FTC",
  description: "This ANTARES route could not be resolved. Return to the team mission index.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main style={{minHeight:"100svh",background:"#050505",color:"#f5efe8",padding:"28px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <header style={{display:"flex",justifyContent:"space-between",fontSize:11,letterSpacing:".14em"}}>
        <Link href="/">✦ ANTARES</Link><span>404 / SIGNAL LOST</span>
      </header>
      <section style={{maxWidth:1100}}>
        <p style={{fontSize:10,letterSpacing:".16em",color:"#ff4a21"}}>UNRESOLVED COORDINATE</p>
        <h1 style={{fontSize:"clamp(70px,15vw,220px)",lineHeight:.75,letterSpacing:"-.08em",margin:"24px 0"}}>NO<br/>SIGNAL.</h1>
        <p style={{maxWidth:520,color:"#9e978f",lineHeight:1.55}}>The route disappeared. The mission did not. Return to the ANTARES index and continue from verified ground.</p>
        <Link href="/" style={{display:"inline-block",marginTop:24,borderBottom:"1px solid #ff4a21",paddingBottom:6,fontSize:11,letterSpacing:".13em"}}>RETURN TO MISSION ↗</Link>
      </section>
      <footer style={{borderTop:"1px solid rgba(255,255,255,.15)",paddingTop:16,display:"flex",justifyContent:"space-between",fontSize:9,letterSpacing:".14em",color:"#89827a"}}><span>ALMATY / KAZAKHSTAN</span><span>ANTARES FTC</span></footer>
    </main>
  );
}
