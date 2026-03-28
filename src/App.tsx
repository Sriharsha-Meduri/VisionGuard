import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, ArrowLeft, ArrowRight, ChevronsDown, 
  Camera, Box, ShieldAlert, Cpu, Activity, LayoutDashboard, 
  CheckSquare, Zap, Target, TrendingUp, Users, Server, 
  HardDrive, FileCheck, Anchor, ExternalLink
} from 'lucide-react';

// --- Neo-Brutalist Graphic Components ---

const CargoContainer = ({ color = '#E63946' }) => (
  <div className="relative w-28 h-12 border-[4px] border-black flex items-center shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ backgroundColor: color }}>
    <div className="flex-1 h-full border-r-[3px] border-black opacity-40"></div>
    <div className="flex-1 h-full border-r-[3px] border-black opacity-40"></div>
    <div className="flex-1 h-full border-r-[3px] border-black opacity-40"></div>
    <div className="flex-1"></div>
    <div className="absolute top-1 left-2 w-4 h-2 bg-black/20"></div>
  </div>
);

const SafeContainer = () => <CargoContainer color="#2A9D8F" />;
const WarningContainer = () => <CargoContainer color="#E9C46A" />;
const DangerContainer = () => <CargoContainer color="#E63946" />;

const AIChip = () => (
  <div className="w-16 h-16 bg-[#7209B7] border-[4px] border-black flex items-center justify-center relative shadow-[6px_6px_0_rgba(0,0,0,1)]">
    {[
      '-top-2 left-3', '-top-2 right-3', '-bottom-2 left-3', '-bottom-2 right-3',
      '-left-2 top-3', '-left-2 bottom-3', '-right-2 top-3', '-right-2 bottom-3'
    ].map((pos, i) => (
      <div key={i} className={`absolute ${pos} w-2 h-2 bg-black`}></div>
    ))}
    <div className="w-8 h-8 bg-[#4CC9F0] border-[4px] border-black flex items-center justify-center">
      <div className="w-2 h-2 bg-black rounded-full" />
    </div>
  </div>
);

const Cctv = () => (
  <div className="relative flex flex-col items-center">
    <div className="w-24 h-12 bg-[#F4A261] border-[4px] border-black rounded-l-lg rounded-r-3xl flex items-center justify-end px-2 shadow-[6px_6px_0_rgba(0,0,0,1)] z-10">
      <div className="w-6 h-6 bg-white border-[3px] border-black rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </div>
    <div className="w-6 h-6 bg-gray-400 border-l-[4px] border-r-[4px] border-black -mt-1 z-0"></div>
    <div className="w-16 h-4 bg-gray-500 border-[4px] border-black rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)]"></div>
  </div>
);

const WarningSign = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
    <polygon points="40,5 75,70 5,70" fill="#FFC700" stroke="black" strokeWidth="5" strokeLinejoin="round"/>
    <rect x="36" y="25" width="8" height="20" fill="black"/>
    <circle cx="40" cy="55" r="5" fill="black"/>
  </svg>
);

const Starburst = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={`relative flex items-center justify-center ${className || ''}`}>
    <svg className="absolute inset-0 w-full h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]" viewBox="0 0 200 200" preserveAspectRatio="none">
      <path 
        d="M100,5 L115,35 L155,20 L145,55 L185,65 L160,95 L195,125 L155,140 L165,180 L130,160 L105,195 L85,160 L45,185 L55,145 L15,150 L40,115 L5,90 L40,70 L20,35 L60,50 L80,10 Z" 
        fill="white" stroke="black" strokeWidth="6" strokeLinejoin="round"
      />
    </svg>
    <div className="relative z-10 text-center flex flex-col items-center justify-center pt-2">
      {children}
    </div>
  </div>
);

const Tray = ({ color, items }: { color: string; items: any[] }) => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96">
      <div 
        className="absolute inset-0 rounded-[40px] border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        style={{
          backgroundColor: color,
          transform: 'rotateX(60deg) rotateZ(-45deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {items.map((Item, idx) => (
          <div 
            key={idx} 
            className={`absolute ${Item.pos}`}
            style={{ 
              transform: 'rotateZ(45deg) rotateX(-60deg) translateY(-40px)',
              filter: 'drop-shadow(15px 25px 10px rgba(0,0,0,0.4))'
            }}
          >
            <Item.component />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Data ---
