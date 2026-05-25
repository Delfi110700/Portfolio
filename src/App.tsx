import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Workflow, 
  Database, 
  Zap, 
  MapPin, 
  Linkedin, 
  ExternalLink, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  Code2,
  Terminal,
  ArrowUpRight,
  X,
  Maximize2,
  Layout,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Data ---
const RESUME_DATA = {
  name: "Fidel Juan Resuello",
  role: "AI Automation & CRM Specialist",
  location: "Caloocan City, Philippines",
  phone: "09512976577",
  email: "fideljuanresuello110700@gmail.com",
  linkedin: "https://www.linkedin.com/in/fidel-resuello/",
  upwork: "https://www.upwork.com/freelancers/~01e3665f0635f1b24a",
  onlinejobs: "https://v2.onlinejobs.ph/jobseekers/info/2070126",
  summary: "I’m an AI Automation & CRM Specialist who builds workflows that cut manual tasks by up to 70% and get leads to respond in under 5 minutes. My systems boost conversions, improve pipeline visibility, and eliminate revenue leaks, turning chaotic operations into smooth, profitable processes.",
  skills: [
    "CRM Setup & Customization",
    "Sales Pipeline & Funnel Automation",
    "Lead Capture & Lead Routing Automation",
    "CRM Data Structuring & Cleanup",
    "Contact Lifecycle Automation",
    "Opportunity & Deal Tracking",
    "CRM Migration & Integration",
    "Workflow Automation Design & Optimization",
    "No-Code / Low-Code Automation",
    "Business Process Automation (BPA)",
    "AI-Powered Automation (LLM integrations)",
    "API Integration & Webhooks",
    "Automation Troubleshooting & Optimization",
    "Scalable Automation Architecture"
  ],
  experience: [
    {
      company: "Yondu",
      role: "Application Support",
      location: "Quezon City",
      period: "June 2025 - March 2026",
      highlights: [
        "Monitor ServiceNow Incoming Tickets, ensuring SLA adherence through proper prioritization and escalation.",
        "Test application enhancements in staging environment to ensure stability before production deployment.",
        "Monitor and maintained SSL certificates for web-based applications to prevent service disruptions.",
        "Execute batch scripts for manual data uploads from SAP to SQL Server when automation was unavailable.",
        "Collaborate with L3 development team on application enhancements, issue resolution, and release validation.",
        "Performed regression testing to prevent defects from reaching production environments.",
        "Conduct Software Acceptance Testing (SAT) based on approved business requirements.",
        "Guided business users through User Acceptance Testing (UAT) prior to production release.",
        "Support change management activities, performing post-deployment validation to ensure production stability."
      ]
    },
    {
      company: "Apsoft (MSP)",
      client: "Goldilocks",
      role: "IT Service Desk Analyst (L1 & L1.5 Support)",
      location: "San Juan, Philippines",
      period: "May 2024 - June 2025",
      highlights: [
        "Provided real-time chat-based technical support with 85% first-contact resolution.",
        "Managed 20+ Jira tickets daily, maintaining 88% SLA compliance.",
        "Handled account setup, access recovery, and verification, reducing downtime by 30%.",
        "Delivered remote support via RDP and AnyDesk across 150+ devices.",
        "Supported Outlook, Teams, and SharePoint access and usage issues.",
        "Followed escalation procedures and coordinated with higher-level support teams.",
        "Maintained documentation and knowledge base, reducing repeat tickets by 25%."
      ]
    },
    {
      company: "Geo Part Sales",
      role: "Technical Support",
      location: "Quezon City, Philippines",
      period: "Aug 2023 - May 2024",
      highlights: [
        "Set up new computers, printers, and other peripherals.",
        "Troubleshoot desktop or laptop hardware issues.",
        "Provide on-site or remote helpdesk support for employees.",
        "Guiding users through troubleshooting steps politely and clearly.",
        "Installing, updating, and configuring software applications.",
        "Creating documentation for common issues and fixes (knowledge base)."
      ]
    },
    {
      company: "E P Villoria Accounting Services",
      role: "Technical Support (Intern)",
      location: "Caloocan City, Philippines",
      period: "March 2022 - May 2022",
      highlights: [
        "Maintain computers, printers, and peripherals for smooth operations.",
        "Troubleshoot hardware, software, and network issues to reduce repeats.",
        "Installed and updated accounting and office software to ensure security.",
        "Supported users on-site while meeting response time expectations.",
        "Educate employees on proper use of applications and IT best practices, reducing errors."
      ]
    }
  ],
  projects: [
    {
      platform: "Zapier",
      title: "Zapier",
      description: "Complex multi-step workflow logic with advanced paths and conditional branching.",
      tags: ["Typeform", "Zapier", "ActiveCampaign", "Slack", "Gmail"],
      color: "text-orange-500",
      logoUrl: "https://cdn.simpleicons.org/zapier/FF6600",
      bgImage: "/src/assets/images/zapier_bg_1779679133369.png",
      cta: "View Case Study >",
      technicalSummary: "Architected a high-volume lead routing system using Zapier Paths. This workflow handles incoming Typeform responses, formats dates, routes data based on department (Sales, Accounting, Support, Comms), and manages contact synchronization with ActiveCampaign and instant team notifications via Slack.",
      toolsUsed: ["Zapier", "Typeform", "ActiveCampaign", "Slack", "Gmail"],
      workflowImage: "/src/assets/images/zapier_workflow_logic_1779091669955.png",
      catalog: [
        { 
          image: "/src/assets/images/zapier_workflow_logic_1779091669955.png", 
          title: "Main Workflow Logic & Branching" 
        }
      ]
    },
    {
      platform: "Make",
      title: "Make",
      description: "Automated Export Account Transactions from Xero > Upload CSV to Asana, Auto Sort Gmail Attachments on Drive",
      tags: ["Make.com", "Xero", "Asana", "Google Drive"],
      color: "text-violet-500",
      logoUrl: "https://cdn.simpleicons.org/make/6D28D9",
      bgImage: "/src/assets/images/make_bg_1779679599892.png", // Integration network
      cta: "View Case Study >"
    },
    {
      platform: "Go High Level",
      title: "GoHighLevel",
      description: "Workflow & Marketing Automation Ecosystem for agencies.",
      tags: ["GHL", "CRM", "SaaS"],
      color: "text-brand-primary",
      isComingSoon: true,
      logoUrl: "https://www.gohighlevel.com/wp-content/uploads/2023/07/cropped-favicon-new-192x192.png",
      bgImage: "/src/assets/images/ghl_bg_1779693692076.png", 
      cta: "Coming Soon",
      toolsUsed: [],
      workflowImage: "https://www.gohighlevel.com/wp-content/uploads/2021/01/GHL-Logo-White.png"
    },
    {
      platform: "n8n",
      title: "n8n",
      description: "Self-hosted workflow automation for complex data pipelines.",
      tags: ["n8n", "Self-hosted", "Automation"],
      color: "text-red-500",
      logoUrl: "https://cdn.simpleicons.org/n8n/EA4B71",
      bgImage: "/src/assets/images/n8n_exact_bg_1779688051276.png",
      cta: "View Case Study >",
      technicalSummary: "Built localized weather notification bots and automated discord management tools using multi-node n8n workflows.",
      toolsUsed: ["n8n", "Discord API", "OpenWeather", "Webhooks"]
    }
  ],
  references: [
    {
      name: "Aldrin Mendoza",
      role: "Certified Go High Level Admin",
      type: "Endorsement"
    },
    {
      name: "RJ Villamor",
      role: "n8n Ambassador",
      type: "Endorsement"
    },
    {
      name: "Christian Go",
      role: "Workflow Architect",
      type: "Endorsement"
    }
  ]
};

