"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, Rocket, ArrowRight, ChevronRight, Phone, Mail, MessageCircle, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import DemoRequestModal from "@/components/demo-request-modal";

export default function IntakeExplanationSection() {
    const { language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const steps = [
        {
            icon: Calendar,
            title: language === 'nl' ? '30 min kennismaken' : '30 min intro call',
            description: language === 'nl'
                ? 'Gratis en vrijblijvend. We bespreken je uitdaging en of een digitale medewerker past.'
                : 'Free and no obligation. We discuss your challenge and if a digital employee fits.'
        },
        {
            icon: FileText,
            title: language === 'nl' ? 'Voorstel vanuit mij' : 'My proposal to you',
            description: language === 'nl'
                ? 'Je krijgt een strak voorstel: welke agent, hoe lang het duurt, en wat het kost.'
                : 'You get a tight proposal: which agent, how long it takes, and what it costs.'
        },
        {
            icon: Check,
            title: language === 'nl' ? '1 verdiepingssessie' : '1 deep-dive session',
            description: language === 'nl'
                ? 'We duiken in je processen, data en systemen. Hierna weet ik precies wat ik moet bouwen.'
                : 'We dive into your processes, data and systems. After this I know exactly what to build.'
        },
        {
            icon: Rocket,
            title: language === 'nl' ? 'Bouwen & overdragen' : 'Build & handover',
            description: language === 'nl'
                ? 'Binnen 2-4 weken heb je werkende agents. Ik draag ze aan jullie over. Geen terugkerende kosten.'
                : 'Within 2-4 weeks you have working agents. I hand them over to you. No recurring costs.'
        }
    ];

    return (
        <section className="py-10 sm:py-16 bg-background relative overflow-hidden" id="intake">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {language === 'nl' ? 'Hoe werkt het?' : 'How does it work?'}
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-muted-foreground px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {language === 'nl'
                                ? 'Van kennismaking tot werkende agents in 4 stappen'
                                : 'From introduction to working agents in 4 steps'}
                        </motion.p>
                    </div>

                    {/* Steps with Progress Bar */}
                    <div className="relative mb-32">
                        {/* Progress bar container */}
                        <div className="absolute top-[60px] left-0 right-0 h-1 bg-[#e67e22]/20 hidden md:block">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            />
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 relative">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {/* Step number badge - centered at top */}
                                        <div className="flex justify-center mb-6">
                                            <motion.div
                                                className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-lg z-10 relative"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                                            >
                                                {index + 1}
                                            </motion.div>
                                        </div>

                                        {/* Card */}
                                        <div className="bg-card border border-border rounded-xl p-6 h-full text-center">
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                                                <Icon className="h-7 w-7 text-primary" />
                                            </div>

                                            <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clean CTA Section */}
                    <motion.div
                        id="ready-to-start"
                        className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                            {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to start?'}
                        </h3>

                        <p className="text-base sm:text-lg text-muted-foreground mb-8">
                            {language === 'nl'
                                ? '30 minuten. Gratis. Geen verplichtingen.'
                                : '30 minutes. Free. No commitments.'}
                        </p>

                        {/* Primary CTA */}
                        <div className="mb-6 flex justify-center">
                            <Button
                                size="lg"
                                asChild
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <a
                                    href="https://calendly.com/quotum-consulting/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    {language === 'nl' ? 'Plan een gesprek' : 'Schedule a call'}
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* Simple reassurance */}
                        <p className="text-sm text-muted-foreground">
                            {language === 'nl'
                                ? 'Geen verplichtingen. Geen verborgen kosten.'
                                : 'No obligations. No hidden costs.'}
                        </p>

                        {/* Contact Accordion */}
                        <div className="max-w-sm mx-auto">
                            <button
                                onClick={() => setShowContact(!showContact)}
                                className="flex items-center justify-center gap-2 text-foreground/70 hover:text-foreground transition-colors mx-auto group mb-4"
                            >
                                <span className="text-base">{language === 'nl' ? 'Of neem direct contact op' : 'Or contact directly'}</span>
                                <ChevronRight
                                    className={`h-5 w-5 transition-transform ${showContact ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {/* Accordion content */}
                            {showContact && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#4a2c2a]/80 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-[#4a2c2a]/40"
                                >
                                    <a
                                        href="tel:+31640446732"
                                        className="flex items-center gap-3 p-4 bg-[#4a2c2a]/60 rounded-lg hover:bg-[#4a2c2a]/70 transition-colors text-base"
                                    >
                                        <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                                        <span className="text-[#fdf2e9] font-medium">06-4044 6732</span>
                                    </a>
                                    <a
                                        href="mailto:robin.bril@gmail.com"
                                        className="flex items-center gap-3 p-4 bg-[#4a2c2a]/60 rounded-lg hover:bg-[#4a2c2a]/70 transition-colors text-base"
                                    >
                                        <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                                        <span className="text-[#fdf2e9] font-medium">robin.bril@gmail.com</span>
                                    </a>
                                    <a
                                        href="https://wa.me/31640446732"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-[#4a2c2a]/60 rounded-lg hover:bg-[#4a2c2a]/70 transition-colors text-base"
                                    >
                                        <MessageCircle className="h-5 w-5 text-orange-400 flex-shrink-0" />
                                        <span className="text-[#fdf2e9] font-medium">WhatsApp</span>
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>


            {/* Demo Request Modal */}
            <DemoRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
