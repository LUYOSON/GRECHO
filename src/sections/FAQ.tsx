import { useState } from 'react';
import { ChevronDown, FileText, HelpCircle, Layers } from 'lucide-react';

const faqs = [
  {
    question: 'Can GRECHO help compare several facer options?',
    answer:
      'Yes. GRECHO can review your application, production process and project priorities to help identify suitable fiberglass facer directions for comparison.',
  },
  {
    question: 'Can samples be supplied before technical review?',
    answer:
      'Yes. Sample availability can be discussed based on application type, board structure and project information.',
  },
  {
    question: 'How do we submit board information?',
    answer:
      'You can provide board structure, core material, target market, performance requirements and project objectives through the contact form or direct email.',
  },
  {
    question: 'Which document level should we request first?',
    answer:
      'Early discussions often start with a product brief or surface information. Engineering comparison usually requires selected TDS, full TDS or project-specific sheets.',
  },
  {
    question: 'Can GRECHO review custom color, coating or width needs?',
    answer:
      'Selected custom directions can be reviewed after the application and sample path are clear. GRECHO will confirm feasibility and review scope before production discussions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="bg-[#f5f8f6] py-20 sm:py-24 lg:py-28">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1b4aa1] text-white">
              <HelpCircle className="h-6 w-6" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
              FAQ
            </p>
            <h2 className="max-w-md text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Quick questions for early project review.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
              Clarify sample timing, document scope and custom requirements before submitting your project details.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article
                  key={faq.question}
                  className={`rounded-lg border bg-white transition-all duration-300 ${
                    isOpen
                      ? 'border-[#1b4aa1]/45 shadow-lg shadow-[#1b4aa1]/10'
                      : 'border-slate-200 hover:border-[#1b4aa1]/25'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="flex items-start gap-3">
                      <Layers className="mt-0.5 h-5 w-5 shrink-0 text-[#1b4aa1]" />
                      <span className="text-base font-bold leading-snug text-slate-950">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-[#1b4aa1] text-white' : 'bg-[#e8f0ff] text-[#1b4aa1]'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    id={answerId}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pl-12 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={scrollToContact}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#153a7f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4aa1] focus-visible:ring-offset-2"
            >
              Request Document Support
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
