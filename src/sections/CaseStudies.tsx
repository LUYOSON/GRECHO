import { useEffect, useRef, useState } from 'react';
import { ChevronDown, FileText, HelpCircle, MessageSquareText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Can GRECHO help compare several fiberglass facer directions?',
    answer:
      'Yes. GRECHO can coordinate direction options by application, board system, surface expectation and review scope, so your team can compare suitable paths before sample confirmation.',
  },
  {
    question: 'Can samples be coordinated before all details are finalized?',
    answer:
      'Yes. A concise board application brief is enough to start sample direction. We can refine width, finish, document level and shipment details as the project becomes clearer.',
  },
  {
    question: 'How do we request technical documents?',
    answer:
      'Select the document level that matches your current review stage, such as product brief, selected TDS, full TDS or test report coordination by application scope.',
  },
  {
    question: 'What information helps GRECHO review an application faster?',
    answer:
      'Board type, core material, use environment, visible surface needs, bonding process, requested width, target market and document expectations all help shorten the first review cycle.',
  },
  {
    question: 'Can GRECHO support custom color, coating or width needs?',
    answer:
      'Selected custom directions can be reviewed after the application and sample path are clear. GRECHO will confirm feasibility, sample scope and production review requirements before moving forward.',
  },
  {
    question: 'How does GRECHO reduce sample-to-production mismatch?',
    answer:
      'We align sample direction with product scope, document requirements and repeat-order expectations early, then keep key review points visible during technical and supply coordination.',
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

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

      const listTrigger = ScrollTrigger.create({
        trigger: listRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            listRef.current?.querySelectorAll('.faq-card') || [],
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(listTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-[#f6f9fd] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1b4aa1]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-[0.85fr_1.35fr] gap-10 lg:gap-16 items-start">
          <div ref={titleRef} className="lg:sticky lg:top-28">
            <span className="animate-item inline-block text-[#1b4aa1] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              FAQ Preview
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
              Quick questions for early project review.
            </h2>
            <p className="animate-item text-base text-slate-600 leading-relaxed mb-8">
              Use these answers to prepare a faster board application brief, sample request or technical document review.
            </p>

            <div className="animate-item rounded-2xl border border-[#1b4aa1]/10 bg-white/80 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1b4aa1]/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquareText className="w-5 h-5 text-[#1b4aa1]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Need a direct review path?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Share your board application, target surface and document needs. GRECHO will coordinate the next review direction.
                  </p>
                  <button
                    type="button"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#1b4aa1] hover:text-slate-900 transition-colors"
                  >
                    Request technical data
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref={listRef} className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  className={`faq-card rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
                    isOpen
                      ? 'border-[#1b4aa1]/25 shadow-xl shadow-[#1b4aa1]/10'
                      : 'border-slate-200 hover:border-[#1b4aa1]/20 hover:shadow-md'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-[#1b4aa1] flex-shrink-0 mt-0.5" />
                      <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-[#1b4aa1] text-white rotate-180' : 'bg-[#e8eef8] text-[#1b4aa1]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-7 pb-6 sm:pb-7 pl-[52px] sm:pl-[64px] text-sm sm:text-base text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
