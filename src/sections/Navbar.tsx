import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { assetPath } from '@/lib/assetPath';

const navLinks = [
  { name: 'Solutions', href: '#solutions' },
  { name: 'Products', href: '#products' },
  { name: 'Resources', href: '#advantages' },
  { name: 'Insights', href: '#cases' },
  { name: 'Applications', href: '#applications' },
  { name: 'About', href: '#footer' },
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
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-500 ease-industrial">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${
            isScrolled
              ? 'bg-white/95 opacity-100 shadow-[0_4px_20px_rgba(27,74,161,0.15)] backdrop-blur-md'
              : 'opacity-0'
          }`}
        />
        <div
          className={`container-wide relative z-10 transition-colors duration-500 ${
            isScrolled ? '' : 'lg:border-b lg:border-white/25'
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            <a
              href="#"
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="GRECHO home"
            >
              <img
                src={
                  isScrolled
                    ? assetPath('/brand/grecho-logo-blue.png?v=solid-transparent-20260603')
                    : assetPath('/brand/grecho-logo-white.png?v=solid-transparent-20260603')
                }
                alt="GRECHO"
                className="h-auto w-[132px] object-contain transition-all duration-300 sm:w-[170px] xl:w-[190px]"
              />
            </a>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled
                      ? 'text-slate-800 hover:text-[#1b4aa1]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-[#1b4aa1]' : 'bg-white'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Current language: ${currentLang}`}
                    title="Language selection"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isScrolled
                        ? 'text-slate-800 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>{currentLang}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      disabled={!lang.available}
                      onClick={() => {
                        if (lang.available) setCurrentLang(lang.code);
                      }}
                      className={lang.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                    >
                      <span className="font-medium">{lang.code}</span>
                      <span className="ml-2 text-muted-foreground">{lang.name}</span>
                      {!lang.available ? (
                        <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">
                          Soon
                        </span>
                      ) : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => scrollToSection('#contact')}
                className={`hidden sm:flex rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#1b4aa1] text-white hover:bg-industrial-dark hover:shadow-[0_4px_20px_rgba(27,74,161,0.15)]-lg'
                    : 'border border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#1b4aa1]'
                }`}
              >
                Request Technical Data
              </Button>

              <button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? 'text-slate-800 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-800/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-industrial ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <button
                  type="button"
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium text-slate-800 py-3 px-4 rounded-xl hover:bg-fog transition-colors duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-[#1b4aa1] hover:bg-industrial-dark text-white py-3 rounded-xl text-base font-medium"
              >
                Request Technical Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
