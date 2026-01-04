export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-12">
        Contact
      </h1>

      <div className="space-y-8">
        <p className="text-body font-body leading-relaxed">
          For inquiries regarding our services or to discuss a potential project, please contact one of our team members directly.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mt-12">
          <div className="bg-card p-8 border border-border">
            <h2 className="font-heading font-semibold text-2xl text-primary mb-6">
              Andy
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-secondary text-sm font-body mb-1">Email</p>
                <a
                  href="mailto:andy@trtechnologiesgroup.com"
                  className="text-body font-body font-medium hover:text-primary transition-colors"
                >
                  andy@trtechnologiesgroup.com
                </a>
              </div>
              <div>
                <p className="text-secondary text-sm font-body mb-1">Phone</p>
                <a
                  href="tel:0474272080"
                  className="text-body font-body font-medium hover:text-primary transition-colors"
                >
                  0474 272 080
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 border border-border">
            <h2 className="font-heading font-semibold text-2xl text-primary mb-6">
              Tom
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-secondary text-sm font-body mb-1">Email</p>
                <a
                  href="mailto:tom@trtechnologiesgroup.com"
                  className="text-body font-body font-medium hover:text-primary transition-colors"
                >
                  tom@trtechnologiesgroup.com
                </a>
              </div>
              <div>
                <p className="text-secondary text-sm font-body mb-1">Phone</p>
                <a
                  href="tel:0438996029"
                  className="text-body font-body font-medium hover:text-primary transition-colors"
                >
                  0438 996 029
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-heading font-semibold text-xl text-primary mb-4">
            Location
          </h3>
          <p className="text-body font-body">
            Perth, WA 6000<br />
            Australia
          </p>
        </div>
      </div>
    </div>
  );
}
