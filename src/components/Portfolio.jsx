import { useState, useEffect, useRef, useCallback } from "react";
import profilePhoto from "../assets/profile.png";
import {
  Github, Linkedin, Mail, ExternalLink, Menu, X, Code2, Database,
  BarChart3, Terminal, Rocket, Award, Briefcase, GraduationCap,
  Gamepad2, Music, BookOpen, Coffee, Sparkles, Layout, ArrowRight,
  Globe, Cpu
} from "lucide-react";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap');

    :root {
      --bg:        #040508;
      --bg-alt:    #07090f;
      --surface:   #0c0f1a;
      --surface2:  #111527;
      --border:    rgba(255,255,255,0.06);
      --border-hi: rgba(122,162,247,0.4);
      --blue:      #7aa2f7;
      --purple:    #bb9af7;
      --green:     #9ece6a;
      --red:       #f7768e;
      --amber:     #e0af68;
      --cyan:      #7dcfff;
      --text:      #8892b0;
      --text-hi:   #cdd6f4;
      --white:     #ffffff;
      --grad:      linear-gradient(135deg, #7aa2f7 0%, #bb9af7 100%);
      --font-display: 'Bebas Neue', sans-serif;
      --font-mono:    'Space Mono', monospace;
      --font-body:    'Manrope', sans-serif;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      font-family: var(--font-body);
      color: var(--text);
      overflow-x: hidden;
    }

    ::selection { background: var(--blue); color: var(--bg); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 2px; }

    /* Noise overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 1000;
      opacity: 0.35;
    }

    /* Reveal animation */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* Animated gradient text */
    .grad-text {
      background: var(--grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Glitch effect on hover */
    @keyframes glitch1 {
      0%,100%{clip-path:inset(0 0 96% 0)} 20%{clip-path:inset(20% 0 60% 0)} 40%{clip-path:inset(50% 0 30% 0)} 60%{clip-path:inset(70% 0 10% 0)} 80%{clip-path:inset(10% 0 80% 0)}
    }
    @keyframes glitch2 {
      0%,100%{clip-path:inset(80% 0 5% 0)} 20%{clip-path:inset(10% 0 85% 0)} 40%{clip-path:inset(40% 0 45% 0)} 60%{clip-path:inset(60% 0 20% 0)} 80%{clip-path:inset(5% 0 90% 0)}
    }
    .glitch-wrap { position: relative; display: inline-block; }
    .glitch-wrap::before, .glitch-wrap::after {
      content: attr(data-text);
      position: absolute;
      inset: 0;
      font: inherit;
      background: inherit;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .glitch-wrap:hover::before { animation: glitch1 0.4s steps(1) infinite; transform: translateX(-2px); filter: hue-rotate(90deg); }
    .glitch-wrap:hover::after  { animation: glitch2 0.4s steps(1) infinite; transform: translateX(2px);  filter: hue-rotate(-90deg); }

    /* Scanning line */
    @keyframes scan {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }

    /* Pulse ring */
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    /* Blink cursor */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { display: inline-block; width: 2px; height: 1em; background: var(--blue); animation: blink 1s infinite; vertical-align: text-bottom; margin-left: 2px; }

    /* Float */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

    /* Orbit */
    @keyframes orbit { from{transform:rotate(0deg) translateX(120px) rotate(0deg)} to{transform:rotate(360deg) translateX(120px) rotate(-360deg)} }

    /* Card hover glow */
    .card-glow { transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.3s cubic-bezier(.16,1,.3,1); }
    .card-glow:hover { box-shadow: 0 0 40px rgba(122,162,247,0.12), 0 20px 60px rgba(0,0,0,0.5); transform: translateY(-4px); border-color: var(--border-hi) !important; }

    /* Section label */
    .section-label {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--blue);
      margin-bottom: 16px;
    }

    /* Horizontal rule */
    .hr { height: 1px; background: var(--border); }

    /* Tag chip */
    .chip { font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 4px; background: rgba(122,162,247,0.08); border: 1px solid rgba(122,162,247,0.15); color: var(--blue); }

    /* Stat bar fill animation */
    @keyframes fillBar { from{width:0} to{width:var(--target)} }
    .bar-fill { animation: fillBar 1.2s cubic-bezier(.16,1,.3,1) forwards; }

    /* Grid lines background */
    .grid-bg {
      background-image:
        linear-gradient(rgba(122,162,247,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(122,162,247,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Terminal blinking */
    @keyframes termBlink { 0%,100%{opacity:1} 50%{opacity:0} }

    /* Magnetic button */
    .mag-btn { transition: transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease; }
    .mag-btn:hover { transform: scale(1.05); box-shadow: 0 8px 30px rgba(122,162,247,0.3); }

    /* Preserve 3D for cube */
    * { transform-style: flat; }
    .cube-preserve { transform-style: preserve-3d !important; }

    /* Stat strip responsive */
    @media(max-width: 600px) { .stat-strip { grid-template-columns: repeat(2,1fr) !important; } }

    /* Loading shimmer */
    @keyframes shimmer { from{background-position:-200% 0} to{background-position:200% 0} }
  `}</style>
);

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
};

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
const ParticleCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, mouse = { x: -999, y: -999 }, particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spawn();
    };

    const spawn = () => {
      particles = Array.from({ length: window.innerWidth < 768 ? 35 : 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.4,
        c: Math.random() > 0.5 ? "122,162,247" : "187,154,247",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = 0.55;
        ctx.fillStyle = `rgb(${p.c})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.globalAlpha = 0.06 * (1 - d / 100);
            ctx.strokeStyle = `rgb(${p.c})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }

        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 140) {
          ctx.globalAlpha = 0.18 * (1 - md / 140);
          ctx.strokeStyle = `rgb(${p.c})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });
      raf = requestAnimationFrame(draw);
    };

    const mm = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const ml = () => { mouse.x = -999; mouse.y = -999; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseleave", ml);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseleave", ml); };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const links = ["About", "Work", "Profiles", "Journey", "Terminal", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(4,5,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <span
            onClick={() => window.scrollTo(0, 0)}
            style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--white)", cursor: "pointer", letterSpacing: 2 }}
          >
            K<span style={{ color: "var(--blue)" }}>C</span>
          </span>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="desktop-nav">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "var(--text)", textDecoration: "none",
                transition: "color 0.2s", padding: "4px 0", position: "relative",
              }}
                onMouseEnter={e => e.target.style.color = "var(--white)"}
                onMouseLeave={e => e.target.style.color = "var(--text)"}
              >{l}</a>
            ))}
            <a href="#contact" className="mag-btn" style={{
              padding: "10px 22px", background: "var(--blue)", color: "var(--bg)", fontFamily: "var(--font-mono)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none",
              borderRadius: 4, textTransform: "uppercase",
            }}>Hire Me</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", display: "none" }} className="mobile-menu-btn">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: "rgba(4,5,8,0.97)",
          backdropFilter: "blur(20px)", display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", gap: 40,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{
              fontFamily: "var(--font-display)", fontSize: 48, color: "var(--white)",
              textDecoration: "none", letterSpacing: 4,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "var(--blue)"}
              onMouseLeave={e => e.target.style.color = "var(--white)"}
            >{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const TypeWriter = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const timeout = del
      ? char === 0 ? setTimeout(() => { setDel(false); setIdx(i => (i + 1) % words.length); }, 400) : setTimeout(() => setChar(c => c - 1), 60)
      : char === word.length ? setTimeout(() => setDel(true), 2000) : setTimeout(() => setChar(c => c + 1), 90);
    return () => clearTimeout(timeout);
  }, [char, del, idx, words]);

  return (
    <span style={{ color: "var(--blue)", fontFamily: "var(--font-mono)" }}>
      {words[idx].slice(0, char)}<span className="cursor" />
    </span>
  );
};

