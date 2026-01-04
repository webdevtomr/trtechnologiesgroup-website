"use client";

import Image from "next/image";
import { TrueFocus } from "@/components/TrueFocus";
import { useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const products = [
  {
    title: "AI-Powered SWMS Generator",
    description: "A WHS compliance platform with an integrated SWMS AI tool. The platform utilises AI-powered workflows to generate Safe Work Method Statements, streamline documentation, and significantly improve user efficiency in workplace safety and risk management processes.",
    tags: ["AI-Powered", "SaaS", "WHS Compliance"],
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Phonetics",
    description: "A client management and therapy-support platform for speech pathologists, enabling clinicians to assign exercises, track progress, and review AI-assisted practice results in one integrated workspace.",
    tags: ["Healthcare", "SaaS", "AI-Powered", "Client Management"],
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  }
];

export default function Home() {

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
              <TrueFocus text="TR Technologies Group PTY LTD" smallerLastWords={2} />
            </div>
            
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-primary mb-6 leading-[1.1] tracking-tight">
              <span className="block">We Build and Operate</span>
              <span className="block mt-2 text-secondary">Modern Software Products</span>
            </h1>
            
            <p className="font-description font-light text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mb-8">
              TR Technologies Group PTY LTD is a product-focused technology company that designs, develops, and operates our own portfolio of software platforms and digital tools.
            </p>
            
            <p className="font-description font-light text-base md:text-lg text-secondary/80 leading-relaxed max-w-2xl mb-12">
              Our mission is to create practical, scalable software products that solve real-world problems and deliver measurable value.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="btn-primary">
                View Our Products
              </a>
              <a href="#about" className="btn-secondary">
                About Our Company
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
              About TR Technologies Group PTY LTD
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider">Who We Are</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card-premium p-10">
              <div className="space-y-6 text-secondary font-description font-light leading-relaxed">
                <p className="text-lg">
                  Founded in 2025, TR Technologies Group PTY LTD is a Perth-based software product company focused on building and operating our own digital platforms and technology solutions.
                </p>
                <p className="text-lg">
                  Rather than operating as a traditional service-based consultancy, our work centres on identifying opportunities, designing software products, and growing them into sustainable, real-world solutions.
                </p>
                <p className="text-lg">
                  Our approach emphasises simplicity, practicality, and long-term value; building products that are efficient to operate, meaningful to users, and built with a focus on real outcomes rather than complexity.
                </p>
                <p className="text-base text-secondary/80 italic mt-8 pt-6 border-t border-border">
                  We operate our products in-house and continually iterate on them based on real-world usage and customer feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="relative py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              Our Products
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider mb-4">What We Build</p>
            <p className="text-xl text-secondary max-w-3xl mx-auto font-description font-light">
              A growing portfolio of software products designed, built, and operated by TR Technologies Group PTY LTD.
            </p>
          </div>

          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 8000,
              }),
            ]}
            className="max-w-3xl mx-auto"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.title}>
                  <div className="card-premium p-10 group">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="font-heading font-semibold text-3xl text-primary tracking-tight">
                        {product.title}
                      </h3>
                      <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                        {product.icon}
                      </div>
                    </div>
                    <p className="text-secondary font-description font-light leading-relaxed text-lg mb-6">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-16" />
            <CarouselNext className="right-0 translate-x-16" />
          </Carousel>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="card p-6 bg-backgroundAlt/50 border-accent/20">
              <p className="text-secondary/80 font-description font-light text-sm leading-relaxed text-center">
                Our focus is on designing, owning, and operating our own software products and platforms. From time to time, we may collaborate selectively with partners where there is strategic alignment - however, product development remains our core focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 md:py-32 bg-backgroundAlt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 tracking-tight">
              Get in Touch
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto mb-4"></div>
            <p className="text-muted text-sm uppercase tracking-wider mb-4">Contact Us</p>
            <p className="text-xl text-secondary max-w-3xl mx-auto font-description font-light">
              Interested in partnering with one of our products, exploring collaboration opportunities, or learning more about what we're building? Get in touch with our team.
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
