import { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, ClipboardCheck, FileText, Layers, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import surfaceFinishImage from '@/assets/diagnostics/surface-finish.jpg';
import bondingFitImage from '@/assets/diagnostics/bonding-fit.jpg';
import moistureReviewImage from '@/assets/diagnostics/moisture-review.jpg';
import complianceDocumentsImage from '@/assets/diagnostics/compliance-documents.jpg';
import productionMatchingImage from '@/assets/diagnostics/production-matching.jpg';
import requestScopeImage from '@/assets/diagnostics/request-scope.jpg';

gsap.registerPlugin(ScrollTrigger);

const diagnostics = [
  {
    icon: Layers,
    kicker: 'Visible Surface',
    title: 'Surface Finish Consistency',
    description: 'Check appearance, texture, color direction and cleanliness expectations before facer selection.',
    image: surfaceFinishImage,
  },
  {
    icon: CheckCircle,
    kicker: 'Process Fit',
    title: 'Bonding & Lamination Fit',
    description: 'Review board process, rolling direction and adhesive fit before sample confirmation.',
    image: bondingFitImage,
  },
  {
    icon: AlertTriangle,
    kicker: 'Durability',
    title: 'Moisture / Mold / Cleanability',
    description: 'Clarify moisture resistance, cleaning tolerance and visible surface stability needs.',
    image: moistureReviewImage,
  },
  {
    icon: FileText,
    kicker: 'Compliance',
    title: 'Fire & Compliance Documents',
    description: 'Identify data sheets, declarations and compliance documents required by your team.',
    image: complianceDocumentsImage,
  },
  {
    icon: Settings,
    kicker: 'Production',
    title: 'Sample-to-Production Matching',
    description: 'Reduce mismatch between early samples, selected direction and repeat-order expectations.',
    image: productionMatchingImage,
  },
  {
    icon: ClipboardCheck,
    kicker: 'Project Intake',
    title: 'Request Scope Clarity',
    description: 'Capture application, core material, finish and document needs before technical review.',
    image: requestScopeImage,
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      triggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              titleRef.current?.querySelectorAll('.animate-item') || [],
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
          },
          once: true,
        })
      );

      cardsRef.current?.querySelectorAll('.solution-card').forEach((card, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                card,
                { y: 60, opacity: 0, rotateX: -10 },
                {
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: 'power3.out',
                }
              );
            },
            once: true,
          })
        );
      });
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section id="solutions" ref={sectionRef} className="section-padding bg-fog relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#0047AB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-item inline-block text-[#1b4aa1] text-sm font-semibold tracking-wider uppercase mb-4">
            Pain Point Diagnostic
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Start with the board-fitting issue before choosing a{' '}
            <span className="text-gradient">facer direction.</span>
          </h2>
          <p className="animate-item text-lg text-muted-foreground">
            GRECHO helps teams review application details, sample requests and
            technical documents before a project moves forward.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {diagnostics.map((item) => (
            <article
              key={item.title}
              className="solution-card group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#1b4aa1]/35 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width="640"
                  height="360"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/95 text-[#1b4aa1] shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="min-h-[180px] p-5 sm:p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
                  {item.kicker}
                </p>
                <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1b4aa1]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Not sure which issue matters first?</p>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[#1b4aa1] font-semibold hover:underline"
          >
            Request a Project Review
          </a>
        </div>
      </div>
    </section>
  );
}
