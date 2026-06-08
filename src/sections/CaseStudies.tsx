import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: 'How fiberglass facer selection starts from the board application',
    meta: 'Selection Guide',
    image: assetPath('/grecho-assets/insight-material-selection.png?v=20260604'),
  },
  {
    title: 'Documentation stages for product briefs, TDS and project sheets',
    meta: 'Technical Review',
    image: assetPath('/homepage-generated/case-document-review.jpg?v=20260604'),
  },
  {
    title: 'Acoustic surface expectations before sample confirmation',
    meta: 'Application Notes',
    image: assetPath('/grecho-assets/insight-acoustic.png?v=20260604'),
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.insight-reveal') || [],
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power3.out' }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cases" ref={sectionRef} className="bg-white py-20 sm:py-24 lg:py-28">
      <div ref={contentRef} className="container-wide">
        <div className="insight-reveal mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 inline-flex rounded-lg bg-[#e8f0ff] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1b4aa1]">
              Insights
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Read our articles
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Practical notes for early material selection, document routing and application review.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#153a7f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4aa1] focus-visible:ring-offset-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <button
              key={article.title}
              type="button"
              onClick={scrollToContact}
              className="insight-reveal group overflow-hidden rounded-lg border border-slate-200 bg-[#f8faf9] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#1b4aa1]/25 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4aa1] focus-visible:ring-offset-2"
            >
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                width="640"
                height="400"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="flex min-h-[190px] flex-col justify-between p-5">
                <span>
                  <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1b4aa1]">
                    <BookOpen className="h-3.5 w-3.5" />
                    {article.meta}
                  </span>
                  <span className="block text-lg font-bold leading-snug text-slate-950">
                    {article.title}
                  </span>
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1b4aa1]">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
