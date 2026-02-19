import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket,
  ArrowRight, 
  Layout, 
  Database, 
  BarChart3, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Menu,
  X,
  Code2,
  Cpu,
  Globe,
  Terminal,
  TrendingUp,
  Minimize2,
  Maximize2,
  Minus,
  Briefcase,
  GraduationCap,
  Award,
  Coffee,
  Gamepad2,
  Music,
  BookOpen,
  User,
  Sparkles
} from 'lucide-react';

// --- Global Constants ---

// Tokyo Night Palette - Refined for Web
const colors = {
  bg: 'bg-[#1a1b26]',
  bgAlt: 'bg-[#16161e]',
  card: 'bg-[#24283b]',
  primary: 'text-[#7aa2f7]', // Blue
  accent: 'text-[#bb9af7]', // Purple
  success: 'text-[#9ece6a]', // Green
  text: 'text-[#a9b1d6]',
  heading: 'text-[#c0caf5]',
  border: 'border-[#414868]'
};

// Particle class defined outside component to avoid re-declaration and initialization errors
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = Math.random() > 0.5 ? '#7aa2f7' : '#bb9af7';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvasWidth) this.x = 0;
    else if (this.x < 0) this.x = this.canvasWidth;
    if (this.y > this.canvasHeight) this.y = 0;
    else if (this.y < 0) this.y = this.canvasHeight;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- Background & Utility Components ---

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const init = () => {
      particles = [];
      if (canvas.width === 0 || canvas.height === 0) return;
      // Fewer particles on mobile for performance
      const numberOfParticles = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        // Draw connections between particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = 0.1 * (1 - distance / 120);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to Mouse
        if (mouse.x != null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.globalAlpha = 0.2 * (1 - distance / 150);
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Navigation Components ---

const NavLink = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-base font-medium text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors tracking-wide relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7aa2f7] transition-all group-hover:w-full"></span>
  </a>
);

const Navbar = ({ scrolled, onToggleMenu, isMenuOpen }) => (
  <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#1a1b26]/90 backdrop-blur-lg border-b border-[#414868]' : 'bg-transparent py-6'}`}>
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 flex justify-between items-center h-16">
      <span className="text-2xl font-bold text-white tracking-tighter cursor-pointer" onClick={() => window.scrollTo(0,0)}>
        KC<span className="text-[#7aa2f7]">.</span>
      </span>
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="#about">About</NavLink>
        <NavLink href="#work">Work</NavLink>
        <NavLink href="#profiles">Profiles</NavLink>
        <NavLink href="#journey">Journey</NavLink>
        <NavLink href="#terminal">Terminal</NavLink>
        <a href="#contact" className="px-5 py-2 bg-[#7aa2f7] text-[#1a1b26] font-bold rounded-lg hover:bg-[#bb9af7] transition-colors text-sm shadow-lg shadow-blue-500/20">
          Let's Talk
        </a>
      </div>
      <button className="md:hidden text-[#a9b1d6]" onClick={onToggleMenu}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  </nav>
);

const MobileMenu = ({ onLinkClick }) => (
  <div className="fixed inset-0 z-40 bg-[#1a1b26]/95 backdrop-blur-xl pt-24 px-6 md:hidden">
    <div className="flex flex-col gap-6 text-xl">
      <NavLink href="#about" onClick={onLinkClick}>About</NavLink>
      <NavLink href="#work" onClick={onLinkClick}>Work</NavLink>
      <NavLink href="#profiles" onClick={onLinkClick}>Profiles</NavLink>
      <NavLink href="#journey" onClick={onLinkClick}>Journey</NavLink>
      <NavLink href="#terminal" onClick={onLinkClick}>Terminal</NavLink>
      <NavLink href="#contact" onClick={onLinkClick}>Contact</NavLink>
    </div>
  </div>
);

// --- Page Section Components ---

