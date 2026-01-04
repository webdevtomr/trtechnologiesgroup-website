export default function Footer() {
  return (
    <footer className="bg-backgroundAlt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 tracking-tight">TR Technologies Group</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Professional software engineering and technology services for small and medium organisations.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 tracking-tight">Location</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Perth, WA 6000<br />
              Western Australia
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 tracking-tight">Quick Links</h3>
            <div className="space-y-2">
              {["#home", "#about", "#services", "#projects", "#contact"].map((link) => (
                <a
                  key={link}
                  href={link}
                  className="block text-secondary text-sm hover:text-accent transition-all duration-200"
                >
                  {link.substring(1).charAt(0).toUpperCase() + link.substring(2)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="text-center text-muted text-sm font-body">
            <p>© {new Date().getFullYear()} TR Technologies Group. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
