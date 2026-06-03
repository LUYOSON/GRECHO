import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

const productLinks = [
  { name: 'Acoustic Ceiling & Wall Systems', href: '#products' },
  { name: 'Mineral Wool Insulation Boards', href: '#products' },
  { name: 'Gypsum Board Applications', href: '#products' },
  { name: 'PIR / PUR / ETICS Insulation Boards', href: '#products' },
];

const quickLinks = [
  { name: 'Solutions', href: '#solutions' },
  { name: 'Products', href: '#products' },
  { name: 'Resources', href: '#advantages' },
  { name: 'Applications', href: '#applications' },
  { name: 'About', href: '#footer' },
  { name: 'FAQ', href: '#cases' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <img
                src={assetPath('/brand/grecho-logo-white.png?v=solid-transparent-20260603')}
                alt="GRECHO"
                className="mb-6 h-auto w-[220px] max-w-full"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Application-matched fiberglass facer solution support for board
                manufacturers. GRECHO coordinates application review, sample direction,
                technical document support and selected supply-chain coordination.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <button
                    type="button"
                    key={social.label}
                    aria-label={`${social.label} profile coming soon`}
                    disabled
                    title="Coming soon"
                    className="w-10 h-10 cursor-not-allowed bg-white/5 rounded-lg flex items-center justify-center text-white/35 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-semibold mb-6">Solutions</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 text-sm hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Explore</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/60 text-sm hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@grechofiberglass.com"
                    className="text-white/60 text-sm hover:text-blue-400 transition-colors"
                  >
                    info@grechofiberglass.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+8618677188374"
                    className="text-white/60 text-sm hover:text-blue-400 transition-colors"
                  >
                    +86 186 7718 8374
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm">
                    Nanning, Guangxi, China
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} GRECHO Fiberglass. All rights reserved.
            </p>
            <p className="text-white/30 text-xs text-center">
              Application-matched fiberglass facer solution support for board manufacturers.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <button
                  type="button"
                  key={link.name}
                  disabled
                  title="Coming soon"
                  className="cursor-not-allowed text-white/30 text-sm transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