const Hero = () => (
  <header className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 lg:px-8 overflow-hidden z-10">
    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#7aa2f7]/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#bb9af7]/10 rounded-full blur-3xl -z-10"></div>
    <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <RevealOnScroll delay={100}>
        <div className="inline-block px-3 py-1 mb-6 border border-[#7aa2f7]/30 rounded-full bg-[#7aa2f7]/10 backdrop-blur-sm">
          <span className="text-[#7aa2f7] text-sm font-medium tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7aa2f7] animate-pulse"></span>
            Available for new projects
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Digital Experiences <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] animate-gradient">
            Engineered to Perform.
          </span>
        </h1>
        <p className="text-lg text-[#a9b1d6] mb-8 max-w-lg leading-relaxed">
          I am Kashish Chaudhary. A Full Stack Developer bridging the gap between complex data analytics and intuitive user interfaces.
        </p>
        <div className="flex gap-4">
          <a href="#work" className="px-8 py-4 bg-[#7aa2f7] text-[#1a1b26] font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/25">
            View My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" className="px-8 py-4 border border-[#414868] text-white font-medium rounded-lg hover:border-[#7aa2f7] hover:text-[#7aa2f7] transition-all flex items-center gap-2 backdrop-blur-sm">
            <Github size={20} />
            GitHub
          </a>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={300}>
        <div className="relative hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] blur-2xl opacity-20 rounded-full"></div>
           <div className="relative bg-[#16161e]/90 backdrop-blur-xl border border-[#414868] rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-105 cursor-default">
              <div className="flex items-center gap-2 mb-4 border-b border-[#414868] pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
                </div>
                <span className="text-xs text-[#565f89] font-mono ml-2">developer.tsx</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex"><span className="text-[#7aa2f7] w-8">1</span><span className="text-[#bb9af7]">const</span> <span className="text-[#e0af68]">developer</span> = <span className="text-[#7dcfff]">{`{`}</span></div>
                <div className="flex"><span className="text-[#7aa2f7] w-8">2</span><span className="text-[#7aa2f7] ml-4">name:</span> <span className="text-[#9ece6a]">'Kashish'</span>,</div>
                <div className="flex"><span className="text-[#7aa2f7] w-8">3</span><span className="text-[#7aa2f7] ml-4">skills:</span> <span className="text-[#bb9af7]">[</span><span className="text-[#9ece6a]">'React'</span>, <span className="text-[#9ece6a]">'Node'</span>, <span className="text-[#9ece6a]">'AI'</span><span className="text-[#bb9af7]">]</span>,</div>
                <div className="flex"><span className="text-[#7aa2f7] w-8">4</span><span className="text-[#7aa2f7] ml-4">status:</span> <span className="text-[#9ece6a]">'Building Cool Stuff'</span></div>
                <div className="flex"><span className="text-[#7aa2f7] w-8">5</span><span className="text-[#7dcfff]">{`}`}</span>;</div>
              </div>
           </div>
        </div>
      </RevealOnScroll>
    </div>
  </header>
);

const About = () => (
  <section id="about" className="py-24 px-6 lg:px-8 relative z-10 bg-[#16161e]/50">
    <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <RevealOnScroll>
         <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#1a1b26] border border-[#414868] p-8 rounded-2xl overflow-hidden hover:border-[#7aa2f7] transition-colors">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#7aa2f7]/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
               
               {/* Updated Photo Section */}
               <div className="flex flex-col items-center mb-6 relative z-10">
                  <div className="w-32 h-32 rounded-full border-4 border-[#7aa2f7]/20 overflow-hidden mb-4 shadow-lg shadow-[#7aa2f7]/20 group-hover:scale-105 transition-transform duration-500 bg-[#24283b]">
                    {}
                    <img 
                      src="./assets/profileP.jpeg" 
                      alt="Kashish Chaudhary" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Behind the Code</h3>
               </div>

               <p className="text-[#a9b1d6] mb-6 leading-relaxed">
                 I'm Kashish, a Full Stack Developer based in India. My journey began with a simple curiosity about how websites work, which quickly evolved into a passion for building robust applications that live on the internet.
               </p>
               <p className="text-[#a9b1d6] leading-relaxed">
                 I specialize in the <span className="text-[#7aa2f7] font-medium">MERN stack</span> and <span className="text-[#bb9af7] font-medium">Data Analytics</span>. When I'm not coding, you can find me solving algorithmic challenges or exploring the latest in AI technology. I believe in writing clean, maintainable code that solves real-world problems.
               </p>
            </div>
         </div>
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <div className="space-y-8">
           <div>
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
               Driven by <span className="text-[#7aa2f7]">Curiosity</span>,<br />
               Powered by <span className="text-[#bb9af7]">Logic</span>.
             </h2>
             <p className="text-[#a9b1d6] text-lg">
               I thrive in environments where technology meets creativity. Here's what defines my approach:
             </p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 group">
                 <div className="w-12 h-12 bg-[#24283b] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#414868] group-hover:border-[#7aa2f7] transition-colors">
                    <Code2 className="text-[#7aa2f7]" size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-bold mb-1">Clean Code</h4>
                    <p className="text-[#565f89] text-sm">Writing scalable, readable, and efficient solutions.</p>
                 </div>
              </div>
              <div className="flex gap-4 group">
                 <div className="w-12 h-12 bg-[#24283b] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#414868] group-hover:border-[#bb9af7] transition-colors">
                    <Sparkles className="text-[#bb9af7]" size={24} />
                 </div>
                 <div>
                    <h4 className="text-white font-bold mb-1">Problem Solving</h4>
                    <p className="text-[#565f89] text-sm">Tackling complex DSA problems daily.</p>
                 </div>
              </div>
           </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const ServiceCard = ({ icon: Icon, title, description, tech }) => (
  <div className={`group p-8 rounded-2xl ${colors.card} border border-[#414868]/50 hover:border-[#7aa2f7] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden hover:shadow-2xl hover:shadow-[#7aa2f7]/10`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7aa2f7]/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
    <div className="w-12 h-12 bg-[#1a1b26] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#7aa2f7]/20 transition-colors">
      <Icon className="text-[#7aa2f7]" size={24} />
    </div>
    <h3 className={`text-xl font-bold ${colors.heading} mb-3`}>{title}</h3>
    <p className={`${colors.text} mb-6 leading-relaxed`}>{description}</p>
    <div className="flex flex-wrap gap-2">
      {tech.map((item, i) => (
        <span key={i} className="text-xs font-medium text-[#7aa2f7] bg-[#7aa2f7]/10 px-2 py-1 rounded">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Expertise = () => (
  <section id="expertise" className={`py-24 ${colors.bgAlt} relative z-10`}>
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
      <RevealOnScroll>
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Expertise</h2>
          <div className="w-20 h-1 bg-[#7aa2f7] rounded-full"></div>
        </div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-8">
        <RevealOnScroll delay={100}>
          <ServiceCard 
            icon={Layout}
            title="Frontend Architecture"
            description="Building responsive, pixel-perfect web applications with a focus on performance and accessibility."
            tech={['React', 'Tailwind', 'JavaScript', 'Figma']}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <ServiceCard 
            icon={Database}
            title="Backend Engineering"
            description="Designing robust APIs and database schemas that scale securely and efficiently."
            tech={['Node.js', 'MongoDB', 'Express', 'REST APIs']}
          />
        </RevealOnScroll>
        <RevealOnScroll delay={300}>
          <ServiceCard 
            icon={BarChart3}
            title="Data Analytics & AI"
            description="Transforming raw data into actionable insights and integrating AI solutions into web flows."
            tech={['Python', 'Pandas', 'PowerBI', 'Scikit-Learn']}
          />
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const ProjectShowcase = ({ title, category, description, tags, color }) => (
  <div className="group relative rounded-2xl overflow-hidden bg-[#16161e] border border-[#414868] hover:border-[#bb9af7] transition-all duration-500 hover:shadow-2xl hover:shadow-[#bb9af7]/10">
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-[#1a1b26]/80 to-transparent z-10"></div>
    <div className={`h-64 w-full bg-gradient-to-br from-[#24283b] to-[#1a1b26] group-hover:scale-105 transition-transform duration-700 flex items-center justify-center relative`}>
      <div className={`absolute inset-0 bg-${color}/5 mix-blend-overlay`}></div>
      <Code2 className="text-[#414868] opacity-20" size={64} />
    </div>
    <div className="relative z-20 p-8 -mt-20">
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-[#bb9af7] text-xs font-bold tracking-wider uppercase mb-2 block">{category}</span>
          <h3 className="text-2xl font-bold text-white group-hover:text-[#7aa2f7] transition-colors">{title}</h3>
        </div>
        <a href="#" className="p-2 bg-[#7aa2f7] text-[#1a1b26] rounded-full hover:bg-white transition-colors transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
          <ExternalLink size={20} />
        </a>
      </div>
      <p className="text-[#a9b1d6] mb-6 line-clamp-2">{description}</p>
      <div className="flex gap-3 text-sm text-[#565f89]">
        {tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7aa2f7]"></div>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const FeaturedWork = () => (
  <section id="work" className="py-24 px-6 lg:px-8 relative z-10">
    <div className="max-w-screen-2xl mx-auto">
      <RevealOnScroll>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Work</h2>
            <p className="text-[#a9b1d6] max-w-xl">A collection of projects where design meets functionality.</p>
          </div>
          <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-[#7aa2f7] hover:text-white transition-colors font-medium">
            View Github <ArrowRight size={18} />
          </a>
        </div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "AyurWell", category: "HealthTech", description: "A holistic wellness platform combining Ayurveda with modern technology using React and Node.js.", tags: ['Full Stack', 'Healthcare'], color: "green-500" },
          { title: "ResoNote", category: "Web App", description: "A unique digital space blending daily journaling with mood-based music recommendations via Spotify API.", tags: ['React', 'Spotify API', 'Node'], color: "pink-500" },
          // { title: "EchoCart", category: "E-Commerce", description: "High-performance shopping solution with real-time analytics, inventory management, and Stripe integration.", tags: ['MERN', 'FinTech'], color: "blue-500" },
          // { title: "UrbanPulse", category: "Data Analytics", description: "Traffic pattern visualization and predictive modeling for smart city infrastructure using historical sensor data.", tags: ['Python', 'Pandas', 'Tableau'], color: "orange-500" },
          // { title: "MarketMinds", category: "Data Science", description: "Customer segmentation and sales forecasting dashboard utilizing machine learning algorithms for retail growth.", tags: ['Python', 'Scikit-Learn', 'NLP'], color: "indigo-500" }
        ].map((project, index) => (
          <RevealOnScroll key={index} delay={index * 100}>
            <ProjectShowcase {...project} />
          </RevealOnScroll>
        ))}
      </div>
      <div className="mt-12 text-center md:hidden">
         <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#7aa2f7] font-medium">
           View all on Github <ArrowRight size={18} />
         </a>
      </div>
    </div>
  </section>
);

const ProfileCard = ({ platform, handle, stats, icon: Icon, url, brandColor }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className={`group relative p-6 rounded-xl bg-[#24283b]/50 backdrop-blur-lg border border-[#414868]/50 hover:border-[var(--brand-color)] transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    style={{ '--brand-color': brandColor }}
  >
    {/* Brand color top border */}
    <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: brandColor }}></div>

    <div className="relative z-10 pt-4">
      <div className="flex justify-between items-start mb-6">
        {/* Icon */}
        <Icon size={28} style={{ color: brandColor }} />
        <ExternalLink size={18} className="text-[#565f89] group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{platform}</h3>
      <p className="text-[#565f89] text-sm mb-6">@{handle}</p>
      <div className="grid grid-cols-2 gap-4 border-t border-[#414868]/50 pt-4">
        {stats.map((stat, i) => (
          <div key={i}>
            <p className="text-[10px] uppercase tracking-wider text-[#565f89] mb-1">{stat.label}</p>
            <p className="text-[#a9b1d6] font-mono font-bold group-hover:text-white transition-colors">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  </a>
);

const CodingProfiles = () => (
  <section id="profiles" className={`py-24 px-6 lg:px-8 ${colors.bgAlt} relative z-10`}>
    <div className="max-w-screen-2xl mx-auto">
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Coding DNA & Connect</h2>
            <p className="text-[#a9b1d6] max-w-xl">Tracking my problem-solving journey and digital footprint across platforms.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1a1b26] border border-[#414868] flex items-center gap-4 shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#7aa2f7] border-2 border-[#1a1b26]"></div>
              <div className="w-8 h-8 rounded-full bg-[#bb9af7] border-2 border-[#1a1b26]"></div>
              <div className="w-8 h-8 rounded-full bg-[#9ece6a] border-2 border-[#1a1b26]"></div>
            </div>
            <div className="text-sm">
              <p className="text-white font-bold">500+ Problems</p>
              <p className="text-[#565f89]">Solved across platforms</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <RevealOnScroll delay={100}>
          <ProfileCard platform="LeetCode" handle="kashish_ch1" url="https://leetcode.com/u/kashish_ch1/" icon={Code2} brandColor="#e0af68" stats={[{ label: "Problems Solved", value: "500+" }, { label: "Global Rank", value: "Top 25%" }]} />
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <ProfileCard platform="GeeksForGeeks" handle="kashishchauq2zq" url="https://auth.geeksforgeeks.org/user/kkashishchauq2zq/" icon={Terminal} brandColor="#9ece6a" stats={[{ label: "Coding Score", value: "1200+" }, { label: "Institute Rank", value: "#12" }]} />
        </RevealOnScroll>
        <RevealOnScroll delay={300}>
          <ProfileCard platform="GitHub" handle="kashishch28" url="https://github.com/kashishch28" icon={Github} brandColor="#bb9af7" stats={[{ label: "Repositories", value: "25+" }, { label: "Contributions", value: "300+" }]} />
        </RevealOnScroll>
        <RevealOnScroll delay={400}>
          <ProfileCard platform="LinkedIn" handle="Kashish Chaudhary" url="https://linkedin.com/in/kashish-chaudhary-286aa1290/" icon={Linkedin} brandColor="#0077b5" stats={[{ label: "Connections", value: "400+" }, { label: "Followers", value: "550+" }]} />
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', content: 'Welcome to KC-OS [Version 1.0.0]' },
    { type: 'system', content: '(c) 2025 Kashish Chaudhary. All rights reserved.' },
    { type: 'info', content: 'Type "help" to see available commands.' }
  ]);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Auto-focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const newOutput = [...output, { type: 'command', content: `visitor@portfolio:~$ ${input}` }];
    let response = { type: 'response', content: '' };
    switch(cmd) {
      case 'help':
        response.content = 'Available commands: about, skills, projects, journey, contact, clear, whoami';
        break;
      case 'about':
        response.content = 'Full Stack Developer & Data Analyst passionate about building scalable web apps and solving complex algorithmic problems.';
        break;
      case 'skills':
        response.content = 'Frontend: React, Tailwind | Backend: Node, Express, MongoDB | Data: Python, Pandas, NumPy';
        break;
      case 'projects':
        response.content = 'Check out the "Work" section above to see AyurWell, EchoCart, and GreenMirror.';
        break;
      case 'journey':
        response.content = '2026: Career Growth | 2025: Full Stack & AI | 2024: DSA (500+ Problems) | 2023: Started Coding';
        break;
      case 'contact':
        response.content = 'Email: kashishchaudhary586@gmail.com | LinkedIn: /in/kashish-chaudhary';
        break;
      case 'whoami':
        response.content = 'Kashish Chaudhary | Full Stack Developer | India';
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      case 'sudo':
        response.content = 'Permission denied: you are not in the sudoers file. This incident will be reported.';
        break;
      default:
        response.content = `Command not found: ${cmd}. Type "help" for list of commands.`;
    }
    setOutput([...newOutput, response]);
    setInput('');
  };

  return (
    <section id="terminal" className="py-24 px-6 lg:px-8 relative overflow-hidden z-10">
      <div className="max-w-5xl mx-auto">
         <RevealOnScroll>
           <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">System Access</h2>
              <p className="text-[#a9b1d6]">A touch of nostalgia. Interact with the portfolio via command line.</p>
           </div>
           <div className="rounded-xl overflow-hidden bg-[#0f0f14]/90 backdrop-blur border border-[#414868] shadow-2xl font-mono text-sm md:text-base relative z-10">
              <div className="bg-[#1a1b26] px-4 py-2 flex items-center justify-between border-b border-[#414868]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
                </div>
                <div className="text-[#565f89] text-xs flex items-center gap-1"><Terminal size={12} /> visitor@kashish-portfolio:~</div>
                <div className="flex gap-2 text-[#565f89]"><Minus size={14} /><Maximize2 size={14} /><X size={14} /></div>
              </div>
              <div className="p-6 h-96 overflow-y-auto space-y-2 custom-scrollbar" onClick={() => inputRef.current?.focus()}>
                 {output.map((line, index) => (
                   <div key={index} className={`${line.type === 'command' ? 'text-[#c0caf5] mt-4' : line.type === 'system' ? 'text-[#565f89]' : 'text-[#9ece6a]'}`}>
                     {line.content}
                   </div>
                 ))}
                 <div className="flex items-center gap-2 text-[#c0caf5] mt-2">
                    <span className="text-[#7aa2f7]">visitor@portfolio:~$</span>
                    <form onSubmit={handleCommand} className="flex-1">
                      <input 
                        id="terminal-input"
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-[#c0caf5] w-full"
                        autoComplete="off"
                      />
                    </form>
                 </div>
                 <div ref={terminalEndRef} />
              </div>
           </div>
         </RevealOnScroll>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#7aa2f7]/10 blur-[100px] -z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

const TimelineItem = ({ year, title, description, icon: Icon, isLast }) => (
  <div className="relative pl-8 md:pl-0">
    {/* Desktop Center Line Layout */}
    <div className="hidden md:flex items-center justify-between mb-8 w-full group">
      <div className="w-5/12 text-right pr-8">
        <h4 className="text-xl font-bold text-white group-hover:text-[#7aa2f7] transition-colors">{title}</h4>
        <p className="text-[#a9b1d6] mt-2 text-base">{description}</p>
      </div>
      <div className="w-2/12 flex justify-center relative">
        <div className="w-12 h-12 rounded-full bg-[#1a1b26] border-2 border-[#414868] group-hover:border-[#7aa2f7] group-hover:shadow-[0_0_15px_rgba(122,162,247,0.5)] transition-all flex items-center justify-center z-10">
          <Icon size={20} className="text-[#7aa2f7]" />
        </div>
        {!isLast && <div className="absolute top-12 bottom-[-4rem] w-0.5 bg-[#414868] group-hover:bg-[#7aa2f7]/50 transition-colors"></div>}
      </div>
      <div className="w-5/12 pl-8">
         <span className="text-3xl font-bold text-[#24283b] group-hover:text-[#414868] transition-colors select-none">{year}</span>
      </div>
    </div>
    {/* Mobile Layout */}
    <div className="md:hidden mb-12 relative">
      <div className="absolute left-[-2rem] top-1 w-8 h-8 rounded-full bg-[#1a1b26] border-2 border-[#414868] flex items-center justify-center z-10">
        <Icon size={14} className="text-[#7aa2f7]" />
      </div>
      {!isLast && <div className="absolute left-[-1.1rem] top-9 bottom-[-3rem] w-0.5 bg-[#414868]"></div>}
      <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-[#7aa2f7]/10 text-[#7aa2f7] mb-2">{year}</span>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-[#a9b1d6] text-base">{description}</p>
    </div>
  </div>
);

const JourneyTimeline = () => (
  <section id="journey" className={`py-24 px-6 lg:px-8 ${colors.bgAlt} relative z-10`}>
    <div className="max-w-5xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Journey So Far</h2>
          <p className="text-[#a9b1d6]">From first line of code to deploying scalable applications.</p>
        </div>
      </RevealOnScroll>
      <div className="relative">
         <RevealOnScroll delay={100}><TimelineItem year="2026" title="Career Growth & Advanced Projects" description="Working on industry-level projects, improving system design knowledge, and preparing for software development roles." icon={Rocket} /></RevealOnScroll>
         <RevealOnScroll delay={200}><TimelineItem year="2025" title="Full Stack Development & AI Exploration" description="Building full-stack web applications, learning Design and Analysis of Algorithms (DAA), and exploring Machine Learning fundamentals to enhance project intelligence." icon={Cpu} /></RevealOnScroll>
         <RevealOnScroll delay={300}><TimelineItem year="2025" title="DSA & Problem Solving Journey" description="Solved 500+ problems on LeetCode & GFG. Deep dive into Data Structures, Algorithms, and System Design patterns." icon={Award} /></RevealOnScroll>
         <RevealOnScroll delay={400}><TimelineItem year="2024" title="Programming Foundations" description="Started programming with Java and Python. Built small projects and gained a strong understanding of programming fundamentals." icon={Briefcase} /></RevealOnScroll>
         <RevealOnScroll delay={500}><TimelineItem year="2023" title="Hello World" description="Started the programming journey with Java and Python. Built foundational projects and discovered a passion for problem solving." icon={GraduationCap} isLast={true} /></RevealOnScroll>
      </div>
    </div>
  </section>
);

const StatBar = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-[#a9b1d6] font-medium">{label}</span>
      <span className="text-white font-bold">{value}%</span>
    </div>
    <div className="h-2 bg-[#16161e] rounded-full overflow-hidden border border-[#414868]">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const CharacterStats = () => (
  <section className="py-24 px-6 lg:px-8 relative z-10">
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <RevealOnScroll>
          <div>
             <h2 className="text-3xl font-bold text-white mb-8">Character Stats</h2>
             <div className="space-y-6 bg-[#1a1b26]/80 backdrop-blur p-8 rounded-2xl border border-[#414868] shadow-xl">
                <StatBar label="Frontend Magic" value={90} color="bg-[#7aa2f7]" />
                <StatBar label="Backend Logic" value={85} color="bg-[#bb9af7]" />
                <StatBar label="Data Analytics" value={80} color="bg-[#9ece6a]" />
                <StatBar label="Coffee Consumption" value={100} color="bg-[#f7768e]" />
             </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div>
             <h2 className="text-3xl font-bold text-white mb-8">AFK Activities</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-[#24283b] rounded-xl border border-[#414868] hover:border-[#7aa2f7] transition-colors group hover:-translate-y-1 duration-300">
                   <Gamepad2 className="text-[#7aa2f7] mb-4 group-hover:scale-110 transition-transform" size={32} />
                   <h3 className="text-white font-bold mb-1">Gaming</h3>
                   <p className="text-sm text-[#565f89]">FPS & Strategy</p>
                </div>
                <div className="p-6 bg-[#24283b] rounded-xl border border-[#414868] hover:border-[#bb9af7] transition-colors group hover:-translate-y-1 duration-300">
                   <BookOpen className="text-[#bb9af7] mb-4 group-hover:scale-110 transition-transform" size={32} />
                   <h3 className="text-white font-bold mb-1">Reading</h3>
                   <p className="text-sm text-[#565f89]">Sci-Fi & Tech</p>
                </div>
                <div className="p-6 bg-[#24283b] rounded-xl border border-[#414868] hover:border-[#9ece6a] transition-colors group hover:-translate-y-1 duration-300">
                   <Music className="text-[#9ece6a] mb-4 group-hover:scale-110 transition-transform" size={32} />
                   <h3 className="text-white font-bold mb-1">Music</h3>
                   <p className="text-sm text-[#565f89]">Lo-Fi Coding</p>
                </div>
                <div className="p-6 bg-[#24283b] rounded-xl border border-[#414868] hover:border-[#e0af68] transition-colors group hover:-translate-y-1 duration-300">
                   <Coffee className="text-[#e0af68] mb-4 group-hover:scale-110 transition-transform" size={32} />
                   <h3 className="text-white font-bold mb-1">Coffee</h3>
                   <p className="text-sm text-[#565f89]">Fuel for Code</p>
                </div>
             </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const ContactCTA = () => (
  <section id="contact" className="py-24 px-6 lg:px-8 bg-[#16161e] border-t border-[#414868] relative z-10">
    <div className="max-w-5xl mx-auto text-center">
      <RevealOnScroll>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to start a project?</h2>
        <p className="text-xl text-[#a9b1d6] mb-12 max-w-2xl mx-auto">
          I'm currently available for freelance work and full-time positions. 
          Let's build something amazing together.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="mailto:kashishchaudhary586@gmail.com" className="px-8 py-4 bg-[#7aa2f7] text-[#1a1b26] font-bold rounded-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-3 w-full md:w-auto justify-center shadow-lg shadow-blue-500/30">
            <Mail size={20} />
            kashishchaudhary586@gmail.com
          </a>
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/kashish-chaudhary-286aa1290/" target="_blank" rel="noreferrer" className="p-4 border border-[#414868] rounded-lg text-[#a9b1d6] hover:text-[#7aa2f7] hover:border-[#7aa2f7] transition-colors bg-[#1a1b26]">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/kashishch28" target="_blank" rel="noreferrer" className="p-4 border border-[#414868] rounded-lg text-[#a9b1d6] hover:text-white hover:border-white transition-colors bg-[#1a1b26]">
              <Github size={24} />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center text-[#565f89] text-sm relative z-10">
    <p>© {new Date().getFullYear()} Kashish Chaudhary. All rights reserved.</p>
  </footer>
);


// --- Main Portfolio Component ---

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${colors.bg} min-h-screen font-sans selection:bg-[#7aa2f7] selection:text-[#1a1b26] relative`}>
      <ParticleBackground />

      <Navbar 
        scrolled={scrolled}
        isMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen(prev => !prev)} 
      />

      {mobileMenuOpen && <MobileMenu onLinkClick={() => setMobileMenuOpen(false)} />}

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
  );
};

export default Portfolio;
