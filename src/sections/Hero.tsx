import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import gsap from 'gsap';
import { assetPath } from '@/lib/assetPath';

const heroVideoPath = assetPath('/videos/banner.mp4?v=20260604');
const heroPoster = assetPath('/homepage-generated/hero-poster.jpg?v=20260604');

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(heroVideoPath, { method: 'HEAD' })
      .then((response) => {
        if (isMounted && response.ok) setVideoSrc(heroVideoPath);
      })
      .catch(() => {
        if (isMounted) setVideoSrc(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.hero-reveal', { clearProps: 'all' });
        return;
      }

      gsap.fromTo(
        '.hero-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.18,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-[82dvh] min-h-[640px] max-h-[780px] overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt="Fiberglass facer material and board application review"
          className={`absolute inset-0 h-full w-full object-cover object-[58%_center] transition-opacity duration-700 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {videoSrc ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover object-[58%_center] transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/[0.18] to-slate-950/[0.78]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
      </div>

      <div className="container-wide relative z-10 flex h-full flex-col justify-end pb-7 pt-28 sm:pb-9 lg:pb-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="hero-reveal mb-4 text-xs font-bold uppercase tracking-[0.26em] text-white/70">
            Application-Matched Fiberglass Facer Solutions
          </p>
          <h1 className="hero-reveal mx-auto max-w-5xl text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
            GRECHO helps board manufacturers choose the right facer direction.
          </h1>
          <p className="hero-reveal mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            From acoustic ceilings and wall panels to mineral wool, gypsum and exterior insulation
            boards, GRECHO supports application review, sample coordination and technical document
            preparation before projects move into production.
          </p>

          <div className="hero-reveal mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-6 text-sm font-bold text-white shadow-lg shadow-[#1b4aa1]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#153a7f] sm:w-auto"
            >
              Request a Sample
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#products')}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#1b4aa1] sm:w-auto"
            >
              Request Technical Review
              <BadgeCheck className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