const slides = [
  {
    id: 1,
    bubbleTop: "VISGUARD",
    bubbleMain: "VISION\nGUARD",
    title: "AUTOMATED.\nACCURATE.\nREAL-TIME.",
    desc1: "Automates manual inspections using advanced computer vision.",
    desc2: "Detects damage, seal tampering, and unsafe stacking in seconds.",
    trayColor: "#4CC9F0",
    items: [
      { component: SafeContainer, pos: "top-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-10" },
      { component: AIChip, pos: "bottom-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-20" },
      { component: WarningSign, pos: "bottom-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-30" },
      { component: Cctv, pos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40" }
    ]
  },
  {
    id: 2,
    bubbleTop: "SMART PORT",
    bubbleMain: "YARD\nREADY",
    title: "FASTER\nTURNAROUND.\nLOWER COSTS.",
    desc1: "Minimizes human errors and speeds up handling times significantly.",
    desc2: "Lower operations costs and reduced carbon emissions.",
    trayColor: "#FFC700",
    items: [
      { component: DangerContainer, pos: "top-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-10" },
      { component: SafeContainer, pos: "top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20" },
      { component: WarningContainer, pos: "bottom-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-30" },
      { component: Cctv, pos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40" }
    ]
  },
  {
    id: 3,
    bubbleTop: "INTEGRATED",
    bubbleMain: "TOS\nSYNC",
    title: "QUALITY\nASSURED.\nNO DELAYS.",
    desc1: "Warehouse control without the manual bottlenecks.",
    desc2: "Seamless existing TOS integrations with CARGOES.",
    trayColor: "#2A9D8F",
    items: [
      { component: AIChip, pos: "top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10" },
      { component: SafeContainer, pos: "top-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-20" },
      { component: Cctv, pos: "bottom-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-30" },
      { component: WarningSign, pos: "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40" }
    ]
  }
];

// --- Sections ---

interface SectionProps {
  id?: string;
  title: string;
  bg: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ id, title, bg, color = 'black', className = '', children }: SectionProps) => (
  <section id={id} className={`w-full relative px-6 md:px-12 py-24 flex flex-col z-10 overflow-hidden ${className}`} style={{ backgroundColor: bg, color }}>
    <div className="absolute top-0 left-0 w-full border-t-[8px] border-black pointer-events-none"></div>
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <h2 className="font-display text-5xl md:text-7xl uppercase mb-16 tracking-tight drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-white" style={{ WebkitTextStroke: '2px black' }}>
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Card = ({ title, desc, icon: Icon, bg = 'white', color = 'black', badge }: any) => (
  <div className="p-8 border-[4px] border-black shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all flex flex-col gap-4 relative" style={{ backgroundColor: bg, color }}>
    {badge && <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 font-bold uppercase text-sm border-[3px] border-white z-10 rotate-12">{badge}</div>}
    {Icon && <Icon size={48} strokeWidth={2.5} className="mb-2" />}
    <h3 className="font-display text-3xl uppercase tracking-wide leading-tight">{title}</h3>
    <p className="font-bold text-lg leading-relaxed opacity-90">{desc}</p>
  </div>
);

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black font-sans overflow-x-hidden text-black">
      
      {/* 1. HERO SECTION */}
      <div className="min-h-screen w-full p-4 md:p-6 flex flex-col relative">
        <div className="flex-1 bg-[#E63946] rounded-[2.5rem] border-[8px] border-black flex flex-col relative shadow-[inset_0_0_0_8px_rgba(0,0,0,0.1)] overflow-hidden" style={{ backgroundColor: currentSlide.trayColor, transition: 'background-color 0.5s ease' }}>
          
          <nav className="flex items-center justify-between px-8 py-6 z-50 relative text-black">
            <div className="flex gap-8 font-bold text-sm tracking-widest uppercase hidden md:flex items-center">
              <a href="#problem" className="hover:opacity-70 transition-opacity">Problem</a>
              <a href="#solution" className="hover:opacity-70 transition-opacity">Solution</a>
              <a href="#prototype" className="hover:opacity-70 transition-opacity">Prototype</a>
              <a target="_blank" rel="noreferrer" href="https://drive.google.com/drive/folders/1vl2dqhAnZrEpiGAbXSDgtOpGtVbOC802?usp=sharing" className="bg-white px-3 py-1 border-[2px] border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-2">
                <ExternalLink size={16} /> Asset Drive
              </a>
            </div>
            
            <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-4">
              <h1 className="font-display text-4xl text-white text-stroke tracking-widest leading-none">VISION GUARD</h1>
              <span className="font-bold text-[10px] tracking-[0.3em] mt-1 uppercase">AI Automation</span>
            </div>

            <div className="flex gap-8 items-center font-bold text-sm tracking-widest uppercase">
              <a href="#contact" className="hover:opacity-70 transition-opacity hidden md:block">Team</a>
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <Volume2 size={24} strokeWidth={3} />
              </button>
            </div>
          </nav>

          <main className="flex-1 flex flex-col lg:flex-row items-center justify-center relative px-6 md:px-12 z-10 pb-16">
            <div className="flex-1 flex items-center justify-center relative h-[400px] lg:h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ x: -100, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 100, opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative mt-12 lg:mt-20"
                >
                  <Tray color={currentSlide.trayColor === "#FFC700" ? "#E63946" : "#FFC700"} items={currentSlide.items} />
                  
                  <Starburst className="absolute -top-12 -left-12 lg:-top-24 lg:-left-24 w-48 h-48 lg:w-64 lg:h-64 z-50 scale-75 lg:scale-100">
                    <span className="font-bold text-xs lg:text-sm text-black mb-1 tracking-wider uppercase">{currentSlide.bubbleTop}</span>
                    <span className="font-display text-3xl lg:text-4xl text-white leading-none whitespace-pre-line text-stroke-red pt-1 drop-shadow-md">
                      {currentSlide.bubbleMain}
                    </span>
                  </Starburst>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-1 flex flex-col justify-center lg:pl-12 h-full z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-xl text-center lg:text-left"
                >
                  <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight mb-8 whitespace-pre-line uppercase text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px black' }}>
                    {currentSlide.title}
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-12 items-center lg:items-start text-left">
                    <p className="font-bold text-lg md:text-xl w-full sm:max-w-[250px] whitespace-pre-line leading-tight bg-white/90 p-4 border-[3px] border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
                      {currentSlide.desc1}
                    </p>
                    <p className="font-bold text-lg md:text-xl w-full sm:max-w-[250px] whitespace-pre-line leading-tight bg-black text-white p-4 border-[3px] border-black shadow-[4px_4px_0_rgba(255,255,255,1)]">
                      {currentSlide.desc2}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center lg:justify-start gap-6">
                <button 
                  onClick={prevSlide}
                  className="w-16 h-16 bg-white border-[4px] border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-[6px] active:shadow-none transition-all"
                >
                  <ArrowLeft size={32} strokeWidth={4} />
                </button>
                
                <div className="flex gap-3 bg-white border-[4px] border-black p-3 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)]">
                  {slides.map((s, i) => (
                    <div 
                      key={s.id} 
                      className={`h-4 border-[3px] border-black rounded-full transition-all duration-300 ${i === currentIndex ? 'w-12 bg-[#E63946]' : 'w-4 bg-gray-200'}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide}
                  className="w-16 h-16 bg-white border-[4px] border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-[6px] active:shadow-none transition-all"
                >
                  <ArrowRight size={32} strokeWidth={4} />
                </button>
              </div>
            </div>
          </main>

          <a href="#problem" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white p-2 rounded-full border-[3px] border-black shadow-[4px_4px_0_rgba(0,0,0,1)] animate-bounce">
            <ChevronsDown size={32} strokeWidth={4} />
          </a>
        </div>
      </div>

      {/* 2. PROBLEM STATEMENT */}
      <Section id="problem" title="THE BOTTLENECKS" bg="#E63946">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            icon={ShieldAlert}
            title="Slow & Manual" 
            desc="Inspection takes minutes per container. Leads to vessel delays and high demurrage charges (₹3k - 8k/day)."
            bg="#FFF"
            badge="Costly"
          />
          <Card 
            icon={Activity}
            title="Human Error" 
            desc="Missed structural damage, broken seals, or unsafe stacking causes disputes & insurance claims."
            bg="#FFC700"
            badge="Risky"
          />
          <Card 
            icon={Zap}
            title="High Emissions" 
            desc="Idle cranes, trucks, and vessels waiting for manual clearances waste fuel and heavily increase CO₂."
            bg="#2A9D8F"
            color="#FFF"
            badge="Toxic"
          />
        </div>
      </Section>

      {/* 3. OUR SOLUTION & HOW IT WORKS */}
      <Section id="solution" title="SMART AI. INSTANT RESULTS." bg="#4CC9F0">
        <div className="bg-white border-[8px] border-black shadow-[16px_16px_0_rgba(0,0,0,1)] p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 opacity-10">
            <Cpu size={300} strokeWidth={1} />
          </div>
          <h3 className="font-display text-4xl mb-6 relative z-10">WHAT IS VISIONGUARD?</h3>
          <p className="text-2xl font-bold max-w-3xl leading-relaxed relative z-10 mb-8">
            An intelligent computer vision platform that automates real-time inspection of containers, seals, stacking conditions, and warehouse quality using <span className="bg-[#FFC700] px-2 py-1 border-[3px] border-black inline-block transform -rotate-1">existing CCTV</span>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black text-white p-6 border-[4px] border-white font-bold text-xl uppercase text-center">
            <div className="flex items-center gap-3"><Camera size={32} className="text-[#FFC700]" /> Camera Feed</div>
            <ArrowRight size={32} className="hidden md:block text-[#2A9D8F]" />
            <div className="flex items-center gap-3"><Cpu size={32} className="text-[#E63946]" /> AI Processing</div>
            <ArrowRight size={32} className="hidden md:block text-[#2A9D8F]" />
            <div className="flex items-center gap-3"><CheckSquare size={32} className="text-[#4CC9F0]" /> Dashboard & Alerts</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FFC700] border-[4px] border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)]">
            <div className="text-5xl font-display mb-4 opacity-50">01</div>
            <h4 className="font-display text-2xl mb-2">CAPTURE</h4>
            <p className="font-bold">Live HD feeds from fixed CCTV or mobile cameras on pallets and yards.</p>
          </div>
          <div className="bg-[#F4A261] border-[4px] border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] translate-y-0 lg:translate-y-4">
            <div className="text-5xl font-display mb-4 opacity-50">02</div>
            <h4 className="font-display text-2xl mb-2">DETECT</h4>
            <p className="font-bold">AI instantly identifies dents, rust, broken seals, leaks, and bad stacking.</p>
          </div>
          <div className="bg-[#E63946] border-[4px] border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] text-white translate-y-0 lg:translate-y-8">
            <div className="text-5xl font-display mb-4 opacity-50">03</div>
            <h4 className="font-display text-2xl mb-2">DECIDE</h4>
            <p className="font-bold">Auto-approves compliant containers. Flags anomalies for quick human review.</p>
          </div>
          <div className="bg-[#7209B7] border-[4px] border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] text-white translate-y-0 lg:translate-y-12">
            <div className="text-5xl font-display mb-4 opacity-50">04</div>
            <h4 className="font-display text-2xl mb-2">REPORT</h4>
            <p className="font-bold">Generates digital logs + bounding box images to existing TOS like CARGOES.</p>
          </div>
        </div>
      </Section>

      {/* 4. KEY FEATURES */}
      <Section title="KEY FEATURES" bg="#FFC700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card icon={Target} title="Real-Time Overlays" desc="Clear bounding box overlays on live feeds with confidence scores." bg="#FFF" />
          <Card icon={FileCheck} title="Automated Reports" desc="PDF & dashboard reports auto-generated with AI remarks & visual evidence." bg="#4CC9F0" />
          <Card icon={Server} title="TOS Integration" desc="Seamless plug-and-play with existing Terminal Operating Systems (CARGOES)." bg="#FFF" />
          <Card icon={HardDrive} title="Edge Ready" desc="Optimized models for NVIDIA Jetson for low-latency in remote yards." bg="#2A9D8F" color="#FFF" />
          <Card icon={LayoutDashboard} title="Multi-Purpose" desc="Container damage, seal checks, safe stacking & warehouse QC in one." bg="#E63946" color="#FFF" />
          <Card icon={TrendingUp} title="Sustainable" desc="Less idle time = lower fuel usage & smaller CO₂ footprint." bg="#7209B7" color="#FFF" />
        </div>
      </Section>

      {/* 5. TECH STACK (Marquee style representation) */}
      <Section title="THE STACK" bg="#F4A261">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {[
            'YOLOv8', 'Faster R-CNN', 'OpenCV', 'TensorFlow', 'PyTorch', 
            'Python 3.11', 'FastAPI', 'React.js', 'React Native', 'NVIDIA Jetson', 
            'AWS / Azure', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL'
          ].map((tech) => (
            <div key={tech} className="bg-white border-[4px] border-black px-6 py-4 font-display text-2xl md:text-3xl shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform transform rotate-[-1deg] hover:rotate-0 inline-block text-center mr-2 mb-2">
              {tech}
            </div>
          ))}
        </div>
      </Section>

      {/* 6. PROTOTYPE */}
      <Section id="prototype" title="PROTOTYPE UI" bg="#7209B7" color="white">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 bg-white text-black border-[6px] border-black shadow-[16px_16px_0_rgba(0,0,0,1)] rounded-xl overflow-hidden flex flex-col">
            <div className="bg-black text-white p-4 font-display text-xl flex justify-between items-center">
              <span>LIVE FEED</span>
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="relative bg-gray-200 h-96 flex items-center justify-center p-8 overflow-hidden">
              <div className="w-full max-w-lg h-full bg-gray-300 border-[4px] border-black relative">
                {/* Mock Image Content */}
                <div className="absolute inset-4 bg-[#E63946] border-[4px] border-black flex items-center justify-center">
                  <span className="opacity-50 font-display text-4xl transform -rotate-12">CONTAINER 40FT</span>
                </div>
                {/* Bounding Box */}
                <div className="absolute top-1/4 right-1/4 w-32 h-32 border-[4px] border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <div className="absolute -top-8 left-[-4px] bg-red-500 text-white font-bold px-2 py-1 text-sm border-[2px] border-black whitespace-nowrap">
                    DENT 92%
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-100 border-t-[6px] border-black flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-bold text-lg text-black">STATUS: <span className="text-red-600 bg-red-100 px-2 py-1 border-[2px] border-red-600">NEEDS REVIEW</span></div>
              <button className="bg-black text-white px-8 py-3 font-display text-xl hover:bg-red-500 hover:text-black hover:border-black border-[3px] border-transparent shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-colors">
                FLAG ISSUE
              </button>
            </div>
          </div>

          <div className="w-full xl:w-1/3 flex flex-col gap-6">
            <div className="bg-[#FFC700] p-6 border-[4px] border-black shadow-[8px_8px_0_rgba(0,0,0,1)] text-black">
              <div className="flex items-center gap-4 mb-4">
                <Activity size={32} />
                <h4 className="font-display text-2xl">STATISTICS</h4>
              </div>
              <ul className="space-y-3 font-bold text-xl">
                <li className="flex justify-between border-b-[2px] border-black pb-2"><span>Inspected</span> <span>1,245</span></li>
                <li className="flex justify-between border-b-[2px] border-black pb-2"><span>Anomalies</span> <span className="text-red-600">28</span></li>
                <li className="flex justify-between pb-2"><span>Time Saved</span> <span className="text-green-700">~41 hrs</span></li>
              </ul>
            </div>
            <div className="bg-[#2A9D8F] p-6 border-[4px] border-black shadow-[8px_8px_0_rgba(0,0,0,1)] text-black flex-1">
              <h4 className="font-display text-2xl mb-4 text-white" style={{ WebkitTextStroke: '1px black' }}>AI ANALYSIS</h4>
              <div className="bg-white border-[3px] border-black p-4 font-bold text-lg">
                <p className="mb-2 text-red-600 border-b-2 border-dotted border-gray-300 pb-2">🔴 Structural Dent (Right Panel)</p>
                <p className="mb-2 text-green-700 border-b-2 border-dotted border-gray-300 pb-2">🟢 Seal Intact (Verified)</p>
                <p className="text-green-700">🟢 Stacking Safe</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Drive Link Button */}
        <div className="mt-12 flex justify-center">
          <a filter="noopener" target="_blank" rel="noreferrer" href="https://drive.google.com/drive/folders/1vl2dqhAnZrEpiGAbXSDgtOpGtVbOC802?usp=sharing" className="bg-[#FFC700] hover:bg-black hover:text-[#FFC700] text-black border-[4px] border-black px-8 py-4 font-display text-2xl lg:text-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-4">
            <ExternalLink size={36} strokeWidth={3} />
            VIEW PROJECT DRIVE & ASSETS
          </a>
        </div>
      </Section>

      {/* 7. DP WORLD & MARKET */}
      <Section title="THE BUSINESS CASE" bg="#2A9D8F" color="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-5xl mb-6 leading-tight drop-shadow-[2px_2px_0_black]">WHY DP WORLD?</h3>
            <p className="font-bold text-xl leading-relaxed mb-6 bg-black/20 p-6 border-[4px] border-black">
              VisionGuard AI complements <span className="bg-[#FFC700] text-black px-2 mx-1 border-[2px] border-black">CARGOES</span> TOS. 
              Speeding up container handover achieves higher throughput, improved safety, and reduced environmental impact globally.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-4 border-[4px] border-black rounded-lg shadow-[4px_4px_0_black]">
                <Anchor size={48} className="text-[#FFC700]" />
              </div>
              <div className="bg-white p-4 border-[4px] border-black rounded-lg shadow-[4px_4px_0_black]">
                <Box size={48} className="text-[#E63946]" />
              </div>
            </div>
          </div>
          <div className="bg-[#FFC700] text-black p-8 border-[6px] border-black shadow-[12px_12px_0_rgba(0,0,0,1)] transform rotate-2">
            <h4 className="font-display text-3xl mb-6 border-b-[4px] border-black pb-4 text-center">MARKET POTENTIAL</h4>
            <ul className="space-y-4 font-bold text-xl">
              <li className="flex items-center gap-3"><span className="text-3xl">💰</span> Indian market ~9.4B USD.</li>
              <li className="flex items-center gap-3"><span className="text-3xl">📉</span> Prevents ₹50k–2L in demurrage.</li>
              <li className="flex items-center gap-3"><span className="text-3xl">🚀</span> High ROI in 6-9 months.</li>
              <li className="flex items-center gap-3"><span className="text-3xl">🌍</span> Huge sustainability impact.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 8. TEAM & CONTACT */}
      <Section id="contact" title="THE TEAM" bg="#000000" color="white" className="!pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { role: "Team Lead", name: "SRIHARSHA MEDURI" },
            { role: "Member", name: "HEMA CHANDRA REDDY" },
            { role: "Member", name: "DVS KARTHIKEYA" },
            { role: "Member", name: "SIVAPRAKASH" }
          ].map((m, i) => (
            <div key={i} className="bg-white text-black p-6 border-[4px] border-black shadow-[8px_8px_0_white] text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 mx-auto bg-[#4CC9F0] border-[4px] border-black rounded-full mb-6 flex items-center justify-center">
                <Users size={40} className="text-white" />
              </div>
              <h4 className="font-display text-2xl mb-2">{m.name}</h4>
              <p className="font-bold text-gray-600 uppercase tracking-widest">{m.role}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center border-[8px] border-white border-b-0 p-12 lg:p-24 relative overflow-hidden bg-[#E63946] mx-auto w-full max-w-5xl rounded-t-3xl">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <Starburst className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl relative z-10 drop-shadow-[4px_4px_0_black]" style={{ WebkitTextStroke: '2px black' }}>
            LET'S BUILD THIS.
          </h2>
          <p className="font-bold text-xl md:text-3xl mt-6 mb-12 relative z-10 bg-black/60 p-4 border-[3px] border-black inline-block">
            DP World National Hackathon 2026
          </p>
          <br/>
          <a href="mailto:sriharshameduri07@gmail.com" className="inline-block bg-[#FFC700] text-black font-display text-3xl px-12 py-6 border-[4px] border-black shadow-[8px_8px_0_black] hover:translate-y-2 hover:shadow-none transition-all relative z-10">
            CONTACT US
          </a>
          <p className="font-bold text-xl mt-8 relative z-10 drop-shadow-[2px_2px_0_black]">
            Or call: +91 6302761059
          </p>
        </div>
      </Section>
    </div>
  );
}