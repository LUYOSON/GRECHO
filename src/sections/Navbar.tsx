import { useEffect, useState } from 'react';
import { ChevronDown, Globe2, Menu, X } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

const navLinks = [
  { name: 'Solutions', href: '#products' },
  { name: 'Process', href: '#advantages' },
  { name: 'Cases', href: '#applications' },
  { name: 'Insights', href: '#cases' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const languages = [
  { code: 'EN', name: 'English', available: true },
  { code: 'CN', name: 'Chinese', available: false },
  { code: 'ES', name: 'Spanish', available: false },
  { code: 'FR', name: 'French', available: false },
  { code: 'DE', name: 'German', available: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const logo = isScrolled || isMobileMenuOpen
    ? assetPath('/brand/grecho-logo-blue-clean.png?v=20260604')
    : assetPath('/brand/grecho-logo-white-clean.png?v=20260604');

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/[0.94] shadow-lg shadow-slate-900/5 backdrop-blur-xl'
            : 'bg-slate-950/10 backdrop-blur-md'
        }`}
      >
        <div
          className={`container-wide flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-16' : 'h-20 text-white'
          }`}
        >
          <a
            href="#home"
            aria-label="GRECHO home"
            className="flex min-h-11 items-center"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logo} alt="GRECHO" className="h-auto w-[138px] object-contain sm:w-[168px]" />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className={`group relative min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-slate-700 hover:bg-slate-100 hover:text-[#1b4aa1]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    isScrolled ? 'bg-[#1b4aa1]' : 'bg-white'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <button
                type="button"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="menu"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold transition-colors duration-300 ${
                  isScrolled
                    ? 'text-slate-700 hover:bg-[#e8f0ff] hover:text-[#1b4aa1]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe2 className="h-4 w-4" />
                {currentLang}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                role="menu"
                className={`absolute left-1/2 top-[calc(100%+10px)] w-[186px] -translate-x-1/2 rounded-lg bg-white p-2 text-slate-900 shadow-2xl shadow-slate-900/15 transition-all duration-300 ${
                  isLanguageMenuOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
              >
                {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  disabled={!language.available}
                  role="menuitem"
                  onClick={() => {
                    if (!language.available) return;
                    setCurrentLang(language.code);
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`flex min-h-9 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors duration-200 ${
                    language.available
                      ? 'text-slate-800 hover:bg-[#eef5ff] hover:text-[#1b4aa1]'
                      : 'cursor-not-allowed text-slate-400'
                  }`}
                >
                  <span className="w-6 font-bold">{language.code}</span>
                  <span className="flex-1">{language.name}</span>
                  {!language.available ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                      Soon
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className={`hidden min-h-11 items-center rounded-full border px-5 text-sm font-bold transition-all duration-300 sm:inline-flex ${
                isScrolled
                  ? 'border-[#1b4aa1]/35 bg-white text-[#1b4aa1] hover:bg-[#e8f0ff]'
                  : 'border-white/60 bg-white/[0.08] text-white hover:bg-white hover:text-[#1b4aa1]'
              }`}
            >
              Request Technical Data
            </button>

            <button
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 lg:hidden ${
                isScrolled
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-3 top-3 w-[calc(100%-1.5rem)] max-w-sm rounded-lg bg-white p-5 shadow-2xl transition-all duration-500 ease-industrial ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="mb-6 flex h-16 items-center justify-between">
            <img
              src={assetPath('/brand/grecho-logo-blue-clean.png?v=20260604')}
              alt="GRECHO"
              className="h-auto w-[156px] object-contain"
            />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left text-base font-semibold text-slate-800 transition-colors duration-300 hover:bg-[#eef5ff]"
              >
                {link.name}
                <ChevronDown className="-rotate-90 h-4 w-4 text-[#1b4aa1]" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('#contact')}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1b4aa1] px-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#153a7f]"
          >
            Request Technical Data
          </button>
        </div>
      </div>
    </>
  );
}
