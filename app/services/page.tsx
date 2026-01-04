export default function Services() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-12">
        Services
      </h1>

      <div className="space-y-16">
        <section id="ai-solutions">
          <h2 className="font-heading font-semibold text-3xl text-primary mb-6">
            Artificial Intelligence Solutions
          </h2>
          <div className="text-body font-body leading-relaxed space-y-4">
            <p>
              Practical AI and automation integrations that improve productivity and simplify business workflows. Our approach focuses on implementing AI technologies that deliver tangible operational improvements rather than experimental or speculative applications.
            </p>
            <p>
              We work with organisations to identify processes suitable for automation, develop custom AI-powered tools, and integrate modern language models and machine learning capabilities into existing systems.
            </p>
            <p>
              Solutions are designed to be maintainable, cost-effective, and aligned with realistic business objectives.
            </p>
          </div>
        </section>

        <section id="saas-development" className="border-t border-border pt-16">
          <h2 className="font-heading font-semibold text-3xl text-primary mb-6">
            SaaS Product Development
          </h2>
          <div className="text-body font-body leading-relaxed space-y-4">
            <p>
              Design and delivery of scalable, cloud-hosted software-as-a-service platforms tailored to business needs. We specialise in building custom SaaS applications for small and medium organisations seeking to digitise operations or offer software products to their clients.
            </p>
            <p>
              Our development process includes requirements analysis, technical architecture, user interface design, implementation, and deployment. We prioritise clean code, system reliability, and straightforward user experiences.
            </p>
            <p>
              Platforms are built using modern web technologies and deployed on established cloud infrastructure to ensure availability and performance.
            </p>
          </div>
        </section>

        <section id="web-development" className="border-t border-border pt-16">
          <h2 className="font-heading font-semibold text-3xl text-primary mb-6">
            Web and Application Development
          </h2>
          <div className="text-body font-body leading-relaxed space-y-4">
            <p>
              Custom websites and applications for small to medium-scale projects, prioritising usability, reliability, and maintainability. We develop solutions ranging from corporate websites and business systems to client portals and internal tools.
            </p>
            <p>
              Projects are built with attention to responsive design, accessibility standards, and performance optimisation. We use established frameworks and development practices to ensure long-term sustainability and ease of future modifications.
            </p>
            <p>
              Our work emphasises practical functionality over unnecessary complexity, delivering solutions that meet operational requirements without excessive technical overhead.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
