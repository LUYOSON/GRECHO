import { ArrowUpRight, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

const footerColumns = [
  {
    title: 'Applications',
    links: [
      { name: 'Acoustic Ceiling & Wall Systems', href: '#products' },
      { name: 'Mineral Wool Insulation Boards', href: '#products' },
      { name: 'Gypsum Board Systems', href: '#products' },
      { name: 'PIR / PUR / ETICS Systems', href: '#products' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Product Brief', href: '#cases' },
      { name: 'Technical Data Sheets', href: '#contact' },
      { name: 'Application Guides', href: '#cases' },
      { name: 'Sample Requests', href: '#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About GRECHO', href: '#home' },
      { name: 'Manufacturing', href: '#advantages' },
      { name: 'Technical Support', href: '#solutions' },
      { name: 'Contact', href: '#contact' },
    ],
  },
];

const socialLinks = [
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'X', icon: Twitter },
  { label: 'YouTube', icon: Youtube },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-white">
      <div className="container-wide border-t border-slate-200 py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr_0.9fr]">
          <div>
            <img
              src={assetPath('/brand/grecho-logo-blue-clean.png?v=20260604')}
              alt="GRECHO"
              className="h-auto w-[190px] object-contain"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
              Application-matched fiberglass facer solutions for board manufacturers.
              GRECHO supports application review, sample direction and technical
              document coordination.
            </p>
            <div className="mt-8 flex items-center gap-3" aria-label="GRECHO social media">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={`${social.label} profile coming soon`}
                  title={`${social.label} coming soon`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1b4aa1] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1b4aa1] hover:bg-[#e8f0ff]"
                >
                  <social.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 text-sm font-bold text-slate-950">{column.title}</h2>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(link.href)}
                        className="text-left text-sm leading-snug text-slate-500 transition-colors duration-300 hover:text-[#1b4aa1]"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold text-slate-950">Contact</h2>
            <div className="space-y-4">
              <a
                href="mailto:info@grechofiberglass.com"
                className="flex items-start gap-3 text-sm text-slate-600 transition-colors duration-300 hover:text-[#1b4aa1]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                info@grechofiberglass.com
              </a>
              <a
                href="tel:+8618677188374"
                className="flex items-start gap-3 text-sm text-slate-600 transition-colors duration-300 hover:text-[#1b4aa1]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                +86 186 7718 8374
              </a>
              <p className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Nanning, Guangxi, China
              </p>
            </div>

            <a
              href="https://www.grechofiberglass.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:border-[#1b4aa1] hover:text-[#1b4aa1]"
            >
              Website
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} GRECHO Fiberglass. All rights reserved.</p>
          <p>Application-matched fiberglass facer solution support for board manufacturers.</p>
        </div>
      </div>
    </footer>
  );
}
