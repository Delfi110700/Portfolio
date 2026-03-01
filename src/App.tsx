import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Workflow, 
  Database, 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  Code2,
  Terminal,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Data ---
const RESUME_DATA = {
  name: "Fidel Juan Resuello",
  role: "AI Automation & CRM Specialist",
  location: "Caloocan City, Philippines",
  phone: "09930068354",
  email: "fideljuanresuello110700@gmail.com",
  linkedin: "https://linkedin.com/in/fidel-juan-resuello",
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
    }
  ],
  projects: [
    {
      platform: "Zapier",
      title: "Zapier",
      description: "Content Repurposing, Asana CRM Automation, Lead Enrichment",
      tags: ["Zapier", "Asana", "CRM", "Automation"],
      color: "text-orange-500",
      logoUrl: "https://logo.clearbit.com/zapier.com"
    },
    {
      platform: "Make",
      title: "Make",
      description: "Automated Export Account Transactions from Xero > Upload CSV to Asana, Auto Sort Gmail Attachments on Drive",
      tags: ["Make.com", "Xero", "Asana", "Google Drive"],
      color: "text-violet-500",
      logoUrl: "https://logo.clearbit.com/make.com"
    },
    {
      platform: "Go High Level",
      title: "Go High Level",
      description: "Advanced CRM & Marketing Automation workflows.",
      tags: ["GHL", "CRM", "Marketing"],
      color: "text-blue-500",
      isComingSoon: true,
      logoUrl: "https://logo.clearbit.com/gohighlevel.com"
    },
    {
      platform: "n8n",
      title: "n8n",
      description: "Self-hosted workflow automation for complex data pipelines.",
      tags: ["n8n", "Self-hosted", "Automation"],
      color: "text-red-500",
      isComingSoon: true,
      logoUrl: "https://logo.clearbit.com/n8n.io"
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
      role: "AI Automation Consultant",
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

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-2"
    >
      <div className="h-px w-8 bg-brand-primary" />
      <span className="text-brand-primary font-mono text-xs uppercase tracking-widest">{subtitle || "Section"}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-white"
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
          borderColor: isClicking ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)",
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
        {/* Ripples */}
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0, borderWeight: "2px" }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-12 h-12 border-2 border-brand-primary rounded-full pointer-events-none z-[9998]"
            style={{ left: ripple.x - 24, top: ripple.y - 24 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}

        {/* Particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 1, 
              x: particle.x - 2, 
              y: particle.y - 2,
              scale: 1 
            }}
            animate={{ 
              opacity: 0,
              x: particle.x - 2 + Math.cos(particle.angle) * particle.distance,
              y: particle.y - 2 + Math.sin(particle.angle) * particle.distance,
              scale: 0
            }}
            className="fixed top-0 left-0 w-1 h-1 bg-brand-primary rounded-sm pointer-events-none z-[9998]"
            transition={{ duration: 0.6, ease: "circOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default function App() {
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
      <nav className="fixed top-0 w-full z-50 bg-bg-dark/80 backdrop-blur-md border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-bg-dark font-bold text-xl">F</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
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
                className="text-sm font-medium text-neutral-400 hover:text-brand-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="px-5 py-2 bg-brand-primary text-bg-dark rounded-full text-sm font-bold hover:bg-emerald-400 transition-all transform hover:scale-105 active:scale-95"
            >
              Hire Me
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-32 px-6 overflow-hidden">
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
            <h1 className="text-6xl md:text-9xl font-bold text-white leading-tight mb-8">
              Scaling <span className="text-brand-primary">Efficiency</span> Through AI.
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12">
              {RESUME_DATA.summary}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-4 bg-white text-bg-dark rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all"
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
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <ArrowUpRight size={40} className="text-brand-primary" />
                </div>
                <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-bg-dark transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed">
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
              <motion.div 
                key={idx}
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
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors">{exp.role}</h3>
                    <div className="text-brand-primary font-medium">
                      {exp.company} {exp.client && <span className="text-neutral-500">| Client: {exp.client}</span>}
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-neutral-800 rounded-full text-xs font-mono text-neutral-400">
                    {exp.period}
                  </div>
                </div>
                <p className="text-neutral-500 text-sm mb-6 flex items-center gap-2">
                  <MapPin size={14} /> {exp.location}
                </p>
                <ul className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 text-neutral-400"
                    >
                      <CheckCircle2 size={16} className="text-brand-primary mt-1 shrink-0" />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-card-dark/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Featured Projects" subtitle="Portfolio" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {RESUME_DATA.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="glass-card group cursor-pointer relative overflow-hidden"
              >
                <div className="aspect-video bg-neutral-800 overflow-hidden relative">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={`https://picsum.photos/seed/${project.platform}/800/450`} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-50 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 pr-6 flex items-center gap-4">
                    {project.logoUrl && (
                      <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                        <img 
                          src={project.logoUrl} 
                          alt={`${project.platform} logo`} 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <h3 className={`text-5xl font-bold transition-colors leading-tight ${project.color}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <motion.div 
                    whileHover={project.isComingSoon ? {} : { x: 5 }}
                    className={`flex items-center gap-4 text-sm font-bold transition-colors ${project.isComingSoon ? 'text-neutral-600 cursor-not-allowed' : 'text-white group-hover:text-brand-primary'}`}
                  >
                    {project.isComingSoon ? "Coming Soon" : "View Case Study"} 
                    {!project.isComingSoon && <ChevronRight size={16} />}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
                <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border border-border-dark group-hover:border-brand-primary transition-colors">
                  <img src={`https://picsum.photos/seed/${ref.name}/100/100`} alt={ref.name} referrerPolicy="no-referrer" />
                </div>
                <MessageSquare className="text-brand-primary/20 mx-auto mb-4 group-hover:text-brand-primary/40 transition-colors" size={32} />
                <p className="text-neutral-300 italic mb-6">
                  "Fidel is a highly skilled professional in the field of {ref.role.toLowerCase()}. His dedication to workflow architecture and automation is exceptional."
                </p>
                <div className="font-bold text-white">{ref.name}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1">{ref.role}</div>
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
              <p className="text-neutral-400 mb-10 text-lg">
                Ready to automate your business processes or optimize your CRM? Reach out and let's discuss how I can help you scale.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail />, label: "Email", value: RESUME_DATA.email, href: `mailto:${RESUME_DATA.email}` },
                  { icon: <Phone />, label: "Phone", value: RESUME_DATA.phone, href: `tel:${RESUME_DATA.phone}` },
                  { icon: <Linkedin />, label: "LinkedIn", value: "fidel-juan-resuello", href: RESUME_DATA.linkedin }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-bg-dark transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 uppercase font-mono">{item.label}</div>
                      <a href={item.href} className="text-white font-medium hover:text-brand-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase">Name</label>
                  <input type="text" className="w-full bg-neutral-800 border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-500 uppercase">Email</label>
                  <input type="email" className="w-full bg-neutral-800 border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-500 uppercase">Subject</label>
                <input type="text" className="w-full bg-neutral-800 border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="Automation Project" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-500 uppercase">Message</label>
                <textarea rows={5} className="w-full bg-neutral-800 border border-border-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-brand-primary text-bg-dark font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-brand-primary/10"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
              <span className="text-bg-dark font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold tracking-tight">
              Fidel Juan Resuello
            </span>
          </div>
          
          <div className="text-neutral-500 text-sm font-mono">
            © {new Date().getFullYear()} — Built with Precision
          </div>
          
          <div className="flex items-center gap-6">
            <motion.a whileHover={{ y: -3 }} href="#" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="text-neutral-400 hover:text-white transition-colors"><Mail size={20} /></motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
