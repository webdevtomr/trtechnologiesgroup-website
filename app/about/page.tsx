export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-12">
        About TR Technologies Group PTY LTD
      </h1>

      <div className="space-y-8 text-body font-body leading-relaxed">
        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Overview
          </h2>
          <p>
            TR Technologies Group PTY LTD is a Perth-based technology consultancy founded in 2025. We are a team of 2 professionals specialising in software engineering and digital solutions for small and medium organisations.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Location
          </h2>
          <p>
            We operate locally in Perth, WA 6000, delivering services to clients across Western Australia and nationally where appropriate.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Approach
          </h2>
          <div className="space-y-4">
            <p>
              Our work is characterised by a client-driven and collaborative approach. We prioritise understanding operational requirements and business context before proposing technical solutions.
            </p>
            <p>
              We focus on delivering simple, effective, and practical technology solutions that align with real-world needs. Our projects emphasise functionality, reliability, and maintainability over unnecessary technical complexity.
            </p>
            <p>
              We work closely with clients throughout the development process, ensuring solutions meet their specific requirements and can be sustained after delivery.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Focus
          </h2>
          <div className="space-y-4">
            <p>
              We specialise in practical software engineering for small and medium organisations across various sectors including public sector, health and aged care, not-for-profit, and construction.
            </p>
            <p>
              Our services include artificial intelligence solutions, SaaS product development, and custom web and application development. We work on projects that require technical expertise combined with an understanding of operational realities and business constraints.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Values
          </h2>
          <div className="space-y-4">
            <p>
              We are committed to delivering technology solutions that provide measurable value and align with client objectives. Our work is grounded in technical competence, professional standards, and straightforward communication.
            </p>
            <p>
              We believe in building long-term relationships with clients based on trust, transparency, and consistent delivery of quality outcomes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
