import { useEffect, useRef } from 'react';
import { BookOpen, ClipboardCheck, FileText, Layers, ListChecks, PackageCheck, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const workflow = [
  {
    icon: ClipboardCheck,
    title: 'Clarify Board Application',
    description: 'Acoustic, insulation or exterior board usage target.',
  },
  {
    icon: Layers,
    title: 'Match Facer Direction',
    description: 'Surface, bonding, width and document fit.',
  },
  {
    icon: PackageCheck,
    title: 'Coordinate Samples',
    description: 'Sample direction before product and project review.',
  },
  {
    icon: Users,
    title: 'Co-development',
    description: 'Joint review with project needs, sample and production details.',
  },
];

const resources = [
  {
    icon: BookOpen,
    type: 'Guide',
    title: 'Acoustic board facer selection notes.',
  },
  {
    icon: FileText,
    type: 'Brief',
    title: 'Documentation stages for fiberglass facer review.',
  },
  {
    icon: ListChecks,
    type: 'Checklist',
    title: 'Board application intake checklist.',
  },
];

export default function Advantages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current?.querySelectorAll('.animate-item') || [],
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);

      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.querySelectorAll('.workflow-card, .resource-card') || [],
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(cardsTrigger);
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
      className="section-padding bg-gradient-to-b from-white to-[#f5f8fc] relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1b4aa1]/20 to-transparent" />
      <div className="absolute top-24 right-0 w-80 h-80 bg-[#1b4aa1]/5 rounded-full blur-3xl" />

      <div className="container-wide relative z-10" ref={cardsRef}>
        <div ref={titleRef} className="max-w-3xl mb-12">
          <span className="animate-item inline-block text-[#1b4aa1] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            How GRECHO Supports Your Project
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            A visual path from application brief to technical review.
          </h2>
          <p className="animate-item text-base text-slate-600 leading-relaxed">
            Move from board application details to facer direction, sample review and document coordination with a clearer project path.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 lg:gap-5 mb-16">
          {workflow.map((item, index) => (
            <div
              key={item.title}
              className="workflow-card group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#1b4aa1]/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-[#1b4aa1]/50">0{index + 1}</span>
                <div className="w-10 h-10 rounded-full bg-[#1b4aa1]/10 flex items-center justify-center group-hover:bg-[#1b4aa1] transition-colors">
                  <item.icon className="w-5 h-5 text-[#1b4aa1] group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-[#12356f] to-[#1b4aa1] p-8 lg:p-10 text-white shadow-2xl shadow-[#1b4aa1]/20">
          <span className="inline-block text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Resource Center Preview
          </span>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Compact references for faster facer selection.
              </h3>
              <p className="text-white/70 leading-relaxed">
                Start with concise notes, review briefs and intake checklists before requesting deeper technical documents.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {resources.map((item) => (
                <div key={item.title} className="resource-card rounded-2xl bg-white/10 border border-white/15 p-5">
                  <item.icon className="w-5 h-5 text-white/80 mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-3">{item.type}</p>
                  <h4 className="text-sm font-semibold leading-snug">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
