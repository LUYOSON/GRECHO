import { useEffect, useRef } from 'react';
import { ArrowRight, BadgeCheck, Factory, FileCheck2, PackageSearch, Route } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trustStats = [
  {
    value: '4',
    label: 'Application routes',
    detail: 'Acoustic, mineral wool, gypsum and PIR / PUR / ETICS systems.',
    tone: 'primary',
  },
  {
    value: '48h',
    label: 'Initial routing',
    detail: 'Fast intake direction for samples and technical document requests.',
    tone: 'blue',
  },
  {
    value: '3+',
    label: 'Document levels',
    detail: 'Briefs, color / surface information, TDS and project-specific sheets.',
    tone: 'white',
  },
];

const supportPoints = [
  {
    icon: Route,
    title: 'Application-Matched Direction',
    description: 'Begin from the board system and surface target, then narrow the fiberglass facer path.',
  },
  {
    icon: PackageSearch,
    title: 'Sample Coordination',
    description: 'Coordinate facer samples around board mockups, visible surface needs and production fit.',
  },
  {
    icon: FileCheck2,
    title: 'Technical Document Support',
    description: 'Request the document depth that matches your review stage instead of overloading the first step.',
  },
  {
    icon: Factory,
    title: 'Production Fit',
    description: 'Review facer direction before scaling a board program.',
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      triggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              contentRef.current?.querySelectorAll('.trust-reveal') || [],
              { y: 42, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.78, stagger: 0.09, ease: 'power3.out' }
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

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7faff] py-20 text-slate-950 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(27,74,161,0.10),transparent_34%),radial-gradient(circle_at_12%_85%,rgba(27,74,161,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1b4aa1]/15 to-transparent" />

      <div ref={contentRef} className="container-wide relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="trust-reveal">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#1b4aa1]">
              Why Manufacturers Trust GRECHO
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Renewable-style clarity for industrial facer decisions.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              The homepage rhythm is light, clean and optimistic, but the content stays grounded:
              GRECHO helps technical, purchasing and production teams move from vague material
              questions to a practical review path.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#1b4aa1] px-5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#153a7f]"
            >
              Start Review
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trustStats.map((stat) => (
              <article
                key={stat.label}
                className={`trust-reveal min-h-[220px] rounded-lg border p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  stat.tone === 'primary'
                    ? 'border-[#1b4aa1]/80 bg-[#1b4aa1] text-white shadow-[#1b4aa1]/20'
                    : stat.tone === 'blue'
                      ? 'border-[#345fa8] bg-[#345fa8] text-white shadow-[#1b4aa1]/15'
                      : 'border-slate-200 bg-white text-slate-950 shadow-slate-900/5'
                }`}
              >
                <div
                  className={`mb-8 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                    stat.tone === 'white' ? 'bg-[#e8f0ff] text-[#1b4aa1]' : 'bg-white/[0.18] text-white'
                  }`}
                >
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="text-4xl font-bold">{stat.value}</p>
                <h3 className="mt-2 text-sm font-bold">{stat.label}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    stat.tone === 'white' ? 'text-slate-600' : 'text-white/70'
                  }`}
                >
                  {stat.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {supportPoints.map((item) => (
            <article
              key={item.title}
              className="trust-reveal rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b4aa1]/35 hover:shadow-xl hover:shadow-[#1b4aa1]/10"
            >
              <div className="mb-7 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f0ff] text-[#1b4aa1]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
