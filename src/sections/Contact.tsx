import { useEffect, useRef, useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const applicationFields = [
  'Acoustic Ceiling/Wall Panels',
  'Insulation Systems',
  'Gypsum Board',
  'Roofing Membranes',
  'Other',
];

const coreMaterials = [
  'Glass Wool',
  'Rock Wool',
  'PIR/PUR Foam',
  'Gypsum',
  'Calcium Silicate',
  'Other',
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [applicationField, setApplicationField] = useState('');
  const [coreMaterial, setCoreMaterial] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const scrollFormIntoView = () => {
    if (!formRef.current) return;
    const top = Math.max(formRef.current.getBoundingClientRect().top + window.scrollY - 96, 0);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleApplicationFieldChange = (value: string) => {
    setApplicationField(value);
    if (value && coreMaterial) setFormError(null);
  };

  const handleCoreMaterialChange = (value: string) => {
    setCoreMaterial(value);
    if (applicationField && value) setFormError(null);
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

      // Form animation
      const formTrigger = ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(formTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!applicationField || !coreMaterial) {
      setFormError('Please select both an application field and core material before submitting.');
      scrollFormIntoView();
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    requestAnimationFrame(scrollFormIntoView);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-fog relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#0047AB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)" />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-item inline-block text-[#1b4aa1] text-sm font-semibold tracking-wider uppercase mb-4">
            Technical Documentation Access
          </span>
          <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Request the document level that fits{' '}
            <span className="text-gradient">your review stage.</span>
          </h2>
          <p className="animate-item text-lg text-muted-foreground">
            Tell us the application stage and documents you need. GRECHO will coordinate
            the right resource level for your technical review.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-12" aria-live="polite">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    Resource Request Received
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our team has received your review needs and will coordinate
                    the relevant document direction within 48 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setApplicationField('');
                      setCoreMaterial('');
                      setFormError(null);
                      setIsSubmitted(false);
                    }}
                    variant="outline"
                    className="border-[#1b4aa1] text-[#1b4aa1] hover:bg-[#1b4aa1] hover:text-white"
                  >
                    Request Another Resource
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label htmlFor="company-name" className="text-sm font-medium text-slate-800">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="company-name"
                        required
                        placeholder="Your company name"
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 transition-all duration-300 ${
                          focusedField === 'company' ? 'shadow-[0_4px_20px_rgba(27,74,161,0.15)]' : ''
                        }`}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                      <label htmlFor="contact-person" className="text-sm font-medium text-slate-800">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="contact-person"
                        required
                        placeholder="Full name"
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 transition-all duration-300 ${
                          focusedField === 'name' ? 'shadow-[0_4px_20px_rgba(27,74,161,0.15)]' : ''
                        }`}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email-address" className="text-sm font-medium text-slate-800">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email-address"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 transition-all duration-300 ${
                          focusedField === 'email' ? 'shadow-[0_4px_20px_rgba(27,74,161,0.15)]' : ''
                        }`}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone-number" className="text-sm font-medium text-slate-800">
                        Phone Number
                      </label>
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 transition-all duration-300 ${
                          focusedField === 'phone' ? 'shadow-[0_4px_20px_rgba(27,74,161,0.15)]' : ''
                        }`}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Application Field */}
                    <div className="space-y-2">
                      <label htmlFor="application-field" className="text-sm font-medium text-slate-800">
                        Application Field <span className="text-red-500">*</span>
                      </label>
                      <Select value={applicationField} onValueChange={handleApplicationFieldChange} required>
                        <SelectTrigger
                          id="application-field"
                          aria-label="Application field"
                          aria-invalid={Boolean(formError && !applicationField)}
                          className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 ${
                            formError && !applicationField ? 'border-red-300' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select application" />
                        </SelectTrigger>
                        <SelectContent>
                          {applicationFields.map((field) => (
                            <SelectItem key={field} value={field.toLowerCase().replace(/\s+/g, '-')}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Core Material */}
                    <div className="space-y-2">
                      <label htmlFor="core-material" className="text-sm font-medium text-slate-800">
                        Core Material <span className="text-red-500">*</span>
                      </label>
                      <Select value={coreMaterial} onValueChange={handleCoreMaterialChange} required>
                        <SelectTrigger
                          id="core-material"
                          aria-label="Core material"
                          aria-invalid={Boolean(formError && !coreMaterial)}
                          className={`h-12 rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 ${
                            formError && !coreMaterial ? 'border-red-300' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          {coreMaterials.map((material) => (
                            <SelectItem key={material} value={material.toLowerCase().replace(/\s+/g, '-')}>
                              {material}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Current Challenges */}
                  <div className="space-y-2">
                    <label htmlFor="current-challenges" className="text-sm font-medium text-slate-800">
                      Document Level & Review Needs
                    </label>
                    <Textarea
                      id="current-challenges"
                      placeholder="Tell us whether you need a product brief, color TDS, selected marketing TDS, full TDS or test report coordination..."
                      rows={5}
                      className={`rounded-xl border-gray-200 focus:border-[#1b4aa1] focus:ring-industrial-blue/20 resize-none transition-all duration-300 ${
                        focusedField === 'challenges' ? 'shadow-[0_4px_20px_rgba(27,74,161,0.15)]' : ''
                      }`}
                      onFocus={() => setFocusedField('challenges')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {formError ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                      {formError}
                    </div>
                  ) : null}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-[#1b4aa1] hover:bg-industrial-dark text-white rounded-xl text-base font-medium transition-all duration-300 hover:shadow-[0_4px_20px_rgba(27,74,161,0.15)]-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Request Resource
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We will use your details only to coordinate this technical resource request.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Contact */}
            <div className="bg-slate-800 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Document Request Support</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Email</p>
                    <a
                      href="mailto:info@grechofiberglass.com"
                      className="text-white hover:text-electric-blue transition-colors"
                    >
                      info@grechofiberglass.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Phone</p>
                    <a
                      href="tel:+8618677188374"
                      className="text-white hover:text-electric-blue transition-colors"
                    >
                      +86 186 7718 8374
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Address</p>
                    <p className="text-white">
                      Nanning, Guangxi, China
                      <br />
                      <span className="text-white/60">Postcode: 530000</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Resource Coordination</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our technical team coordinates application and document requests within
                <span className="text-[#1b4aa1] font-semibold"> 48 hours</span>.
                For urgent matters, please call us directly.
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-[#1b4aa1]/5 rounded-3xl p-8 border border-[#1b4aa1]/10">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-slate-800 font-medium">9:00 - 18:00 (GMT+8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-slate-800 font-medium">9:00 - 12:00 (GMT+8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-slate-800 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
