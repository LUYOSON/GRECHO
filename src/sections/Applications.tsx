import { useEffect, useRef } from 'react';
import { Building2, Heart, GraduationCap, Plane, Home, Factory, FileText, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const applications = [
  {
    icon: Building2,
    title: 'Acoustic Ceiling Tile Surface Review',
    description: 'Review broad tile finish, cleanability, color direction and document needs for acoustic ceiling systems.',
    image: '/homepage-generated/case-acoustic-ceiling-review.jpg',
    stats: 'Acoustic Application',
  },
  {
    icon: Heart,
    title: 'Public-Space Acoustic Wall Panel Review',
    description: 'Review facing appearance, surface texture, handling and acoustic wall panel requirements.',
    image: '/homepage-generated/case-acoustic-wall-panel-review.jpg',
    stats: 'Acoustic Application',
  },
  {
    icon: GraduationCap,
    title: 'Mineral Wool Board Facer Direction Review',
    description: 'Review board handling, surface compatibility and sample needs for mineral wool insulation boards.',
    image: '/homepage-generated/case-mineral-wool-review.jpg',
    stats: 'Mineral Wool Application',
  },
  {
    icon: Plane,
    title: 'Gypsum Board Reinforced Facing Review',
    description: 'Review reinforcement direction, bonding fit, board handling compatibility and document needs.',
    image: '/homepage-generated/case-gypsum-board-review.jpg',
    stats: 'Gypsum Application',
  },
  {
    icon: Home,
    title: 'PIR / PUR Insulation Board Facer Review',
    description: 'Review foam compatibility, surface option and technical data for insulation board systems.',
    image: '/homepage-generated/case-pir-pur-review.jpg',
    stats: 'PIR / PUR Application',
  },
  {
    icon: Factory,
    title: 'ETICS Exterior-Facing Material Review',
    description: 'Review facer strength, coating support and exterior insulation system requirements.',
    image: '/homepage-generated/case-etics-review.jpg',
    stats: 'ETICS Application',
  },
  {
    icon: FileText,
    title: 'Technical Document Review Package',
    description: 'Review product brief, selected TDS, full TDS and report scope before formal project submission.',
    image: '/homepage-generated/case-document-review.jpg',
    stats: 'Document Review',
  },
];

export default function Applications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
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
      });
      triggers.push(titleTrigger);

      // Grid items animation
      const items = gridRef.current?.querySelectorAll('.app-card');
      items?.forEach((item, index) => {
        const itemTrigger = ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              item,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: (index % 3) * 0.1,
                ease: 'power3.out',
              }
            );
          },
          once: true,
        });
        triggers.push(itemTrigger);
      });
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="section-padding bg-fog relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-item inline-block text-[#1b4aa1] text-sm font-semibold tracking-wider uppercase mb-4">
            Application Examples
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Application{' '}
            <span className="text-gradient">Examples</span>
          </h2>
          <p className="animate-item text-lg text-muted-foreground">
            Anonymous board-facing review scenarios for acoustic, mineral wool,
            gypsum and insulation board applications.
          </p>
        </div>

        {/* Applications Grid - Masonry Style */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <button
              type="button"
              key={index}
              onClick={scrollToContact}
              aria-label={`Discuss ${app.title} application`}
              className={`app-card group relative w-full rounded-3xl overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4aa1] focus-visible:ring-offset-4 ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
            >
              {/* Background Image */}
              <div className="relative h-full min-h-[280px] md:min-h-[320px]">
                <img
                  src={app.image}
                  alt={app.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1b4aa1] transition-colors duration-500">
                  <app.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors duration-300">
                  {app.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm mb-3">{app.description}</p>

                {/* Stats Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90">
                    {app.stats}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#1b4aa1] group-hover:text-white">
                    View Example
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#1b4aa1]/50 transition-colors duration-500 pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Need more examples?{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
              }}
              className="text-[#1b4aa1] font-medium hover:underline"
            >
              View all application examples
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
