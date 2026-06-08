import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Layers, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { assetPath } from '@/lib/assetPath';

const heroVideoPath = assetPath('/videos/banner.mp4?v=20260603');
const heroPoster = assetPath('/homepage-generated/hero-poster.jpg?v=20260603');

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.25 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(
        actionsRef.current?.children || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.72,
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-dvh min-h-[720px] w-full overflow-hidden bg-slate-950"
    >
      {/* Video-ready media banner. Replace public/videos/banner.mp4 to update the hero footage. */}
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt="GRECHO fiberglass material and architectural application"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pb-16">
        <div className="container-wide w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                Fiberglass Facer Solution Provider
              </p>

              <h1
                ref={titleRef}
                className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[46px]"
              >
                Application-Matched Fiberglass Facer Solutions for Board Manufacturers
              </h1>

              <p
                ref={subtitleRef}
                className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/85 sm:text-lg"
              >
                GRECHO helps acoustic, mineral wool, gypsum and PIR/PUR/ETICS board
                manufacturers match reliable fiberglass facer directions through
                material selection, sample coordination, technical documentation and
                selected supply-chain coordination.
              </p>

              <div ref={actionsRef} className="mt-7 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollToSection('#contact')}
                  className="group inline-flex min-h-11 items-center gap-2 border-b border-white/75 pb-1 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Request a Sample
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('#products')}
                  className="group inline-flex min-h-11 items-center gap-2 border-b border-white/45 pb-1 text-sm font-semibold text-white/85 transition-colors duration-300 hover:border-white hover:text-white"
                >
                  <Layers className="h-4 w-4" />
                  Request Technical Data
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
