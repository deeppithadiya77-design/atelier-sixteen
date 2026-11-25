import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FORM_OPTIONS } from '../data/studioData';
import {
  buildWhatsAppUrl,
  STUDIO_CONTACT,
  submitConsultationLead,
} from '../config/leadFormConfig';
import { EDITORIAL_EASE, fadeUpVariant, VIEWPORT_CONFIG } from '../utils/motion';

const INITIAL_FORM = {
  projectType: '',
  city: '',
  areaSqFt: '',
  budgetRange: '',
  fullName: '',
  phone: '',
  email: '',
};

export default function ConsultationForm({ preselectedType = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM,
    projectType: preselectedType,
  }));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.projectType) {
        setError('Please select a project type to continue.');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.city.trim()) {
        setError('Please enter your city or site location.');
        return;
      }
      if (!formData.areaSqFt.trim()) {
        setError('Please enter or select an approximate area in sq. ft.');
        return;
      }
      if (!formData.budgetRange) {
        setError('Please select an estimated budget range.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone or WhatsApp number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await submitConsultationLead(formData);
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong sending your request. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setStep(1);
    setIsSubmitted(false);
    setError('');
  };

  return (
    <section
      id="consultation"
      className="bg-[#F6F4F0] text-[#141414] py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Editorial Column */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-5"
          >
            <p className="font-sans text-[11px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
              05 / Private Consultation
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight text-[#141414] sm:text-5xl">
              Begin a dialogue around your space.
            </h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-[1.85] text-[#7A7267] font-light">
              Share a few initial parameters about your site and vision. Our principal architects review every inquiry personally within two business days.
            </p>

            <div className="mt-10 border-t border-[#141414]/15 pt-8 space-y-5">
              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Direct Studio Desk
                </span>
                <a
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="mt-1 inline-block font-serif text-xl text-[#141414] hover:opacity-70 transition-opacity"
                >
                  {STUDIO_CONTACT.email}
                </a>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppUrl({})}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#141414] px-5 py-3 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#141414]/85"
                  >
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Direct WhatsApp
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>

                  <a
                    href={`tel:${STUDIO_CONTACT.phoneDisplay.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 border border-[#141414]/25 px-4 py-3 font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#141414] transition-colors hover:border-[#141414]"
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {STUDIO_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                {STUDIO_CONTACT.addresses.map((loc) => (
                  <div key={loc.label}>
                    <span className="block font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#7A7267]">
                      {loc.label}
                    </span>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-1.5 inline-flex items-start gap-1.5 font-sans text-xs leading-relaxed text-[#141414]/80 font-light hover:text-[#141414] transition-colors"
                    >
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7A7267] group-hover:text-[#141414] transition-colors" strokeWidth={1.5} />
                      <span className="underline underline-offset-4 decoration-[#141414]/20 group-hover:decoration-[#141414]/70 transition-colors">
                        {loc.line}
                      </span>
                    </a>
                  </div>
                ))}
              </div>

              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Studio Hours
                </span>
                <p className="mt-1 font-sans text-xs text-[#141414]/80">
                  {STUDIO_CONTACT.studioHours}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right 3-Step Interactive Form */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-7"
          >
            <div className="border border-[#141414]/15 bg-[#F6F4F0] p-6 sm:p-10 lg:p-12">
              {!isSubmitted ? (
                <>
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#141414]/15">
                    <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#7A7267]">
                      Step 0{step} / 03
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((num) => (
                        <span
                          key={num}
                          className={`h-[2px] w-8 transition-colors duration-300 ${
                            num <= step ? 'bg-[#141414]' : 'bg-[#141414]/15'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                          className="pt-8"
                        >
                          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141414]">
                            What type of space are we shaping?
                          </h3>
                          <p className="mt-2 font-sans text-xs text-[#7A7267]">
                            Select the typology that best describes your commission.
                          </p>

                          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {FORM_OPTIONS.projectTypes.map((type) => {
                              const selected = formData.projectType === type.id;
                              return (
                                <button
                                  key={type.id}
                                  type="button"
                                  onClick={() => updateField('projectType', type.id)}
                                  className={`cursor-pointer text-left border p-5 transition-all duration-300 ${
                                    selected
                                      ? 'border-[#141414] bg-[#141414] text-[#F6F4F0]'
                                      : 'border-[#141414]/20 bg-transparent text-[#141414] hover:border-[#141414]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-serif text-xl sm:text-2xl">
                                      {type.label}
                                    </span>
                                    <span
                                      className={`flex h-5 w-5 items-center justify-center border ${
                                        selected
                                          ? 'border-[#F6F4F0] bg-[#F6F4F0] text-[#141414]'
                                          : 'border-[#141414]/25'
                                      }`}
                                    >
                                      {selected && <Check className="h-3 w-3" strokeWidth={2} />}
                                    </span>
                                  </div>
                                  <p
                                    className={`mt-2 font-sans text-xs font-light ${
                                      selected ? 'text-[#F6F4F0]/75' : 'text-[#7A7267]'
                                    }`}
                                  >
                                    {type.note}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                          className="pt-8 space-y-7"
                        >
                          <div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141414]">
                              Location, scale & investment
                            </h3>
                            <p className="mt-2 font-sans text-xs text-[#7A7267]">
                              Helps us align the right studio team and timeline.
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="city-input"
                              className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]"
                            >
                              City / Site Location
                            </label>
                            <input
                              id="city-input"
                              type="text"
                              value={formData.city}
                              onChange={(e) => updateField('city', e.target.value)}
                              placeholder="e.g. Rajkot, Ahmedabad, Surat"
                              className="mt-2 w-full border-b border-[#141414]/25 bg-transparent py-3 font-sans text-sm text-[#141414] placeholder:text-[#7A7267]/60 focus:border-[#141414] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="area-input"
                              className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]"
                            >
                              Approximate Sq. Ft.
                            </label>
                            <input
                              id="area-input"
                              type="text"
                              value={formData.areaSqFt}
                              onChange={(e) => updateField('areaSqFt', e.target.value)}
                              placeholder="e.g. 2,800 sq. ft."
                              className="mt-2 w-full border-b border-[#141414]/25 bg-transparent py-3 font-sans text-sm text-[#141414] placeholder:text-[#7A7267]/60 focus:border-[#141414] focus:outline-none"
                            />
                            <div className="mt-3 flex flex-wrap gap-2">
                              {FORM_OPTIONS.areaPresets.map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => updateField('areaSqFt', preset)}
                                  className={`cursor-pointer border px-3 py-1 font-sans text-[10px] tracking-[0.14em] uppercase transition-colors ${
                                    formData.areaSqFt === preset
                                      ? 'border-[#141414] bg-[#141414] text-[#F6F4F0]'
                                      : 'border-[#141414]/20 text-[#7A7267] hover:border-[#141414]/50'
                                  }`}
                                >
                                  {preset} sq. ft.
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                              Estimated Budget Range
                            </span>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                              {FORM_OPTIONS.budgetRanges.map((range) => {
                                const selected = formData.budgetRange === range;
                                return (
                                  <button
                                    key={range}
                                    type="button"
                                    onClick={() => updateField('budgetRange', range)}
                                    className={`cursor-pointer border px-4 py-3 text-left font-sans text-xs transition-all ${
                                      selected
                                        ? 'border-[#141414] bg-[#141414] text-[#F6F4F0]'
                                        : 'border-[#141414]/20 text-[#141414] hover:border-[#141414]'
                                    }`}
                                  >
                                    {range}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                          className="pt-8 space-y-6"
                        >
                          <div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141414]">
                              Your contact details
                            </h3>
                            <p className="mt-2 font-sans text-xs text-[#7A7267]">
                              How may we reach you to schedule an introductory consultation?
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="name-input"
                              className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]"
                            >
                              Full Name
                            </label>
                            <input
                              id="name-input"
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => updateField('fullName', e.target.value)}
                              placeholder="Aarav Mehta"
                              className="mt-2 w-full border-b border-[#141414]/25 bg-transparent py-3 font-sans text-sm text-[#141414] placeholder:text-[#7A7267]/60 focus:border-[#141414] focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="phone-input"
                                className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]"
                              >
                                Phone / WhatsApp Number
                              </label>
                              <input
                                id="phone-input"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                placeholder="+91 87996 00000"
                                className="mt-2 w-full border-b border-[#141414]/25 bg-transparent py-3 font-sans text-sm text-[#141414] placeholder:text-[#7A7267]/60 focus:border-[#141414] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email-input"
                                className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]"
                              >
                                Email Address
                              </label>
                              <input
                                id="email-input"
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder="name@domain.com"
                                className="mt-2 w-full border-b border-[#141414]/25 bg-transparent py-3 font-sans text-sm text-[#141414] placeholder:text-[#7A7267]/60 focus:border-[#141414] focus:outline-none"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {error && (
                      <p className="mt-5 font-sans text-xs text-[#9E3B33]">{error}</p>
                    )}

                    {/* Navigation Actions */}
                    <div className="mt-10 flex items-center justify-between pt-6 border-t border-[#141414]/15">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setError('');
                            setStep((s) => s - 1);
                          }}
                          className="cursor-pointer inline-flex items-center gap-2 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#7A7267] hover:text-[#141414] transition-colors"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                          Back
                        </button>
                      ) : (
                        <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#7A7267]">
                          Confidential Inquiry
                        </span>
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="cursor-pointer inline-flex items-center gap-2.5 bg-[#141414] px-7 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#141414]/85"
                        >
                          Continue
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer inline-flex items-center gap-2.5 bg-[#141414] px-7 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#141414]/85 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Sending...' : 'Request Consultation'}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              ) : (
                /* Instant Confirmation State + Chat Directly on WhatsApp */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
                  className="py-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center border border-[#141414] bg-[#141414] text-[#F6F4F0]">
                    <Check className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <p className="mt-6 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#7A7267]">
                    Consultation Received
                  </p>
                  <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#141414]">
                    Thank you, {formData.fullName}.
                  </h3>
                  <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#7A7267] font-light">
                    We have recorded your inquiry for a <strong className="font-medium text-[#141414]">{formData.projectType}</strong> project in <strong className="font-medium text-[#141414]">{formData.city}</strong> ({formData.areaSqFt} sq. ft., {formData.budgetRange}). Our studio team will reach out shortly.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={buildWhatsAppUrl(formData)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#141414] px-6 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#141414]/85"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                      Chat directly on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer border border-[#141414]/25 px-5 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#141414] transition-colors hover:border-[#141414]"
                    >
                      New Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