// --- Components ---

const ExperienceItem = ({ exp, idx }: { exp: any; idx: number; key?: React.Key }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 border-l border-border-dark group"
    >
      <motion.div 
        whileInView={{ scale: [1, 1.5, 1] }}
        className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-brand-primary rounded-full" 
      />
      <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
        <div>
          <h3 className="text-2xl font-bold group-hover:text-brand-primary transition-colors">{exp.role}</h3>
          <div className="text-brand-primary font-medium">
            {exp.company} {exp.client && <span className="text-text-muted">| Client: {exp.client}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="px-3 py-1 bg-card-dark rounded-full text-xs font-mono text-text-muted">
            {exp.period}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-heading transition-colors uppercase tracking-wider"
          >
            {isExpanded ? (
              <>Hide Details <ChevronUp size={14} /></>
            ) : (
              <>View Details <ChevronDown size={14} /></>
            )}
          </button>
        </div>
      </div>
      <p className="text-neutral-500 text-sm mb-6 flex items-center gap-2">
        <MapPin size={14} /> {exp.location}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-3 overflow-hidden"
          >
            {exp.highlights.map((h: string, i: number) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-text-muted"
              >
                <CheckCircle2 size={16} className="text-brand-primary mt-1 shrink-0" />
                <span>{h}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-3"
    >
      <div className="h-px w-10 bg-brand-primary/50" />
      <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold">{subtitle || "Section"}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: string; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<{ id: string; x: number; y: number; angle: number; distance: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 9);
      
      // Create ripple
      const newRipple = { id: `ripple-${timestamp}-${randomSuffix}`, x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      
      // Create particles burst
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: `particle-${timestamp}-${randomSuffix}-${i}`,
        x: e.clientX,
        y: e.clientY,
        angle: (i * 45) * (Math.PI / 180),
        distance: 40 + Math.random() * 40
      }));
      setParticles(prev => [...prev, ...newParticles]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 800);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-primary/30 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isClicking ? 1.5 : 1,
          borderColor: "var(--brand-primary)",
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-primary rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />

      <AnimatePresence>
      </AnimatePresence>
    </>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasVisuals = selectedProject && (selectedProject.workflowImage || (selectedProject.catalog && selectedProject.catalog.length > 0));
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen technical-grid selection:bg-brand-primary selection:text-bg-dark">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-bg-dark/80 backdrop-blur-md border-b border-border-dark transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              Fidel Juan Resuello
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Experience', 'Projects', 'Contact'].map((item, idx) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm font-medium text-text-muted hover:text-brand-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}

            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-card-dark border border-border-dark text-text-muted hover:text-brand-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="px-6 py-2.5 bg-brand-primary text-white rounded-lg text-sm font-bold shadow-[0_0_20px_var(--shadow-brand)] hover:scale-105 transition-all active:scale-95"
            >
              Hire Me
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-32 px-6 overflow-hidden relative">
        {/* Subtle server rack hint */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--gradient-brand)_50%,transparent_100%)] bg-[length:200%_100%] animate-[pulse_8s_infinite]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/30 border border-brand-primary/20 text-brand-primary text-xs font-bold mb-8"
            >
              <Zap size={14} className="animate-pulse" />
              AVAILABLE FOR NEW PROJECTS
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tight">
              Scaling <span className="text-brand-primary">Efficiency</span> Through AI.
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-12">
              {RESUME_DATA.summary}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-brand-primary/20 transition-all hover:scale-105"
              >
                View Projects <ArrowUpRight size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-4 border border-border-dark rounded-xl font-bold flex items-center gap-2 hover:bg-card-dark transition-all"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-card-dark/30 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Specialized Services" subtitle="Capabilities" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: <Workflow />, 
                title: "Workflow Automation", 
                desc: "End-to-end design and optimization of business processes using No-Code/Low-Code tools like Zapier and Make." 
              },
              { 
                icon: <Database />, 
                title: "CRM Optimization", 
                desc: "Setup, customization, and data structuring for sales pipelines, lead routing, and lifecycle tracking." 
              },
              { 
                icon: <Zap />, 
                title: "AI Integrations", 
                desc: "Leveraging LLMs and AI-powered automation to enhance decision-making and customer response times." 
              },
              { 
                icon: <Code2 />, 
                title: "API & Webhooks", 
                desc: "Seamlessly connecting disparate software systems through custom API integrations and webhook listeners." 
              },
              { 
                icon: <Briefcase />, 
                title: "Business Process Automation", 
                desc: "Transforming manual, repetitive tasks into scalable, ROI-driven automated systems." 
              },
              { 
                icon: <Terminal />, 
                title: "Technical Support", 
                desc: "High-level application support, troubleshooting, and maintenance for enterprise-grade systems." 
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 glow-on-hover transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-bg-dark transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-muted leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Work Experience" subtitle="Career Path" />
          
          <div className="space-y-12">
            {RESUME_DATA.experience.map((exp, idx) => (
              <ExperienceItem key={idx} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-card-dark/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Scalable Projects" subtitle="Portfolio" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {RESUME_DATA.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                id={project.platform.toLowerCase().replace(/\s+/g, '-') + '-card'}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="glass-card group cursor-pointer relative overflow-hidden"
              >
                <div className="aspect-video bg-card-dark overflow-hidden relative">
                  {(project as any).bgImage && (
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      src={(project as any).bgImage} 
                      alt={project.title} 
                      className="w-full h-full transition-transform duration-700 object-cover opacity-50"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-100" />
                  <div className="absolute bottom-6 left-6 pr-6 flex items-center gap-4">
                    {project.logoUrl && (
                      <div className="w-14 h-14 bg-card-dark backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-border-dark shadow-2xl group-hover:scale-110 group-hover:bg-card-dark/80 transition-all duration-500">
                        <img 
                          src={project.logoUrl} 
                          alt={`${project.platform} logo`} 
                          className={`w-full h-full object-contain transition-all duration-300 ${
                            !isDarkMode && (project as any).invertInLight ? 'invert brightness-0' : ''
                          }`}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <h3 className={`text-5xl font-bold transition-all duration-500 leading-tight tracking-tighter group-hover:translate-x-2 ${project.color}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 flex items-center justify-between bg-card-dark backdrop-blur-md border-t border-border-dark">
                  <span className={`text-xl font-bold ${project.color}`}>{project.platform}</span>
                  <button 
                    onClick={() => {
                      if (project.isComingSoon && project.cta === "Coming Soon") return;
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }}
                    className={`cursor-pointer ${project.isComingSoon && project.cta === "Coming Soon" ? 'cursor-not-allowed' : ''}`}
                  >
                    <motion.div 
                      whileHover={project.isComingSoon && project.cta === "Coming Soon" ? {} : { x: 8, color: "var(--color-brand-primary)" }}
                      className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 ${project.isComingSoon && project.cta === "Coming Soon" ? 'text-text-muted' : ''}`}
                    >
                      {(project as any).cta} 
                      {!(project.isComingSoon && project.cta === "Coming Soon") && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Study Modal (Lightbox) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-bg-dark/95 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`relative w-full ${hasVisuals ? 'max-w-6xl' : 'max-w-3xl'} max-h-[90vh] overflow-y-auto bg-bg-dark rounded-3xl border border-border-dark shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-2 bg-card-dark hover:bg-card-dark/80 rounded-full border border-border-dark transition-colors"
                >
                  <X size={24} />
                </button>

                <div className={hasVisuals ? "grid lg:grid-cols-2" : "block"}>
                  {/* Left Side: Image/Workflow */}
                  {hasVisuals && (
                    <div className="p-8 lg:p-12 bg-card-dark/50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-dark">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-xs font-mono uppercase tracking-widest ${selectedProject.color}`}>
                          {selectedProject.catalog && selectedProject.catalog.length > 0 
                            ? `Visual Catalog (${currentImageIndex + 1}/${selectedProject.catalog.length})` 
                            : 'Technical Workflow'}
                        </div>
                        {selectedProject.catalog && selectedProject.catalog.length > 1 && (
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => (prev === 0 ? selectedProject.catalog.length - 1 : prev - 1));
                              }}
                              className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => (prev === selectedProject.catalog.length - 1 ? 0 : prev + 1));
                              }}
                              className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      <div 
                        onClick={() => setEnlargedImage(selectedProject.catalog && selectedProject.catalog.length > 0 
                          ? selectedProject.catalog[currentImageIndex].image 
                          : selectedProject.workflowImage)}
                        className="relative group rounded-2xl overflow-hidden border border-border-dark shadow-2xl aspect-video bg-black/40 cursor-zoom-in"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={currentImageIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            src={selectedProject.catalog && selectedProject.catalog.length > 0 
                              ? selectedProject.catalog[currentImageIndex].image 
                              : selectedProject.workflowImage} 
                            alt="Workflow Logic" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                        
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Zoom Overlay Hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20">
                            <Maximize2 size={24} />
                          </div>
                        </div>
                        
                        {selectedProject.catalog && selectedProject.catalog.length > 1 && (
                          <>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => (prev === 0 ? selectedProject.catalog.length - 1 : prev - 1));
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full border border-border-dark opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => (prev === selectedProject.catalog.length - 1 ? 0 : prev + 1));
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full border border-border-dark opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </div>
                      <p className="mt-6 text-sm text-text-muted italic text-center">
                        {selectedProject.catalog && selectedProject.catalog.length > 0 
                          ? selectedProject.catalog[currentImageIndex].title 
                          : 'Visual representation of the multi-step automation logic.'}
                      </p>
                    </div>
                  )}

                  {/* Right Side: Details */}
                  <div className={`p-10 lg:p-16 flex flex-col justify-center ${hasVisuals ? '' : 'w-full'}`}>
                    <div className="flex items-center gap-4 mb-10">
                      {selectedProject.logoUrl && (
                        <div className="w-20 h-20 bg-card-dark rounded-2xl p-4 border border-border-dark shadow-xl">
                          <img src={selectedProject.logoUrl} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div>
                        <h2 className={`text-5xl font-bold tracking-tighter ${selectedProject.color}`}>
                          {selectedProject.title}
                        </h2>
                        <p className="text-text-muted font-medium text-lg">Case Study</p>
                      </div>
                    </div>

                    <div className="space-y-12">
                      {(selectedProject.technicalSummary || selectedProject.description) && (
                        <div>
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <Layout size={24} className={selectedProject.color} />
                            Technical Summary
                          </h3>
                          <p className="text-text-muted leading-relaxed text-xl">
                            {selectedProject.technicalSummary || selectedProject.description}
                          </p>
                        </div>
                      )}

                      {(selectedProject.toolsUsed?.length > 0 || selectedProject.tags?.length > 0) && (
                        <div>
                          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Cpu size={24} className={selectedProject.color} />
                            Tools & Integration
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            {(selectedProject.toolsUsed || selectedProject.tags).map((tool: string, i: number) => (
                              <span key={i} className="px-5 py-2.5 bg-card-dark border border-border-dark rounded-2xl text-base font-bold shadow-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {enlargedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
              onClick={() => setEnlargedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-[120]"
                onClick={() => setEnlargedImage(null)}
              >
                <X size={32} />
              </button>
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={enlargedImage}
                alt="Enlarged Workflow"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Testimonials/References Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Professional Endorsements" subtitle="Network" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {RESUME_DATA.references.map((ref, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-8 text-center group"
              >
                <div className="w-16 h-16 bg-card-dark rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border border-border-dark group-hover:border-brand-primary transition-colors">
                  <img src={`https://picsum.photos/seed/${ref.name}/100/100`} alt={ref.name} referrerPolicy="no-referrer" />
                </div>
                <MessageSquare className="text-brand-primary/20 mx-auto mb-4 group-hover:text-brand-primary/40 transition-colors" size={32} />
                <p className="text-text-muted italic mb-6">
                  "Fidel is a highly skilled professional in the field of {ref.role.toLowerCase()}. His dedication to workflow architecture and automation is exceptional."
                </p>
                <div className="font-bold">{ref.name}</div>
                <div className="text-xs text-text-muted uppercase tracking-widest mt-1">{ref.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-brand-primary/5 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-16 grid lg:grid-cols-2 gap-12"
          >
            <div>
              <SectionHeading title="Let's Build Something Efficient" subtitle="Contact" />
              <p className="text-text-muted mb-10 text-lg">
                Ready to automate your business processes or optimize your CRM? Reach out and let's discuss how I can help you scale.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <img 
                      src="https://cdn.simpleicons.org/gmail/EA4335" 
                      className="w-6 h-6 group-hover:brightness-0 transition-all" 
                      alt="Gmail" 
                      referrerPolicy="no-referrer" 
                    />, 
                    label: "Gmail", 
                    value: RESUME_DATA.email, 
                    href: `mailto:${RESUME_DATA.email}`, 
                    color: "#EA4335" 
                  },
                  { 
                    icon: <img 
                      src="https://cdn.simpleicons.org/whatsapp/25D366" 
                      className="w-6 h-6 group-hover:brightness-0 transition-all" 
                      alt="WhatsApp" 
                      referrerPolicy="no-referrer" 
                    />, 
                    label: "WhatsApp", 
                    value: RESUME_DATA.phone, 
                    href: `https://wa.me/63${RESUME_DATA.phone.substring(1)}`, 
                    color: "#25D366" 
                  },
                  { icon: <Linkedin />, label: "LinkedIn", value: "fidel-resuello", href: RESUME_DATA.linkedin, color: "#0077B5" },
                  { 
                    icon: <img 
                      src="https://cdn.simpleicons.org/upwork/6FDA44" 
                      className="w-6 h-6 group-hover:brightness-0 transition-all" 
                      alt="Upwork" 
                      referrerPolicy="no-referrer" 
                    />, 
                    label: "Upwork", 
                    value: "View Profile", 
                    href: RESUME_DATA.upwork,
                    color: "#6FDA44"
                  },
                  { 
                    icon: <img 
                      src="https://www.onlinejobs.ph/favicon.ico" 
                      className="w-6 h-6 group-hover:brightness-0 transition-all" 
                      style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(164deg) brightness(101%) contrast(101%)' }}
                      alt="OnlineJobs" 
                      referrerPolicy="no-referrer" 
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/google/00AEEF';
                      }} 
                    />, 
                    label: "OnlineJobs.ph", 
                    value: "View Profile", 
                    href: RESUME_DATA.onlinejobs,
                    color: "#00AEEF"
                  }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.href}
                    target={item.href.startsWith('http') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div 
                      className="w-12 h-12 bg-card-dark rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--item-color)] group-hover:text-bg-dark"
                      style={{ 
                        color: item.color,
                        '--item-color': item.color 
                      } as any}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase font-mono">{item.label}</div>
                      <div 
                        className="font-medium transition-colors group-hover:text-[var(--item-color)]"
                        style={{ '--item-color': item.color } as any}
                      >
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-8 py-12 px-6 bg-card-dark border border-border-dark rounded-3xl relative overflow-hidden group">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-brand-primary mb-2 relative z-10">
                <Zap size={40} className="animate-pulse" />
              </div>
              
              <div className="text-center relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready to Automate?</h3>
                <p className="text-text-muted max-w-md mx-auto mb-8">
                  Let's discuss how we can cut your manual work by 70% and streamline your operations with a custom AI & CRM strategy.
                </p>
              </div>

              <motion.a 
                href="https://calendly.com/fidelresuello413/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg shadow-2xl shadow-brand-primary/30 flex items-center gap-3 relative z-10"
              >
                Book a Free Consultation <ChevronRight size={20} />
              </motion.a>
              
              <p className="text-xs text-text-muted font-mono relative z-10">
                Available: Mon - Sun · 30-min Strategy Session
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">F</span>
            </div>
            <span className="font-bold tracking-tight">
              Fidel Juan Resuello
            </span>
          </div>
          
          <div className="text-neutral-500 text-sm font-mono">
            © {new Date().getFullYear()} — Built with Precision
          </div>
          
          <div className="flex items-center gap-6">
            <motion.a whileHover={{ y: -3 }} href={RESUME_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-primary transition-colors"><Linkedin size={20} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href={`mailto:${RESUME_DATA.email}`} className="text-text-muted hover:text-brand-primary transition-colors">
              <img src="https://cdn.simpleicons.org/gmail/EA4335" className="w-5 h-5 grayscale hover:grayscale-0 transition-all" alt="Gmail" referrerPolicy="no-referrer" />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
