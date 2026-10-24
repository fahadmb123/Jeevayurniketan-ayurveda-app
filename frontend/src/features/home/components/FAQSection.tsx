import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { staggerContainerVariants, fadeUpVariants, standardViewport } from '@/shared/lib/animations';
import './FAQSection.css';


const faqItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 65,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: (i % 3) * 0.1,
      ease: [0.16, 1, 0.3, 1], // Slow, elegant glide into place
    },
  }),
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'medication',
    question: 'Can Ayurvedic psychotherapy help if I am already taking psychiatric medications?',
    answer: 'Yes, absolutely. Our senior Ayurvedic doctors and psychologists work with complete clinical safety alongside your existing medical prescriptions. We never advise abruptly stopping conventional medications; rather, our treatments naturally restore neurotransmitter balance, calm the nervous system, and improve emotional resilience. Over time, many patients are able to safely taper off under their physician’s supervision.',
    category: 'Safety & Medicine',
  },
  {
    id: 'smriti-difference',
    question: 'What is Smriti Meditation and how does it differ from ordinary meditation?',
    answer: 'Traditional meditation usually involves passive observation or concentration on the breath. In contrast, Smriti Meditation—pioneered by Dr. K.V. Dilipkumar over 20+ years of research—is an interactive, guided clinical recall therapy. The doctor gently guides your awareness into the subconscious memory layer to identify the exact unresolved emotional event (shock, grief, suppression) that initiated your physical or mental symptoms, and helps you reprocess and release it permanently.',
    category: 'Smriti Therapy',
  },
  {
    id: 'online-consult',
    question: 'Do you offer online video consultations for patients outside Kerala or abroad?',
    answer: 'Yes. We provide comprehensive one-on-one video consultations for patients across India and over 18 countries worldwide. Following your video consultation, our doctors prepare personalized treatment schedules, diet plans, guided meditation sessions, and courier authentic, GMP-certified classical Ayurvedic medicines directly to your doorstep.',
    category: 'Consultations',
  },
  {
    id: 'conditions-treated',
    question: 'What conditions are treated with high success at Jeevayurniketan?',
    answer: 'We specialize in psychosomatic and emotional conditions, including chronic anxiety, depression, panic disorders, insomnia, migraine, stress-induced IBS, autoimmune skin conditions (psoriasis, eczema, urticaria), chronic fatigue, marital stress, and trauma recovery, along with classical Panchakarma treatments for spine, joint, and metabolic health.',
    category: 'Conditions',
  },
  {
    id: 'treatment-duration',
    question: 'How soon can I expect to experience relief?',
    answer: 'Most patients report a tangible sense of lightness, emotional relief, and improved sleep quality within the first 7 to 14 days of beginning the protocol. Chronic conditions typically follow a 3-month to 6-month comprehensive rejuvenation plan for deep, lasting cellular and psychological healing.',
    category: 'Timeline',
  },
];

export const FAQSection: React.FC = React.memo(() => {
  const [openId, setOpenId] = useState<string | null>('medication');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <motion.div
          className="faq-header text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <motion.div className="section-pill" variants={fadeUpVariants}>
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </motion.div>
          <motion.h2 className="faq-title" variants={fadeUpVariants}>
            Answers To Help You <span className="text-primary-green">Choose With Confidence</span>
          </motion.h2>
          <motion.p className="faq-subtitle" variants={fadeUpVariants}>
            Have questions about Ayurvedic psychotherapy, Smriti Meditation, or consultations? Here are clear answers from our clinical team.
          </motion.p>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div 
                key={faq.id} 
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                variants={faqItemVariants}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-wrap">
                    <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="faq-support-strip"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <div className="faq-support-text">
            <h4>Have a specific medical query or condition?</h4>
            <p>Our Ayurvedic doctors are available to assist you with free initial guidance.</p>
          </div>
          <a
            href="https://wa.me/918590807138?text=Hello,%20I%20am%20interested%20in%20your%20Ayurveda%20and%20Yoga%20treatments.%20Could%20you%20please%20share%20more%20details"
            target="_blank"
            rel="noopener noreferrer"
            className="faq-whatsapp-btn"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';
