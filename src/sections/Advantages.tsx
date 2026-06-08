import { useEffect, useRef } from 'react';
import {
  Brush,
  Droplets,
  Flame,
  Layers,
  PackageCheck,
  Settings,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const diagnosticCards = [
  {
    icon: Brush,
    kicker: 'Visible Surface',
    title: 'Surface Finish Consistency',
    description: 'Maintain uniform appearance across visible ceiling and wall surfaces while supporting coating and finishing requirements.',
    image: assetPath('/grecho-assets/acoustic-material-direction.png?v=20260604'),
  },
  {
    icon: Layers,
    kicker: 'Process Fit',
    title: 'Bonding & Lamination Fit',
    description: 'Improve compatibility with adhesives, coating systems and continuous lamination processes.',
    image: assetPath('/grecho-assets/product-layer-application-visual.png?v=20260604'),
  },
  {
    icon: Droplets,
    kicker: 'Durability',
    title: 'Moisture & Mold Review',
    description: 'Support board performance in environments exposed to humidity, storage fluctuation and long-term service conditions.',
    image: assetPath('/grecho-assets/mineral-wool-review-factors.png?v=20260604'),
  },
  {
    icon: Flame,
    kicker: 'Compliance',
    title: 'Fire & Document Requirements',
    description: 'Review material options according to project-specific fire performance and documentation requirements.',
    image: assetPath('/grecho-assets/acoustic-document-support.png?v=20260604'),
  },
  {
    icon: Settings,
    kicker: 'Production',
    title: 'Manufacturing Efficiency',
    description: 'Reduce material variability and improve manufacturing consistency through application-matched facer selection.',
    image: assetPath('/grecho-assets/support-process-visual.png?v=20260604'),
  },
  {
    icon: PackageCheck,
    kicker: 'Samples',
    title: 'Sample-to-Production Matching',
    description: 'Align early samples with expected document scope, repeat-order direction and board production details.',
    image: assetPath('/grecho-assets/product-custom-facing-options.png?v=20260604'),
  },
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
              contentRef.current?.querySelectorAll('.diagnostic-reveal') || [],
              { y: 38, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, stagger: 0.075, ease: 'power3.out' }
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

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div ref={contentRef} className="container-wide">
        <div className="diagnostic-reveal mb-12 max-w-4xl">
          <div>
            <p className="mb-4 inline-flex rounded-lg bg-[#e8f0ff] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
              Pain Point Diagnostic
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Start with the board-fitting issue before choosing a facer direction.
            </h2>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            Review common production and performance concerns to identify the most
            suitable fiberglass facer direction before requesting samples or documents.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {diagnosticCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`diagnostic-reveal group overflow-hidden rounded-lg border border-slate-200 bg-[#f8faf9] transition-all duration-300 hover:-translate-y-1 hover:border-[#1b4aa1]/40 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 ${
                  index === 3 ? 'lg:row-span-1' : ''
                }`}
              >
                {item.image ? (
                  <div className="relative aspect-[16/8] overflow-hidden sm:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width="640"
                      height="360"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-[#1b4aa1] backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-[#1b4aa1] p-6 text-white">
                    <div className="text-center">
                      <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1b4aa1]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                        {item.kicker}
                      </p>
                    </div>
                  </div>
                )}

                <div className="min-h-[174px] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
                    {item.kicker}
                  </p>
                  <h3 className="text-xl font-bold leading-snug text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
