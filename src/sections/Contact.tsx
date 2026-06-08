import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Send,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const requestRoutes = [
  {
    icon: PackageCheck,
    title: 'Request a Sample',
    description: 'Start sample direction from application type and board structure.',
  },
  {
    icon: FileText,
    title: 'Request Technical Review',
    description: 'Ask for the document level that fits your project stage.',
  },
];

const applicationFields = [
  'Acoustic Ceiling & Wall Systems',
  'Mineral Wool Insulation Boards',
  'Gypsum Board Systems',
  'PIR / PUR / ETICS Systems',
  'Other Board Application',
];

const coreMaterials = [
  'Glass Wool',
  'Rock Wool',
  'Gypsum',
  'PIR / PUR Foam',
  'ETICS / Exterior Board',
  'Other Core Material',
];

const initialFormState = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  applicationField: '',
  coreMaterial: '',
  reviewNeeds: '',
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [reviewType, setReviewType] = useState('sample');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      triggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              contentRef.current?.querySelectorAll('.contact-reveal') || [],
              { y: 34, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power3.out' }
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

  const updateField = (field: keyof typeof initialFormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (message) setMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage(null);
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setMessage(
      reviewType === 'sample'
        ? 'Sample request path received. GRECHO will coordinate the next review step.'
        : 'Technical review request received. GRECHO will route the suitable document level.'
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-[#f5f8f6] pb-16 pt-8 sm:pb-20 lg:pb-24">
      <div ref={contentRef} className="container-wide">
        <div className="contact-reveal overflow-hidden rounded-lg bg-[#1b4aa1] text-white shadow-2xl shadow-[#1b4aa1]/20">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#bfdbfe]">
                Start Your Next Project Review
              </p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Start your next fiberglass facer review with GRECHO.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                Whether you are evaluating acoustic boards, insulation systems, gypsum
                applications or exterior wall assemblies, GRECHO can help identify a
                fiberglass facer direction aligned with your project goals.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {requestRoutes.map((route) => {
                  const Icon = route.icon;
                  const isActive =
                    (reviewType === 'sample' && route.title.includes('Sample')) ||
                    (reviewType === 'technical' && route.title.includes('Technical'));

                  return (
                    <button
                      key={route.title}
                      type="button"
                      onClick={() => setReviewType(route.title.includes('Sample') ? 'sample' : 'technical')}
                      aria-pressed={isActive}
                      className={`rounded-lg border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-white/35 bg-white/[0.18] text-white'
                          : 'border-white/[0.12] bg-white/[0.08] text-white hover:border-white/25 hover:bg-white/[0.12]'
                      }`}
                    >
                      <Icon className="mb-5 h-5 w-5" />
                      <span className="block text-base font-bold">{route.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-white/70">
                        {route.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-lg bg-white p-5 text-slate-950 sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-semibold text-slate-950">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => updateField('companyName', event.target.value)}
                    placeholder="Your company name"
                    className="min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-person" className="text-sm font-semibold text-slate-950">
                    Contact Person
                  </label>
                  <input
                    id="contact-person"
                    type="text"
                    value={formData.contactPerson}
                    onChange={(event) => updateField('contactPerson', event.target.value)}
                    placeholder="Full name"
                    className="min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email-address" className="text-sm font-semibold text-slate-950">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="your@email.com"
                    className="min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone-number" className="text-sm font-semibold text-slate-950">
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="min-h-12 w-full rounded-lg border border-slate-200 px-4 text-base outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="application-field" className="text-sm font-semibold text-slate-950">
                    Application Field
                  </label>
                  <div className="relative">
                    <select
                      id="application-field"
                      value={formData.applicationField}
                      onChange={(event) => updateField('applicationField', event.target.value)}
                      className="min-h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-11 text-base text-slate-700 outline-none transition-all duration-300 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                    >
                      <option value="">Select application</option>
                      {applicationFields.map((field) => (
                        <option key={field} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="core-material" className="text-sm font-semibold text-slate-950">
                    Core Material
                  </label>
                  <div className="relative">
                    <select
                      id="core-material"
                      value={formData.coreMaterial}
                      onChange={(event) => updateField('coreMaterial', event.target.value)}
                      className="min-h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-11 text-base text-slate-700 outline-none transition-all duration-300 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                    >
                      <option value="">Select material</option>
                      {coreMaterials.map((material) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label htmlFor="review-needs" className="text-sm font-semibold text-slate-950">
                  Document Level & Review Needs
                </label>
                <textarea
                  id="review-needs"
                  value={formData.reviewNeeds}
                  onChange={(event) => updateField('reviewNeeds', event.target.value)}
                  placeholder="Tell us whether you need a product brief, color TDS, full TDS or test report coordination..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1b4aa1] focus:ring-4 focus:ring-[#1b4aa1]/10"
                />
              </div>

              {message ? (
                <p
                  className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
                    message.includes('received') ? 'bg-[#e8f0ff] text-[#1b4aa1]' : 'bg-red-50 text-red-700'
                  }`}
                  role="status"
                >
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#153a7f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Request Resource
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                We will use your details only to coordinate this technical resource request.
              </p>
            </form>
          </div>
        </div>

        <div className="contact-reveal mt-8 grid gap-4 md:grid-cols-3">
          <a
            href="mailto:info@grechofiberglass.com"
            className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1b4aa1]/25 hover:shadow-lg hover:shadow-slate-900/5"
          >
            <Mail className="mb-6 h-5 w-5 text-[#1b4aa1]" />
            <p className="text-sm font-bold text-slate-950">Email</p>
            <p className="mt-2 text-sm text-slate-600 group-hover:text-[#1b4aa1]">
              info@grechofiberglass.com
            </p>
          </a>
          <a
            href="tel:+8618677188374"
            className="group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1b4aa1]/25 hover:shadow-lg hover:shadow-slate-900/5"
          >
            <Phone className="mb-6 h-5 w-5 text-[#1b4aa1]" />
            <p className="text-sm font-bold text-slate-950">Phone</p>
            <p className="mt-2 text-sm text-slate-600 group-hover:text-[#1b4aa1]">
              +86 186 7718 8374
            </p>
          </a>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <MapPin className="mb-6 h-5 w-5 text-[#1b4aa1]" />
            <p className="text-sm font-bold text-slate-950">Location</p>
            <p className="mt-2 text-sm text-slate-600">Nanning, Guangxi, China</p>
          </div>
        </div>

        <div className="contact-reveal mt-8 flex flex-col gap-3 rounded-lg border border-[#1b4aa1]/20 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#1b4aa1]" />
            <p className="text-sm leading-relaxed text-slate-600">
              For faster routing, include board type, core material, intended application,
              target market and the document level you need.
            </p>
          </div>
          <a
            href="mailto:info@grechofiberglass.com"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1b4aa1] px-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#153a7f]"
          >
            Email GRECHO
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
