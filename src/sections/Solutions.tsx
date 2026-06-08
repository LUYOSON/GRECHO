import { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, ClipboardCheck, FileText, Layers, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const diagnostics = [
  {
    icon: Layers,
    title: 'Surface Finish Consistency',
    description: 'Check appearance, texture, color direction and cleanliness expectations before facer selection.',
  },
  {
    icon: CheckCircle,
    title: 'Bonding & Lamination Fit',
    description: 'Review board process, rolling direction and adhesive fit before sample confirmation.',
  },
  {
    icon: AlertTriangle,
    title: 'Moisture / Mold / Cleanability',
    description: 'Clarify moisture resistance, cleaning tolerance and visible surface stability needs.',
  },
  {
    icon: FileText,
    title: 'Fire & Compliance Documents',
    description: 'Identify data sheets, declarations and compliance documents required by your team.',
  },
  {
    icon: Settings,
    title: 'Sample-to-Production Matching',
    description: 'Reduce mismatch between early samples, selected direction and repeat-order expectations.',
  },
  {
    icon: ClipboardCheck,
    title: 'Request Scope Clarity',
    description: 'Capture application, core material, finish and document needs before technical review.',
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

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {diagnostics.map((item) => (
            <div
              key={item.title}
              className="solution-card group bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-[#1b4aa1]/30 hover:shadow-[0_4px_20px_rgba(27,74,161,0.15)]-lg transition-all duration-500 preserve-3d"
            >
              <div className="w-14 h-14 bg-fog rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1b4aa1] group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-7 h-7 text-[#1b4aa1] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#1b4aa1] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
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
