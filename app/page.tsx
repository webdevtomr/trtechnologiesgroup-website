"use client";

import Image from "next/image";
import { TrueFocus } from "@/components/TrueFocus";
import { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const projects = [
    {
      title: "RM Safe",
      description: "WHS compliance platform and SWMS AI-assisted tool designed to streamline workplace health and safety documentation and risk management processes for construction and related industries.",
      tags: ["AI-Powered", "SaaS", "Construction"],
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Nana Bread",
      description: "E-commerce and operations platform supporting online retail activities and internal business operations management. Features include content management system (CMS), admin dashboard, customer relations management (CRM), and automated mailing and SMS capabilities.",
      tags: ["E-commerce", "CMS", "CRM", "Automation"],
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "Dental on Wheels",
      description: "Mobile dental service website showcasing services, portfolio, free resources, upcoming events and seminars, and educational videos. Features include content management system (CMS), basic customer relations management (CRM), and admin dashboard for content updates.",
      tags: ["Healthcare", "CMS", "CRM"],
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
];

export default function Home() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-hero"></div>
        
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Technology abstract"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
        </div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(77, 139, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(77, 139, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <div className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold">
              <TrueFocus text="TR Technologies Group" />
            </div>
            
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-primary mb-6 leading-[1.1] tracking-tight">
              <span className="block">Professional Software Engineering</span>
              <span className="block mt-2 text-secondary">and Technological Services</span>
            </h1>
            
            <p className="font-description font-light text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mb-12">
              A client-focused technology consultancy delivering practical, modern software and digital solutions for small and medium organisations, with an emphasis on simplicity, efficiency, and real-world outcomes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="btn-primary">
                Explore Services
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-backgroundAlt"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              About TR Technologies Group
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider">Who We Are</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="card-premium p-10">
              <div className="space-y-6 text-secondary font-description font-light leading-relaxed">
                <p className="text-lg">
                  Founded in 2025, TR Technologies Group is a Perth-based technology consultancy with a small team of professionals specialising in practical software engineering and digital solutions.
                </p>
                <p className="text-lg">
                  We operate locally in Perth, WA, delivering collaborative and client-focused services to small and medium organisations across various sectors.
                </p>
                <p className="text-lg">
                  Our approach emphasises simplicity, efficiency, and real-world outcomes, ensuring technological solutions align with operational needs and deliver measurable value.
                </p>
              </div>
            </div>

            <div className="card-premium p-10">
              <h3 className="font-heading font-semibold text-2xl text-primary mb-8 flex items-center tracking-tight">
                Industries We Serve
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {["Public Sector", "Health and Aged Care", "Not-for-Profit", "Construction", "Hospitality"].map((industry) => (
                  <div key={industry} className="flex items-center text-secondary font-description font-light group">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-3 group-hover:bg-accent/20 transition-colors">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              Our Services
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider mb-4">What We Offer</p>
            <p className="text-xl text-secondary max-w-3xl mx-auto font-description font-light">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-premium p-8 group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-primary mb-4 tracking-tight">
                Artificial Intelligence Solutions
              </h3>
              <p className="text-secondary font-description font-light leading-relaxed mb-6">
                Practical AI and automation integrations that improve productivity and simplify business workflows. Our approach focuses on implementing AI technologies that deliver tangible operational improvements.
              </p>
              <ul className="space-y-3 text-sm text-secondary">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Custom AI-powered tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Process automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Language model integration</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8 group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-primary mb-4 tracking-tight">
                SaaS Product Development
              </h3>
              <p className="text-secondary font-description font-light leading-relaxed mb-6">
                Design and delivery of scalable, cloud-hosted software-as-a-service platforms tailored to business needs. We specialise in building custom SaaS applications for small and medium organisations.
              </p>
              <ul className="space-y-3 text-sm text-secondary">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Requirements analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Technical architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Cloud deployment</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8 group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-2xl text-primary mb-4 tracking-tight">
                Web and Application Development
              </h3>
              <p className="text-secondary font-description font-light leading-relaxed mb-6">
                Custom websites and applications for small to medium-scale projects, prioritising usability, reliability, and maintainability. We develop solutions ranging from corporate websites to internal tools.
              </p>
              <ul className="space-y-3 text-sm text-secondary">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Responsive design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5">→</span>
                  <span>Accessibility standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-24 md:py-32 overflow-hidden bg-backgroundAlt">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              Featured Projects
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider mb-4">Our Work</p>
            <p className="text-xl text-secondary max-w-3xl mx-auto font-description font-light">
              Real-world solutions delivering measurable value to our clients
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`transition-all duration-700 ease-in-out ${
                    index === activeProjectIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-full"
                  }`}
                >
                  <div className="card-premium p-12 group">
                    <div className="flex items-start justify-between mb-8">
                      <h3 className="font-heading font-semibold text-3xl text-primary tracking-tight">
                        {project.title}
                      </h3>
                      <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                        {project.icon}
                      </div>
                    </div>
                    <p className="text-secondary font-description font-light leading-relaxed text-lg mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProjectIndex(index)}
                  className={`transition-all duration-300 ${
                    index === activeProjectIndex
                      ? "w-8 h-2 bg-accent shadow-accent-glow-sm"
                      : "w-2 h-2 bg-secondary/30 hover:bg-secondary/50"
                  } rounded-full`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                className="w-10 h-10 rounded-full border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all flex items-center justify-center group"
                aria-label="Previous project"
              >
                <svg className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveProjectIndex((prev) => (prev + 1) % projects.length)}
                className="w-10 h-10 rounded-full border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all flex items-center justify-center group"
                aria-label="Next project"
              >
                <svg className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              Get in Touch
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider mb-4">Contact Us</p>
            <p className="text-xl text-secondary max-w-3xl mx-auto font-description font-light">
              Ready to discuss your project? Contact our team today
            </p>
          </div>
          
          <div className="flex justify-center gap-64 max-w-4xl mx-auto">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all bg-white">
                    <Image
                      src="/andy_pp.png"
                      alt="Andy"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary tracking-tight">
                    @Andy
                  </h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 bg-card border-border">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/20 flex-shrink-0 bg-white">
                    <Image
                      src="/andy_pp.png"
                      alt="Andy"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-primary">Andy</h4>
                      <p className="text-sm text-muted">Founder</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <a href="mailto:andy@trtechnologiesgroup.com" className="flex items-center text-secondary hover:text-accent transition-colors">
                        <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        andy@trtechnologiesgroup.com
                      </a>
                      <a href="tel:0474272080" className="flex items-center text-secondary hover:text-accent transition-colors">
                        <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        0474 272 080
                      </a>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all bg-white">
                    <Image
                      src="/tom_pp.png"
                      alt="Tom"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary tracking-tight">
                    @Tom
                  </h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 bg-card border-border">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/20 flex-shrink-0 bg-white">
                    <Image
                      src="/tom_pp.png"
                      alt="Tom"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-primary">Tom</h4>
                      <p className="text-sm text-muted">Founder</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <a href="mailto:tom@trtechnologiesgroup.com" className="flex items-center text-secondary hover:text-accent transition-colors">
                        <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        tom@trtechnologiesgroup.com
                      </a>
                      <a href="tel:0438996029" className="flex items-center text-secondary hover:text-accent transition-colors">
                        <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        0438 996 029
                      </a>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </section>
    </>
  );
}
