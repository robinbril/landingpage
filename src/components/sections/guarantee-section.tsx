"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp, Clock, Target, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export default function GuaranteeSection() {
    const { language } = useLanguage();
    const isNL = language === 'nl';

    const guarantees = [
        {
            icon: Target,
            text: isNL
                ? 'We bouwen alleen agents die binnen 1 jaar zijn terugverdiend'
                : 'We only build agents that pay for themselves within 1 year',
        },
        {
            icon: TrendingUp,
            text: isNL
                ? 'Direct meetbaar: kostenbesparing, opgeloste bottlenecks, tijdsbesparing'
                : 'Directly measurable: cost savings, solved bottlenecks, time savings',
        },
        {
            icon: FileText,
            text: isNL
                ? 'Gratis voorstel wat er moet gebeuren. Je betaalt pas bij de verdiepingssessie'
                : 'Free proposal of what needs to happen. You only pay at the deep-dive session',
        },
        {
            icon: Clock,
            text: isNL
                ? 'Binnen 4 uur persoonlijke reactie van Robin'
                : 'Personal response from Robin within 4 hours',
        },
    ];

    return (
        <section className="py-16 sm:py-20 bg-[#4a2c2a]" id="guarantee">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#e67e22] mb-3">
                            {isNL ? 'Onze belofte' : 'Our promise'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#fdf2e9] mb-3">
                            {isNL ? 'Alleen bouwen als het lucratief is' : 'Only build when it\'s lucrative'}
                        </h2>
                        <p className="text-base sm:text-lg text-[#fdf2e9]/60">
                            {isNL
                                ? 'Wij nemen het risico. Jij ziet eerst wat het oplevert.'
                                : 'We take the risk. You see the returns first.'}
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {guarantees.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-4 bg-[#fdf2e9]/5 border border-[#fdf2e9]/10 rounded-xl p-5"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + index * 0.08 }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e67e22]/20 flex items-center justify-center">
                                        <Icon className="h-5 w-5 text-[#e67e22]" />
                                    </div>
                                    <p className="text-base sm:text-lg text-[#fdf2e9]/90 leading-relaxed pt-1.5">
                                        {item.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
