export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-12">
        Projects
      </h1>

      <div className="space-y-12">
        <section>
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            RM Safe
          </h2>
          <div className="text-body font-body leading-relaxed space-y-4">
            <p>
              RM Safe is a workplace health and safety compliance platform developed for the construction industry. The system provides digital management of Safe Work Method Statements (SWMS), risk assessments, and WHS documentation.
            </p>
            <p>
              A key feature is an AI-assisted tool that supports the creation and review of SWMS documents, reducing administrative time while maintaining compliance standards. The platform streamlines documentation workflows and centralises safety records for construction projects.
            </p>
            <p>
              The system is designed to be accessible on-site via mobile devices and integrates with existing project management processes. It addresses practical compliance requirements for small to medium construction businesses operating in Australia.
            </p>
          </div>
        </section>

        <section className="border-t border-border pt-12">
          <h2 className="font-heading font-semibold text-2xl text-primary mb-4">
            Nana Bread
          </h2>
          <div className="text-body font-body leading-relaxed space-y-4">
            <p>
              Nana Bread is an e-commerce and operations platform built to support online retail activities and internal business management. The system combines customer-facing storefront functionality with backend operations tools.
            </p>
            <p>
              Core features include product catalogue management, order processing, inventory tracking, and customer account management. The platform is designed to handle day-to-day e-commerce operations while providing data and reporting capabilities for business decision-making.
            </p>
            <p>
              The system was developed to replace fragmented tools and manual processes, consolidating retail operations into a single integrated platform. It demonstrates our approach to building practical business systems that address specific operational needs.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
