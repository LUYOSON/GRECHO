import { useEffect, useRef } from 'react';
import { Volume2, Thermometer, Square, Palette, ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    icon: Volume2,
    title: 'Acoustic Ceiling & Wall Facer',
    description:
      'Sound absorption panel facing solutions for public and commercial interiors.',
    features: [
      'Surface appearance and acoustic openness review',
      'Color, texture and coating direction matching',
      'Sample coordination for board mockups',
      'Technical data package support',
    ],
    image: assetPath('/homepage-generated/solution-acoustic-ceiling-wall.jpg?v=20260603'),
    color: 'from-blue-500/30 to-cyan-500/30',
  },
  {
    id: 2,
    icon: Thermometer,
    title: 'Mineral Wool Insulation Facers',
    description:
      'Fiberglass facer directions for mineral wool board applications.',
    features: [
      'Bonding and lamination fit review',
      'Moisture and mold cleanability discussion',
      'Fire and compliance document support',
      'Sample-to-production matching',
    ],
    image: assetPath('/homepage-generated/solution-mineral-wool-board.jpg?v=20260603'),
    color: 'from-orange-500/30 to-red-500/30',
  },
  {
    id: 3,
    icon: Square,
    title: 'Gypsum Board Facers',
    description:
      'Reinforced facing support for gypsum board systems.',
    features: [
      'Surface finish consistency review',
      'Mechanical and dimensional direction matching',
      'Technical documentation request support',
      'Prototype sample coordination',
    ],
    image: assetPath('/homepage-generated/solution-gypsum-board.jpg?v=20260603'),
    color: 'from-green-500/30 to-emerald-500/30',
  },
  {
    id: 4,
    icon: Palette,
    title: 'PIR / PUR / ETICS Insulation Facers',
    description:
      'Rigid foam and exterior insulation board facer support.',
    features: [
      'Foam and mortar insulation board fit',
      'Moisture and facer strength direction',
      'Fire compliance document coordination',
      'Board application intake checklist',
    ],
    image: assetPath('/homepage-generated/solution-pir-pur-etics.jpg?v=20260603'),
    color: 'from-amber-500/30 to-orange-500/30',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.querySelectorAll('.product-card') || [],
            { y: 80, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          );
        },
        once: true,
      });
      triggers.push(cardsTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-item inline-block text-[#1b4aa1] text-sm font-semibold tracking-wider uppercase mb-4">
            Solution Hubs
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Board applications first. Facer{' '}
            <span className="text-gradient">direction next.</span>
          </h2>
          <p className="animate-item text-lg text-muted-foreground">
            Select board categories for acoustic, insulation, gypsum and exterior
            board systems.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-fog rounded-3xl overflow-hidden border border-gray-100 hover:border-[#1b4aa1]/30 hover:shadow-[0_4px_20px_rgba(27,74,161,0.15)]-lg transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <product.icon className="w-6 h-6 text-[#1b4aa1]" />
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{product.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">
                    What We Review
                  </p>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-slate-800 hover:bg-[#1b4aa1] hover:text-white hover:border-[#1b4aa1] transition-all duration-300 group/btn"
                >
                  View Solution
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Comparison CTA */}
        <div className="mt-16 bg-slate-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00C2FF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Need references before selecting a facer?
              </h3>
              <p className="text-white/70">
                Request guide notes, brief documentation stages or an intake checklist
                before sample review.
              </p>
            </div>
            <button
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-8 py-4 bg-[#1b4aa1] hover:bg-industrial-dark text-white rounded-full font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(27,74,161,0.15)]-lg whitespace-nowrap"
            >
              Request Resources
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