const Hero = () => (
  <header style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", zIndex: 10, overflow: "hidden" }} className="grid-bg">
    {/* Scan line */}
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: "linear-gradient(90deg, transparent, var(--blue), transparent)",
      animation: "scan 4s linear infinite", opacity: 0.3, zIndex: 2, pointerEvents: "none",
    }} />

    {/* Ambient orbs */}
    <div style={{ position: "absolute", top: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(122,162,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(187,154,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
      {/* Left */}
      <div className="reveal" style={{ transitionDelay: "0.1s" }}>
        {/* Availability badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32,
          padding: "8px 16px", border: "1px solid rgba(122,162,247,0.2)",
          borderRadius: 100, background: "rgba(122,162,247,0.06)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", flexShrink: 0, animation: "pulse-ring 1.5s infinite" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--green)" }}>Available for opportunities</span>
        </div>

        {/* Name */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(60px, 8vw, 110px)", lineHeight: 0.9, marginBottom: 16, letterSpacing: 2 }}>
          <div className="glitch-wrap" data-text="KASHISH" style={{ display: "block", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KASHISH</div>
          <div style={{ color: "var(--white)" }}>CHAUDHARY</div>
        </div>

        {/* Role */}
        <div style={{ marginBottom: 24, fontSize: 18 }}>
          <TypeWriter words={["Frontend Engineer", "Full Stack Developer", "DSA Enthusiast", "UI Craftsman"]} />
        </div>

        {/* Bio */}
        <p style={{ color: "var(--text)", lineHeight: 1.8, marginBottom: 40, maxWidth: 480, fontSize: 15 }}>
          Bridging the gap between complex systems and intuitive interfaces.
          MERN stack specialist building products that{" "}
          <span style={{ color: "var(--text-hi)" }}>perform</span> and{" "}
          <span style={{ color: "var(--text-hi)" }}>delight</span>.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#work" className="mag-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 32px", background: "var(--blue)", color: "var(--bg)",
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
            textDecoration: "none", borderRadius: 4, textTransform: "uppercase",
          }}>
            View Work <ArrowRight size={16} />
          </a>
          <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 32px", border: "1px solid var(--border)",
            color: "var(--text-hi)", fontFamily: "var(--font-mono)", fontSize: 12,
            fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 4,
            textTransform: "uppercase", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hi)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <Github size={16} /> GitHub
          </a>
        </div>

        {/* Stats row */}
        <div style={{ marginTop: 56, display: "flex", gap: 40 }}>
          {[["500+", "Problems Solved"], ["25+", "Repositories"], ["3+", "Years Coding"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--white)", letterSpacing: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right – Code card */}
      <div className="reveal" style={{ transitionDelay: "0.3s", position: "relative" }}>
        {/* Orbit dots */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          {[["var(--blue)", 0], ["var(--purple)", 1.5], ["var(--green)", 3]].map(([c, d], i) => (
            <div key={i} style={{
              position: "absolute", width: 8, height: 8, borderRadius: "50%", background: c,
              boxShadow: `0 0 10px ${c}`,
              animation: `orbit ${4 + i * 1.5}s linear infinite`,
              animationDelay: `${d}s`,
            }} />
          ))}
        </div>

        {/* Editor window */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 12, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          animation: "float 6s ease-in-out infinite",
        }}>
          {/* Title bar */}
          <div style={{ background: "var(--bg-alt)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["var(--red)", "var(--amber)", "var(--green)"].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>developer.tsx</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green)" }}>● live</span>
          </div>

          {/* Code */}
          <div style={{ padding: 24, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.9 }}>
            {[
              [<><span style={{ color: "var(--purple)" }}>const</span> <span style={{ color: "var(--cyan)" }}>Kashish</span> <span style={{ color: "var(--white)" }}>= {"{"}</span></>],
              [<><span style={{ marginLeft: 20 }} /><span style={{ color: "var(--blue)" }}>role</span><span style={{ color: "var(--white)" }}>:</span> <span style={{ color: "var(--green)" }}>'Frontend Engineer'</span><span style={{ color: "var(--white)" }}>,</span></>],
              [<><span style={{ marginLeft: 20 }} /><span style={{ color: "var(--blue)" }}>stack</span><span style={{ color: "var(--white)" }}>:</span> <span style={{ color: "var(--purple)" }}>[</span><span style={{ color: "var(--green)" }}>'React'</span><span style={{ color: "var(--white)" }}>, </span><span style={{ color: "var(--green)" }}>'Node'</span><span style={{ color: "var(--white)" }}>, </span><span style={{ color: "var(--green)" }}>'AI'</span><span style={{ color: "var(--purple)" }}>]</span><span style={{ color: "var(--white)" }}>,</span></>],
              [<><span style={{ marginLeft: 20 }} /><span style={{ color: "var(--blue)" }}>passion</span><span style={{ color: "var(--white)" }}>:</span> <span style={{ color: "var(--green)" }}>'Clean, Performant UIs'</span><span style={{ color: "var(--white)" }}>,</span></>],
              [<><span style={{ marginLeft: 20 }} /><span style={{ color: "var(--blue)" }}>dsa</span><span style={{ color: "var(--white)" }}>:</span> <span style={{ color: "var(--amber)" }}>500</span> <span style={{ color: "var(--purple)" }}>+</span> <span style={{ color: "var(--green)" }}>' problems'</span><span style={{ color: "var(--white)" }}>,</span></>],
              [<><span style={{ marginLeft: 20 }} /><span style={{ color: "var(--blue)" }}>status</span><span style={{ color: "var(--white)" }}>:</span> <span style={{ color: "var(--green)" }}>'Open to Work 🚀'</span></>],
              [<><span style={{ color: "var(--white)" }}>{"}"}</span>;</>],
            ].map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <span style={{ color: "rgba(122,162,247,0.25)", minWidth: 20, textAlign: "right", userSelect: "none" }}>{i + 1}</span>
                <span>{line[0]}</span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div style={{ background: "var(--blue)", padding: "6px 16px", display: "flex", gap: 16, alignItems: "center" }}>
            {[["TypeScript", "tsx"], ["React 18", "jsx"], ["Tailwind", "css"]].map(([label, ext]) => (
              <span key={label} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--bg)", letterSpacing: "0.1em" }}>{label} · .{ext}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <style>{`@media(max-width:768px){header>div{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
  </header>
);

/* ─────────────────────────────────────────────
   CLEAN PHOTO FRAME
───────────────────────────────────────────── */
const HoloPhotoFrame = () => (
  <div style={{ position: "relative", width: 300, height: 340, margin: "0 auto" }}>

    {/* Soft ambient glow */}
    <div style={{
      position: "absolute", inset: -32, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(122,162,247,0.10) 0%, rgba(187,154,247,0.05) 50%, transparent 70%)",
      pointerEvents: "none",
    }} />

    {/* Outer frame — sharp, asymmetric offset border */}
    <div style={{
      position: "absolute",
      top: 10, left: -10,
      width: "100%", height: "100%",
      border: "1px solid rgba(122,162,247,0.25)",
      borderRadius: 14,
      pointerEvents: "none",
    }} />

    {/* Main photo container */}
    <div style={{
      position: "relative", zIndex: 1,
      width: "100%", height: "100%",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
    }}>
      <img
        src={profilePhoto}
        alt="Kashish Chaudhary"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center top",
          display: "block",
          filter: "contrast(1.05) brightness(0.97)",
        }}
      />
      {/* Subtle inner vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 60%, rgba(4,5,8,0.5) 100%)",
        pointerEvents: "none",
      }} />
    </div>

    {/* Status chip — top right */}
    <div style={{
      position: "absolute", top: 16, right: -14, zIndex: 3,
      background: "rgba(4,5,8,0.88)", border: "1px solid rgba(158,206,106,0.35)",
      borderRadius: 5, padding: "5px 12px", backdropFilter: "blur(12px)",
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--green)", whiteSpace: "nowrap",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      <span style={{ marginRight: 5 }}>●</span>OPEN TO WORK
    </div>

    {/* Role chip — bottom left */}
    <div style={{
      position: "absolute", bottom: 24, left: -14, zIndex: 3,
      background: "rgba(4,5,8,0.88)", border: "1px solid rgba(187,154,247,0.3)",
      borderRadius: 5, padding: "5px 12px", backdropFilter: "blur(12px)",
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
      color: "var(--purple)", whiteSpace: "nowrap",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      MERN · REACT · DSA
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
const About = () => (
  <section id="about" style={{ padding: "120px 32px", position: "relative", zIndex: 10, background: "var(--bg-alt)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>

      {/* Section header */}
      <div className="reveal" style={{ marginBottom: 80 }}>
        <p className="section-label">01 / About</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--white)", letterSpacing: 2, lineHeight: 1 }}>
          DRIVEN BY <span className="grad-text">CURIOSITY</span>
        </h2>
      </div>

      {/* Three-column layout: photo | bio | tech stack */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 64, alignItems: "center" }}
        className="about-grid">

        {/* ── Col 1: Holographic photo ── */}
        <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
          <HoloPhotoFrame />
        </div>

        {/* ── Col 2: Bio + traits ── */}
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          {/* Name badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 100,
            border: "1px solid rgba(122,162,247,0.2)",
            background: "rgba(122,162,247,0.06)", marginBottom: 24,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue)", letterSpacing: "0.1em" }}>
              // kashish chaudhary
            </span>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.9, marginBottom: 18, color: "var(--text)" }}>
            A <span style={{ color: "var(--text-hi)", fontWeight: 700 }}>Full Stack Developer</span> based
            in India with a deep passion for building things that live on the internet.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, marginBottom: 32, color: "var(--text)" }}>
            I specialize in the{" "}
            <span style={{ color: "var(--blue)", fontWeight: 600 }}>MERN stack</span> and{" "}
            <span style={{ color: "var(--purple)", fontWeight: 600 }}>Data Analytics</span>.
            Clean, maintainable code is my north star — whether it's a UI pixel or a database schema.
          </p>

          {/* Trait cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: Code2,    label: "Clean Code",     sub: "Scalable & readable",   c: "var(--blue)"   },
              { icon: Sparkles, label: "Problem Solver",  sub: "500+ DSA challenges",   c: "var(--purple)" },
              { icon: Globe,    label: "Full Stack",      sub: "End-to-end builder",    c: "var(--green)"  },
              { icon: Cpu,      label: "AI Explorer",     sub: "ML integration",        c: "var(--amber)"  },
            ].map(({ icon: Icon, label, sub, c }) => (
              <div key={label} className="card-glow" style={{
                padding: 16, background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 8, display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} style={{ color: c }} />
                </div>
                <div>
                  <div style={{ color: "var(--text-hi)", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "var(--text)" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Col 3: Tech arsenal ── */}
        <div className="reveal" style={{ transitionDelay: "0.3s" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: 28, opacity: 0.6 }}>
            // Tech Arsenal
          </div>
          {[
            { cat: "Frontend", items: ["React", "Tailwind", "JavaScript", "Figma"], c: "var(--blue)"   },
            { cat: "Backend",  items: ["Node.js", "Express", "MongoDB", "JWT"],     c: "var(--purple)" },
            { cat: "Data & AI",items: ["Python", "Pandas", "Scikit-Learn", "PowerBI"], c: "var(--green)"  },
            { cat: "Tools",    items: ["Git", "VS Code", "Linux", "Postman"],        c: "var(--amber)"  },
          ].map(({ cat, items, c }, gi) => (
            <div key={cat} style={{ marginBottom: 20 }}>
              {/* Category label with glowing dot */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}`, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: c, fontWeight: 700, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>{cat}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map((item, ii) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
                    padding: "5px 10px", borderRadius: 4,
                    border: `1px solid ${c}20`, background: `${c}08`, color: c,
                    animation: "fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1) both",
                    animationDelay: `${gi * 0.1 + ii * 0.05}s`,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`
      @media(max-width: 1024px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }
      @media(max-width: 768px)  { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
    `}</style>
  </section>
);

/* ─────────────────────────────────────────────
   HOLOGRAPHIC SKILL CUBE — EXPERTISE
───────────────────────────────────────────── */

/* Six cube faces: each maps to a skill category */
const CUBE_FACES = [
  {
    id: "frontend",
    label: "FRONTEND",
    color: "#7aa2f7",
    shadow: "rgba(122,162,247,0.6)",
    icon: "⬡",
    skills: ["React", "JavaScript", "Tailwind CSS", "Figma", "HTML5", "CSS3"],
    desc: "Building responsive, pixel-perfect UIs with a focus on performance and accessibility.",
    transform: "translateZ(110px)",
  },
  {
    id: "backend",
    label: "BACKEND",
    color: "#bb9af7",
    shadow: "rgba(187,154,247,0.6)",
    icon: "◈",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT", "Socket.io"],
    desc: "Designing robust server-side logic and database schemas that scale securely.",
    transform: "rotateY(180deg) translateZ(110px)",
  },
  {
    id: "data",
    label: "DATA & AI",
    color: "#9ece6a",
    shadow: "rgba(158,206,106,0.6)",
    icon: "◎",
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "PowerBI", "SQL"],
    desc: "Transforming raw data into actionable insights and integrating ML into web flows.",
    transform: "rotateY(90deg) translateZ(110px)",
  },
  {
    id: "tools",
    label: "TOOLS",
    color: "#e0af68",
    shadow: "rgba(224,175,104,0.6)",
    icon: "⬙",
    skills: ["Git", "VS Code", "Postman", "Linux", "Webpack", "Vite"],
    desc: "The developer toolkit that keeps code clean, fast, and ready for production.",
    transform: "rotateY(-90deg) translateZ(110px)",
  },
  {
    id: "dsa",
    label: "DSA",
    color: "#f7768e",
    shadow: "rgba(247,118,142,0.6)",
    icon: "◇",
    skills: ["Arrays", "Trees", "Graphs", "DP", "Sorting", "System Design"],
    desc: "500+ problems solved on LeetCode & GFG. Strong grasp of algorithms and complexity.",
    transform: "rotateX(90deg) translateZ(110px)",
  },
  {
    id: "soft",
    label: "SOFT SKILLS",
    color: "#7dcfff",
    shadow: "rgba(125,207,255,0.6)",
    icon: "○",
    skills: ["Problem Solving", "Team Player", "Communication", "Agile", "Research", "Fast Learner"],
    desc: "The human side of engineering — collaboration, curiosity, and shipping with care.",
    transform: "rotateX(-90deg) translateZ(110px)",
  },
];

const HoloCube = () => {
  const [rotX, setRotX] = useState(-18);
  const [rotY, setRotY] = useState(25);
  const [activeFace, setActiveFace] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const autoRef = useRef(null);
  const velX = useRef(0);
  const velY = useRef(0.3);

  /* Auto-rotation */
  useEffect(() => {
    if (isPaused) return;
    autoRef.current = setInterval(() => {
      setRotY(r => r + 0.3);
      setRotX(r => r + 0.05);
    }, 16);
    return () => clearInterval(autoRef.current);
  }, [isPaused]);

  /* Which face is most "front-facing" based on current rotation */
  useEffect(() => {
    const normY = ((rotY % 360) + 360) % 360;
    const normX = ((rotX % 360) + 360) % 360;
    if (normX > 45 && normX < 135) { setActiveFace(4); return; }
    if (normX > 225 && normX < 315) { setActiveFace(5); return; }
    if (normY >= 315 || normY < 45) { setActiveFace(0); return; }
    if (normY >= 45 && normY < 135) { setActiveFace(2); return; }
    if (normY >= 135 && normY < 225) { setActiveFace(1); return; }
    setActiveFace(3);
  }, [rotX, rotY]);

  const handleMouseDown = e => {
    setIsPaused(true);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, rotX, rotY });
  };

  const handleMouseMove = e => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotY(dragStart.rotY + dx * 0.5);
    setRotX(dragStart.rotX - dy * 0.5);
  };

  const handleMouseUp = () => setIsDragging(false);

  /* Snap to face */
  const snapToFace = (idx) => {
    clearInterval(autoRef.current);
    setIsPaused(true);
    const targets = [
      { x: -18, y: 0 },
      { x: -18, y: 180 },
      { x: -18, y: -90 },
      { x: -18, y: 90 },
      { x: -90, y: 0 },
      { x: 90,  y: 0 },
    ];
    setRotX(targets[idx].x);
    setRotY(targets[idx].y);
    setActiveFace(idx);
  };

  const face = CUBE_FACES[activeFace];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="cube-layout">

      {/* Left: cube stage */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>

        {/* Stage */}
        <div
          style={{ width: 280, height: 280, perspective: 700, cursor: isDragging ? "grabbing" : "grab", userSelect: "none", position: "relative" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={e => handleMouseDown(e.touches[0])}
          onTouchMove={e => { e.preventDefault(); handleMouseMove(e.touches[0]); }}
          onTouchEnd={handleMouseUp}
        >
          {/* Ambient glow behind cube */}
          <div style={{
            position: "absolute", inset: "20%",
            background: `radial-gradient(circle, ${face.shadow}22 0%, transparent 70%)`,
            filter: "blur(30px)", pointerEvents: "none", transition: "background 0.6s ease",
          }} />

          {/* Cube */}
          <div style={{
            width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: isDragging ? "none" : "transform 0.05s linear",
            position: "relative",
          }}>
            {CUBE_FACES.map((f, i) => (
              <div
                key={f.id}
                onClick={() => snapToFace(i)}
                style={{
                  position: "absolute",
                  width: 220, height: 220,
                  top: 30, left: 30,
                  transform: f.transform,
                  background: `linear-gradient(135deg, rgba(12,15,26,0.95) 0%, rgba(17,21,39,0.98) 100%)`,
                  border: `1px solid ${f.color}30`,
                  borderRadius: 12,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  backfaceVisibility: "hidden",
                  boxShadow: `inset 0 0 40px ${f.color}08, 0 0 0 1px ${f.color}15`,
                  transition: "border-color 0.3s",
                }}
              >
                {/* Holographic scan line effect */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    position: "absolute", left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`,
                    animation: `holoScan 3s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }} />
                </div>

                {/* Corner accents */}
                {[
                  { top: 8, left: 8, borderTop: `1px solid ${f.color}60`, borderLeft: `1px solid ${f.color}60` },
                  { top: 8, right: 8, borderTop: `1px solid ${f.color}60`, borderRight: `1px solid ${f.color}60` },
                  { bottom: 8, left: 8, borderBottom: `1px solid ${f.color}60`, borderLeft: `1px solid ${f.color}60` },
                  { bottom: 8, right: 8, borderBottom: `1px solid ${f.color}60`, borderRight: `1px solid ${f.color}60` },
                ].map((s, ci) => (
                  <div key={ci} style={{ position: "absolute", width: 14, height: 14, ...s }} />
                ))}

                {/* Face content */}
                <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.7, color: f.color }}>{f.icon}</div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: 3,
                  color: f.color, textShadow: `0 0 20px ${f.color}80`,
                }}>{f.label}</div>
                <div style={{
                  width: 40, height: 1,
                  background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                  margin: "10px 0",
                }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: `${f.color}80`, letterSpacing: "0.15em" }}>
                  {f.skills.length} SKILLS
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drag hint + play/pause */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text)", letterSpacing: "0.15em", opacity: 0.6 }}>
            {isDragging ? "ROTATING..." : "DRAG TO SPIN"}
          </span>
          <button
            onClick={() => setIsPaused(p => !p)}
            style={{
              background: "none", border: `1px solid ${face.color}40`, color: face.color,
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
              padding: "5px 14px", borderRadius: 4, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
          </button>
        </div>

        {/* Face selector dots */}
        <div style={{ display: "flex", gap: 10 }}>
          {CUBE_FACES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => snapToFace(i)}
              title={f.label}
              style={{
                width: activeFace === i ? 24 : 8,
                height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                background: activeFace === i ? f.color : "rgba(255,255,255,0.1)",
                boxShadow: activeFace === i ? `0 0 8px ${f.color}` : "none",
                transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: active face info panel */}
      <div key={activeFace} style={{ animation: "fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1)" }}>
        {/* Category badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
          padding: "6px 14px", borderRadius: 100,
          border: `1px solid ${face.color}30`,
          background: `${face.color}0a`,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: face.color }}>
            {face.icon} {face.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)",
          letterSpacing: 2, lineHeight: 1, marginBottom: 20,
          color: "var(--white)",
        }}>
          {face.label === "FRONTEND" && "CRAFT THE\nINTERFACE"}
          {face.label === "BACKEND" && "POWER THE\nSYSTEM"}
          {face.label === "DATA & AI" && "READ THE\nDATA"}
          {face.label === "TOOLS" && "WIELD THE\nARSENAL"}
          {face.label === "DSA" && "CRACK THE\nPROBLEM"}
          {face.label === "SOFT SKILLS" && "BUILD THE\nTEAM"}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", marginBottom: 28, maxWidth: 380 }}>
          {face.desc}
        </p>

        {/* Skill pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          {face.skills.map((s, i) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em",
                padding: "7px 14px", borderRadius: 6,
                border: `1px solid ${face.color}25`,
                background: `${face.color}0c`,
                color: face.color,
                animation: `fadeSlideIn 0.4s cubic-bezier(.16,1,.3,1)`,
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "both",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Face navigation arrows */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => snapToFace((activeFace + 5) % 6)}
            style={{
              padding: "10px 20px", background: "none",
              border: "1px solid var(--border)", borderRadius: 4,
              color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: 11,
              cursor: "pointer", letterSpacing: "0.1em",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = face.color; e.currentTarget.style.color = face.color; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            ← PREV
          </button>
          <button
            onClick={() => snapToFace((activeFace + 1) % 6)}
            style={{
              padding: "10px 20px",
              background: `${face.color}15`,
              border: `1px solid ${face.color}40`, borderRadius: 4,
              color: face.color, fontFamily: "var(--font-mono)", fontSize: 11,
              cursor: "pointer", letterSpacing: "0.1em",
              transition: "all 0.2s",
            }}
          >
            NEXT FACE →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes holoScan {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 222px; opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media(max-width: 768px) {
          .cube-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

const Expertise = () => (
  <section id="expertise" style={{ padding: "120px 32px", position: "relative", zIndex: 10, overflow: "hidden" }}>

    {/* Background grid accent */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: "linear-gradient(rgba(122,162,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(122,162,247,0.025) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />

    {/* Radial vignette so grid fades out */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "radial-gradient(ellipse at center, transparent 40%, var(--bg) 100%)",
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

      {/* Section header */}
      <div className="reveal" style={{ marginBottom: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p className="section-label">02 / Skills</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--white)", letterSpacing: 2, lineHeight: 1 }}>
            SKILL<br /><span className="grad-text">MATRIX</span>
          </h2>
        </div>
        <p style={{ maxWidth: 320, fontSize: 14, lineHeight: 1.8, color: "var(--text)" }}>
          Six faces. Six domains. Rotate the cube to explore every layer of the stack — from pixel to pipeline.
        </p>
      </div>

      {/* Holographic Cube */}
      <div className="reveal" style={{ transitionDelay: "0.15s" }}>
        <HoloCube />
      </div>

      {/* Bottom: quick-stat strip */}
      <div className="reveal" style={{
        marginTop: 80, paddingTop: 40,
        borderTop: "1px solid var(--border)",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
      }} className="stat-strip reveal">
        {[
          { num: "6", label: "Skill Domains", c: "var(--blue)" },
          { num: "30+", label: "Technologies", c: "var(--purple)" },
          { num: "500+", label: "DSA Problems", c: "var(--green)" },
          { num: "3+", label: "Years Building", c: "var(--amber)" },
        ].map(({ num, label, c }) => (
          <div key={label} style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, color: c, letterSpacing: 2, lineHeight: 1, textShadow: `0 0 30px ${c}40` }}>{num}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text)", marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FEATURED WORK
───────────────────────────────────────────── */
const projects = [
  {
    title: "AyurWell",
    cat: "HealthTech",
    desc: "A holistic wellness platform combining Ayurveda with modern technology. Built with React + Node.js, featuring personalized recommendations and health tracking.",
    tags: ["Full Stack", "Healthcare", "MERN"],
    url: "https://github.com/kashishch28",
    accent: "var(--green)",
    visual: "radial-gradient(ellipse at 30% 50%, rgba(158,206,106,0.15) 0%, transparent 60%)",
  },
  {
    title: "Syncora",
    cat: "Web App",
    desc: "Digital journaling meets music intelligence. Mood-based music recommendations via Spotify API, paired with reflective journaling and analytics.",
    tags: ["React", "Spotify API", "Node.js"],
    url: "https://github.com/kashishch28",
    accent: "var(--purple)",
    visual: "radial-gradient(ellipse at 70% 30%, rgba(187,154,247,0.15) 0%, transparent 60%)",
  },
  {
    title: "Mental Health Survey",
    cat: "Data Analytics",
    desc: "Analyzed tech workplace mental health trends using data visualization, cleaning, and predictive machine learning techniques.",
    tags: ["Data Vizualization", "Scikit-Learn","Python", "React"],
    url: "https://github.com/kashishch28/DA-Projects",
    accent: "var(--cyan)",
    visual: "radial-gradient(ellipse at 50% 70%, rgba(125,207,255,0.12) 0%, transparent 60%)",
  },
];

const FeaturedWork = () => (
  <section id="work" style={{ padding: "120px 32px", position: "relative", zIndex: 10, background: "var(--bg-alt)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
        <div>
          <p className="section-label">03 / Work</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--white)", letterSpacing: 2 }}>SELECTED WORK</h2>
        </div>
        <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)",
          fontSize: 11, color: "var(--blue)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>All Projects <ArrowRight size={14} /></a>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {projects.map((p, i) => (
          <div key={p.title} className="reveal card-glow" style={{ transitionDelay: `${i * 0.1}s`, padding: 40, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: p.visual, pointerEvents: "none" }} />

            {/* Left */}
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 120, color: `${p.accent}10`, lineHeight: 1, userSelect: "none", marginBottom: -20 }}>0{i + 1}</div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase", color: p.accent, marginBottom: 8 }}>{p.cat}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "var(--white)", letterSpacing: 2 }}>{p.title}</h3>
            </div>

            {/* Right */}
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
                border: `1px solid ${p.accent}40`, borderRadius: 4, color: p.accent,
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
                textDecoration: "none", textTransform: "uppercase",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${p.accent}12`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Github size={14} /> View Code <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`@media(max-width:768px){.reveal[style*="grid-template-columns: 1fr 2fr"]{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ─────────────────────────────────────────────
   CODING PROFILES
───────────────────────────────────────────── */
const profiles = [
  { platform: "LeetCode", handle: "kashish_ch1", url: "https://leetcode.com/u/kashish_ch1/", icon: Code2, c: "var(--amber)", stats: [["600+", "Solved"], ["Top 25%", "Global"]] },
  { platform: "GeeksForGeeks", handle: "kashishchauq2zq", url: "https://auth.geeksforgeeks.org/user/kkashishchauq2zq/", icon: Terminal, c: "var(--green)", stats: [["1200+", "Score"], ["#12", "Institute"]] },
  { platform: "GitHub", handle: "kashishch28", url: "https://github.com/kashishch28", icon: Github, c: "var(--purple)", stats: [["30+", "Repos"], ["900+", "Commits"]] },
  { platform: "LinkedIn", handle: "Kashish Chaudhary", url: "https://linkedin.com/in/kashish-chaudhary-286aa1290/", icon: Linkedin, c: "var(--blue)", stats: [["500+", "Network"], ["1000+", "Followers"]] },
];

const CodingProfiles = () => (
  <section id="profiles" style={{ padding: "120px 32px", position: "relative", zIndex: 10 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="reveal" style={{ marginBottom: 64 }}>
        <p className="section-label">04 / Profiles</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--white)", letterSpacing: 2 }}>CODING DNA</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="profiles-grid">
        {profiles.map(({ platform, handle, url, icon: Icon, c, stats }, i) => (
          <a key={platform} href={url} target="_blank" rel="noreferrer" className="reveal card-glow" style={{ transitionDelay: `${i * 0.1}s`, textDecoration: "none", padding: 28, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, position: "relative", overflow: "hidden", display: "block" }}>
            <div style={{ height: 3, background: c, position: "absolute", top: 0, left: 0, right: 0 }} />
            <div style={{ paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <Icon size={26} style={{ color: c }} />
                <ExternalLink size={14} style={{ color: "var(--text)" }} />
              </div>
              <div style={{ fontWeight: 700, color: "var(--text-hi)", fontSize: 15, marginBottom: 4 }}>{platform}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)", marginBottom: 20 }}>@{handle}</div>
              <div className="hr" style={{ marginBottom: 16 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {stats.map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--text-hi)", fontSize: 16 }}>{v}</div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text)", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
    <style>{`@media(max-width:900px){.profiles-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:500px){.profiles-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ─────────────────────────────────────────────
   TERMINAL
───────────────────────────────────────────── */
const commands = {
  help:    "Available: about · skills · projects · journey · contact · whoami · clear",
  about:   "Full Stack Developer & Data Analyst passionate about scalable web apps and algorithmic problem solving.",
  skills:  "Frontend: React, Tailwind, TS  |  Backend: Node, Express, MongoDB  |  Data: Python, Pandas, NumPy, PowerBI",
  projects:"→ AyurWell  → Syncora  → GreenMirror  (visit #work section for details)",
  journey: "2023: Hello World  →  2024: DSA Deep Dive  →  2025: Full Stack + AI  →  2026: Career Growth",
  contact: "Email: kashishchaudhary586@gmail.com  |  LinkedIn: /in/kashish-chaudhary",
  whoami:  "Kashish Chaudhary  |  Frontend Engineer  |  India 🇮🇳",
  sudo:    "Permission denied: incident reported. Just kidding 😄",
};

const InteractiveTerminal = () => {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    { t: "sys", c: "KC-OS [Version 2.0.0] — Interactive Portfolio Terminal" },
    { t: "sys", c: '(c) 2026 Kashish Chaudhary  |  Type "help" for commands.' },
  ]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines]);

  const run = e => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") { setLines([]); setInput(""); return; }
    const resp = commands[cmd] || `Command not found: "${cmd}"  —  try "help"`;
    setLines(l => [...l, { t: "cmd", c: `> ${input}` }, { t: "res", c: resp }]);
    setInput("");
  };

  return (
    <section id="terminal" style={{ padding: "120px 32px", position: "relative", zIndex: 10, background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 48, textAlign: "center" }}>
          <p className="section-label">05 / Terminal</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 60px)", color: "var(--white)", letterSpacing: 2 }}>SYSTEM ACCESS</h2>
          <p style={{ marginTop: 12, fontSize: 14 }}>Interact with the portfolio via command line.</p>
        </div>

        <div className="reveal" style={{
          background: "#050508", border: "1px solid var(--border)", borderRadius: 12,
          overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          fontFamily: "var(--font-mono)",
        }}>
          {/* Title bar */}
          <div style={{ background: "var(--surface)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["var(--red)", "var(--amber)", "var(--green)"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text)" }}>
              <Terminal size={11} /> visitor@kashish:~
            </div>
            <div style={{ fontSize: 11, color: "var(--green)" }}>● online</div>
          </div>

          {/* Body */}
          <div ref={bodyRef} style={{ padding: 28, height: 380, overflowY: "auto", cursor: "text" }} onClick={() => inputRef.current?.focus()}>
            {lines.map((l, i) => (
              <div key={i} style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.6, color: l.t === "sys" ? "rgba(255,255,255,0.3)" : l.t === "cmd" ? "var(--cyan)" : "var(--green)" }}>
                {l.c}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <span style={{ color: "var(--blue)", fontSize: 13 }}>visitor@portfolio:~$</span>
              <form onSubmit={run} style={{ flex: 1, display: "flex" }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={{ background: "none", border: "none", outline: "none", color: "var(--text-hi)", fontFamily: "var(--font-mono)", fontSize: 13, flex: 1 }}
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   JOURNEY TIMELINE
───────────────────────────────────────────── */
const timeline = [
  { year: "2026", title: "Career Growth & Industry Projects", desc: "Working on industry-level projects, improving system design knowledge, and preparing for software development roles.", icon: Rocket, c: "var(--blue)" },
  { year: "2025", title: "Full Stack + AI Exploration", desc: "Building full-stack web applications, learning DAA, and exploring Machine Learning to enhance project intelligence.", icon: Cpu, c: "var(--purple)" },
  { year: "2025", title: "DSA & Problem Solving", desc: "Solved 500+ problems on LeetCode & GFG. Deep dive into Data Structures, Algorithms, and System Design patterns.", icon: Award, c: "var(--green)" },
  { year: "2024", title: "Programming Foundations", desc: "Started with Java and Python. Built small projects and gained a strong understanding of programming fundamentals.", icon: Briefcase, c: "var(--amber)" },
  { year: "2023", title: "Hello, World", desc: "Wrote the first line of code. Discovered an obsession with how things work under the hood.", icon: GraduationCap, c: "var(--red)" },
];

const JourneyTimeline = () => (
  <section id="journey" style={{ padding: "120px 32px", position: "relative", zIndex: 10 }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="reveal" style={{ marginBottom: 64 }}>
        <p className="section-label">06 / Journey</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--white)", letterSpacing: 2 }}>THE TIMELINE</h2>
      </div>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, var(--blue), var(--purple), var(--green))", opacity: 0.3 }} />

        {timeline.map(({ year, title, desc, icon: Icon, c }, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, marginBottom: 48, position: "relative" }}>
            {/* Dot */}
            <div style={{
              position: "absolute", left: -32, top: 4, width: 18, height: 18, borderRadius: "50%",
              background: c, border: `3px solid var(--bg)`, boxShadow: `0 0 12px ${c}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            </div>

            <div style={{ padding: 28, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${c}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} style={{ color: c }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: c, letterSpacing: "0.15em" }}>{year}</span>
              </div>
              <h4 style={{ color: "var(--text-hi)", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.8 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CHARACTER STATS
───────────────────────────────────────────── */
const StatBar = ({ label, val, c }) => {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-hi)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: c, fontWeight: 700 }}>{val}%</span>
      </div>
      <div style={{ height: 4, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: go ? `${val}%` : "0%", background: c, borderRadius: 2, transition: "width 1.2s cubic-bezier(.16,1,.3,1)", boxShadow: `0 0 8px ${c}60` }} />
      </div>
    </div>
  );
};

const CharacterStats = () => (
  <section style={{ padding: "120px 32px", position: "relative", zIndex: 10, background: "var(--bg-alt)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="stats-grid">
      <div className="reveal">
        <p className="section-label">07 / Stats</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 60px)", color: "var(--white)", letterSpacing: 2, marginBottom: 40 }}>CHARACTER<br />STATS</h2>
        {[
          { label: "Frontend Magic", val: 90, c: "var(--blue)" },
          { label: "Backend Logic", val: 85, c: "var(--purple)" },
          { label: "Data Analytics", val: 80, c: "var(--green)" },
          { label: "Problem Solving (DSA)", val: 88, c: "var(--amber)" },
          { label: "Coffee Consumption", val: 100, c: "var(--red)" },
        ].map(s => <StatBar key={s.label} {...s} />)}
      </div>

      <div className="reveal" style={{ transitionDelay: "0.2s" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 60px)", color: "var(--white)", letterSpacing: 2, marginBottom: 40 }}>AFK<br />ACTIVITIES</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { icon: Gamepad2, label: "Gaming", sub: "FPS & Strategy", c: "var(--blue)" },
            { icon: BookOpen, label: "Reading", sub: "Sci-Fi & Tech", c: "var(--purple)" },
            { icon: Music, label: "Lo-Fi Music", sub: "Coding Fuel", c: "var(--green)" },
            { icon: Coffee, label: "Coffee", sub: "Essential Debug Tool", c: "var(--amber)" },
          ].map(({ icon: Icon, label, sub, c }) => (
            <div key={label} className="card-glow" style={{
              padding: 24, background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, cursor: "default",
            }}>
              <Icon size={28} style={{ color: c, marginBottom: 14 }} />
              <div style={{ fontWeight: 700, color: "var(--text-hi)", fontSize: 15 }}>{label}</div>
              <div style={{ fontSize: 12, color: "var(--text)", marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
const ContactCTA = () => (
  <section id="contact" style={{ padding: "120px 32px", position: "relative", zIndex: 10, overflow: "hidden" }}>
    {/* Background glow */}
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(122,162,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <div className="reveal">
        <p className="section-label" style={{ justifyContent: "center" }}>08 / Contact</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(50px, 8vw, 120px)", color: "var(--white)", letterSpacing: 4, lineHeight: 0.9, marginBottom: 32 }}>
          LET'S<br /><span className="grad-text">BUILD</span><br />TOGETHER
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.9, maxWidth: 520, margin: "0 auto 48px", color: "var(--text)" }}>
          Currently available for freelance work and full-time positions. If you have a project that needs clean code and a sharp mind, let's talk.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <a href="mailto:kashishchaudhary586@gmail.com" className="mag-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
            background: "var(--blue)", color: "var(--bg)", fontFamily: "var(--font-mono)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none",
            borderRadius: 4, textTransform: "uppercase",
          }}>
            <Mail size={16} /> Send Email
          </a>
          <a href="https://linkedin.com/in/kashish-chaudhary-286aa1290/" target="_blank" rel="noreferrer" className="mag-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
            border: "1px solid var(--border-hi)", color: "var(--blue)", fontFamily: "var(--font-mono)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none",
            borderRadius: 4, textTransform: "uppercase",
          }}>
            <Linkedin size={16} /> LinkedIn
          </a>
          
          <a href="/Kashish_Chaudhary_Resume.pdf" download className="mag-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
            border: "1px solid rgba(158,206,106,0.4)", color: "var(--green)",
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textDecoration: "none",
            borderRadius: 4, textTransform: "uppercase",
            }}
          >
          <Layout size={16} /> Download CV
          </a>
          <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" className="mag-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
            border: "1px solid var(--border)", color: "var(--text-hi)", fontFamily: "var(--font-mono)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none",
            borderRadius: 4, textTransform: "uppercase",
          }}>
            <Github size={16} /> GitHub
          </a>
        </div>

        {/* Email display */}
        <div className="hr" style={{ marginBottom: 32 }} />
        <a href="mailto:kashishchaudhary586@gmail.com" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text)", textDecoration: "none", letterSpacing: "0.05em" }}>
          kashishchaudhary586@gmail.com
        </a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ padding: "28px 32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10, flexWrap: "wrap", gap: 12 }}>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--text)" }}>
      © {new Date().getFullYear()} KASHISH CHAUDHARY
    </span>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--text)" }}>
      DESIGNED & BUILT WITH ♥
    </span>
  </footer>
);

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
const Portfolio = () => {
  useReveal();

  return (
    <>
      <FontLoader />
      <div style={{ background: "var(--bg)", minHeight: "100vh", position: "relative" }}>
        <ParticleCanvas />
        <Navbar />
        <Hero />
        <main>
          <About />
          <Expertise />
          <FeaturedWork />
          <CodingProfiles />
          <InteractiveTerminal />
          <JourneyTimeline />
          <CharacterStats />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
