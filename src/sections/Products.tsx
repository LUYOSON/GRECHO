import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers3,
  PanelsTopLeft,
  ThermometerSun,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const applications = [
  {
    icon: PanelsTopLeft,
    title: 'Acoustic Ceiling & Wall Systems',
    eyebrow: 'Visible acoustic surfaces',
    description:
      'Fiberglass facer solutions for ceiling tiles, wall absorbers, baffles and architectural acoustic systems requiring clean appearance and long-term stability.',
    image: assetPath('/homepage-generated/solution-acoustic-ceiling-wall.jpg?v=20260604'),
    points: ['Surface finish and color direction', 'Acoustic openness review', 'Sample mockup coordination'],
  },
  {
    icon: ThermometerSun,
    title: 'Mineral Wool Insulation Boards',
    eyebrow: 'Insulation board production',
    description:
      'Facers designed for mineral wool boards where dimensional stability, surface protection and production compatibility are critical.',
    image: assetPath('/homepage-generated/solution-mineral-wool-board.jpg?v=20260604'),
    points: ['Lamination and bonding fit', 'Moisture durability direction', 'Repeat-order material matching'],
  },
  {
    icon: Layers3,
    title: 'Gypsum Board Systems',
    eyebrow: 'Reinforcement and finishing',
    description:
      'Fiberglass reinforcement and facing solutions supporting gypsum board surface quality, crack resistance and production consistency.',
    image: assetPath('/homepage-generated/solution-gypsum-board.jpg?v=20260604'),
    points: ['Surface quality review', 'Reinforcement direction', 'Technical data preparation'],
  },
  {
    icon: Building2,
    title: 'PIR / PUR / ETICS Systems',
    eyebrow: 'Rigid foam and facade assemblies',
    description:
      'Application-focused facer materials for insulation panels and exterior wall assemblies requiring strength, compatibility and process consistency.',
    image: assetPath('/homepage-generated/solution-pir-pur-etics.jpg?v=20260604'),
    points: ['Foam and mortar compatibility', 'Exterior-facing strength direction', 'Compliance document routing'],
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeApplication = applications[activeIndex] || applications[0];
  const ActiveIcon = activeApplication.icon;

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
              contentRef.current?.querySelectorAll('.selection-reveal') || [],
              { y: 34, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }
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
    <section id="products" ref={sectionRef} className="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
      <div ref={contentRef} className="container-wide">
        <div className="selection-reveal mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-lg bg-[#e8f0ff] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
              Application-Led Selection
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Board applications first. Facer direction next.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 lg:ml-auto">
            Start with the board system, then review the fiberglass facer that fits your
            production process, performance targets and project documentation stage.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="selection-reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {applications.map((application, index) => {
              const Icon = application.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={application.title}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`group min-h-[132px] rounded-lg border p-5 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#1b4aa1] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-[#1b4aa1] bg-white shadow-xl shadow-[#1b4aa1]/10'
                      : 'border-slate-200 bg-white/70 hover:-translate-y-0.5 hover:border-[#1b4aa1]/30 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                        isActive ? 'bg-[#1b4aa1] text-white' : 'bg-[#e8f0ff] text-[#1b4aa1]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {application.eyebrow}
                      </span>
                      <span className="block text-lg font-bold leading-snug text-slate-950">
                        {application.title}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <article className="selection-reveal overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-900/[0.06]">
            <div className="grid h-full lg:grid-cols-[1.02fr_0.98fr]">
              <div className="relative min-h-[320px] overflow-hidden">
                <img
                  key={activeApplication.image}
                  src={activeApplication.image}
                  alt={activeApplication.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-flex rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1b4aa1] backdrop-blur-md">
                    GRECHO Solution Direction
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8f0ff] text-[#1b4aa1]">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
                    Selected Application
                  </p>
                  <h3 className="text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
                    {activeApplication.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {activeApplication.description}
                  </p>

                  <div className="mt-7 space-y-3">
                    {activeApplication.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1b4aa1]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#153a7f] sm:w-auto"
                >
                  Discuss This Application
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
