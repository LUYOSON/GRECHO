import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Factory, FileText, Home, PanelsTopLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    icon: PanelsTopLeft,
    title: 'Acoustic Ceiling Tile Surface Facer',
    description: 'Clean visible surface direction for ceiling tile systems requiring acoustic and appearance compatibility.',
    image: assetPath('/homepage-generated/case-acoustic-ceiling-review.jpg?v=20260604'),
    label: 'Acoustic',
  },
  {
    icon: Building2,
    title: 'Public Space Acoustic Wall Panel Facer',
    description: 'Facing appearance, texture and handling review for architectural wall absorption systems.',
    image: assetPath('/homepage-generated/case-acoustic-wall-panel-review.jpg?v=20260604'),
    label: 'Interior',
  },
  {
    icon: Factory,
    title: 'Mineral Wool Board Facer',
    description: 'Surface protection and lamination fit review for insulation board manufacturing.',
    image: assetPath('/homepage-generated/case-mineral-wool-review.jpg?v=20260604'),
    label: 'Insulation',
  },
  {
    icon: FileText,
    title: 'Gypsum Board Reinforced Facing Layer',
    description: 'Reinforcement-facing support for board durability, surface quality and technical comparison.',
    image: assetPath('/homepage-generated/case-gypsum-board-review.jpg?v=20260604'),
    label: 'Gypsum',
  },
  {
    icon: Home,
    title: 'PIR / PUR Insulation Board Facer',
    description: 'Foam compatibility and facer strength direction for rigid insulation panel production.',
    image: assetPath('/homepage-generated/case-pir-pur-review.jpg?v=20260604'),
    label: 'PIR / PUR',
  },
  {
    icon: Building2,
    title: 'ETICS Exterior Facing Material Reinforcement',
    description: 'Exterior insulation and finishing system review around coating support and reinforcement needs.',
    image: assetPath('/homepage-generated/case-etics-review.jpg?v=20260604'),
    label: 'ETICS',
  },
];

export default function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      triggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              contentRef.current?.querySelectorAll('.case-reveal') || [],
              { y: 36, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.72, stagger: 0.07, ease: 'power3.out' }
            );
          },
        })
      );
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  const scrollCases = (direction: 'left' | 'right') => {
    scrollerRef.current?.scrollBy({
      left: direction === 'right' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="applications" ref={sectionRef} className="overflow-hidden bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
      <div ref={contentRef} className="container-wide">
        <div className="case-reveal mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-lg bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1] shadow-sm">
              Application Examples
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Explore where GRECHO fiberglass facer materials are used.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCases('left')}
              aria-label="Previous application examples"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 transition-all duration-300 hover:bg-[#1b4aa1] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCases('right')}
              aria-label="Next application examples"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#1b4aa1] text-white transition-all duration-300 hover:bg-[#153a7f]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="case-reveal hide-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {caseStudies.map((study) => {
            const Icon = study.icon;

            return (
              <button
                key={study.title}
                type="button"
                onClick={scrollToContact}
                className="group relative h-[390px] min-w-[282px] snap-start overflow-hidden rounded-lg text-left shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10 sm:min-w-[324px] lg:min-w-[354px]"
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="mb-auto flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.12] text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-[#1b4aa1]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-lg bg-white/[0.12] px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                      {study.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight text-white">{study.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{study.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#bfdbfe]">
                    View Review Path
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
