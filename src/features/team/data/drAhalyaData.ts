export interface TreatmentStep {
  step: number;
  title: string;
  category: 'Diagnostic Foundation' | 'Therapeutic Prescription' | 'Integrative Wellness';
  description: string;
  focus: string;
  principles: string[];
}

export interface AreaOfInterest {
  title: string;
  desc: string;
}

export interface TrainingItem {
  degree: string;
  institution: string;
  badge: string;
}

export const DR_AHALYA_DATA = {
  name: 'Dr. Ahalya T.S.',
  role: 'Ayurveda & Wellness Consultant',
  degrees: 'BAMS, YIC, CSAMT',
  image: 'https://res.cloudinary.com/liccrmic/image/upload/v1792910336/athalya-cmprsd.jpg',
  tagline: 'Integrating the wisdom of Ayurveda with the science of holistic well-being.',
  shortIntroTitle: 'Rediscover balance. Embrace holistic well-being.',
  shortIntro:
    'Rooted in the timeless wisdom of Ayurveda and enriched by yoga and meditation, my approach focuses on personalized wellness, mindful living, and the harmonious connection between body and mind. Supporting your journey towards a healthier, more balanced life.',
  aboutBio: [
    'I am Dr. Ahalya T.S., an Ayurveda & Wellness Consultant with a Bachelor of Ayurvedic Medicine and Surgery (BAMS) degree, certified in Yoga (YIC) and Smriti Meditation (CSAMT), striving to support individuals in achieving better health through a balanced, personalized, and compassionate approach.',
    'My practice is rooted in the fundamental principles of Ayurveda, including Tridoshas, Panchamahabhutas, and Agni. I believe that well-being extends beyond physical health and encompasses mental, emotional, and lifestyle factors. My approach emphasizes Ayurvedic healthcare, individualized dietary guidance, preventive care, yoga, meditation, and mind-body wellness.',
  ],
  philosophyOfCare:
    'I believe that meaningful healthcare begins with understanding each individual as a whole. By drawing upon Ayurvedic principles, yoga, meditation, lifestyle guidance, and compassionate patient counselling, I aim to encourage a more mindful and informed approach to health. My goal is to help individuals understand their health needs, adopt healthier daily habits, and work towards sustainable well-being through a personalized and holistic perspective.',
  vision:
    'To promote holistic well-being by bringing together the enduring wisdom of Ayurveda, the practices of yoga and meditation, and a compassionate, patient-centred approach to healthcare.',
  areasOfInterest: [
    {
      title: 'Metabolic Health',
      desc: 'Prameha, Agni balancing, and sustainable metabolic rejuvenation.',
    },
    {
      title: "Women's Health",
      desc: 'Hormonal harmony, cyclical balance, and holistic female wellness.',
    },
    {
      title: 'Ayurvedic Psychology',
      desc: 'Satvavajaya Chikitsa, resolving subconscious stress and emotional knots.',
    },
    {
      title: 'Patient Counselling',
      desc: 'Empathetic listening, mindful lifestyle orientation, and habit transformation.',
    },
    {
      title: 'Holistic Wellness',
      desc: 'Preventive healthcare, Swasthavritta regimens, and vitality.',
    },
  ] as AreaOfInterest[],
  educationAndTraining: [
    {
      degree: 'BAMS (Bachelor of Ayurvedic Medicine & Surgery)',
      institution: "Alva's Ayurvedic Medical College, Karnataka",
      badge: 'Core Clinical Degree',
    },
    {
      degree: 'YIC (Yoga Instructor Course)',
      institution: 'S-VYASA Yoga University, Bengaluru',
      badge: 'Yoga Science',
    },
    {
      degree: 'CSAMT (Course in Smriti Ayurveda Meditation Therapy)',
      institution: 'Classical Smriti Meditation Center',
      badge: 'Mind Therapy',
    },
  ] as TrainingItem[],
  treatmentSteps: [
    {
      step: 1,
      title: 'Prakriti Assessment',
      category: 'Diagnostic Foundation',
      description:
        "Understanding the individual's inherent constitution and characteristic physical, physiological, and psychological tendencies to support personalized healthcare planning.",
      focus: 'Constitutional Blueprint',
      principles: ['Body frame & metabolism', 'Psychological tendencies', 'Genetic baseline'],
    },
    {
      step: 2,
      title: 'Dosha Analysis',
      category: 'Diagnostic Foundation',
      description:
        "Assessing the status of Vata, Pitta, and Kapha to understand the nature of the current imbalance in relation to the individual's Prakriti and presenting condition.",
      focus: 'Bio-Energy Mapping',
      principles: ['Vata, Pitta, Kapha status', 'Site of vitiation', 'Vikriti differentiation'],
    },
    {
      step: 3,
      title: 'Dhatu, Mala & Samprapti Assessment',
      category: 'Diagnostic Foundation',
      description:
        'Evaluating the relevant Dhatus (body tissues) and Malas (bodily waste products), along with the Ayurvedic understanding of Samprapti (disease pathogenesis), to develop a comprehensive picture of the patient’s condition.',
      focus: 'Tissue & Pathology Path',
      principles: ['7 Dhatus health', 'Waste elimination efficiency', 'Samprapti trajectory'],
    },
    {
      step: 4,
      title: 'Agni and Ama Assessment',
      category: 'Diagnostic Foundation',
      description:
        'Assessing Agni (digestive and metabolic capacity) and identifying Ayurvedic features associated with Ama, where relevant, as part of the overall clinical evaluation.',
      focus: 'Metabolic & Toxic Load',
      principles: ['Digestive fire status', 'Ama accumulation screening', 'Cellular absorption'],
    },
    {
      step: 5,
      title: 'Individualized Treatment Planning',
      category: 'Therapeutic Prescription',
      description:
        'Developing an individualized treatment plan based on the patient’s condition, disease stage, Prakriti, Dosha status, Agni, and strength (Bala), while considering the patient’s specific needs and overall health status.',
      focus: 'Customized Protocol',
      principles: ['Stage-specific therapy', 'Vital strength (Bala)', 'Personalized goals'],
    },
    {
      step: 6,
      title: 'Lifestyle Management',
      category: 'Therapeutic Prescription',
      description:
        'Providing appropriate guidance on daily and seasonal regimens (Dinacharya and Ritucharya), sleep hygiene, physical activity, stress management, and other sustainable lifestyle practices.',
      focus: 'Circadian Living',
      principles: ['Dinacharya daily flow', 'Ritucharya seasonal care', 'Sleep hygiene & stress'],
    },
    {
      step: 7,
      title: 'Personalized Dietary Guidance',
      category: 'Therapeutic Prescription',
      description:
        'Recommending dietary practices according to the individual’s Prakriti, current Dosha imbalance, digestive capacity, presenting condition, nutritional needs, and personal circumstances.',
      focus: 'Pathya Ahara',
      principles: ['Shad-Rasa balance', 'Agni-compatible foods', 'Healing culinary herbs'],
    },
    {
      step: 8,
      title: 'Ayurvedic Medicines & Therapies',
      category: 'Therapeutic Prescription',
      description:
        'Considering appropriate Ayurvedic medicines and external therapies, where indicated, based on the clinical assessment and relevant Ayurvedic principles. Treatment selection takes into account individual suitability, safety, potential interactions, and the need for monitoring.',
      focus: 'Classical Pharmacotherapy',
      principles: ['Classical herbal formulations', 'External treatments', 'Safety & drug interaction monitoring'],
    },
    {
      step: 9,
      title: 'Yoga and Mind–Body Practices',
      category: 'Integrative Wellness',
      description:
        'Integrating suitable yoga postures (Asanas), breathing practices (Pranayama), and meditation, where appropriate, to support physical activity, mental well-being, stress management, and sustainable lifestyle changes.',
      focus: 'Psychosomatic Harmony',
      principles: ['Tailored Asanas', 'Pranayama regulation', 'Mindfulness & Meditation'],
    },
    {
      step: 10,
      title: 'Follow-Up and Reassessment',
      category: 'Integrative Wellness',
      description:
        'Monitoring the patient’s progress, evaluating their response and tolerance to the treatment plan, reassessing the presenting concerns, and making appropriate modifications when necessary. Referral for further medical evaluation is considered whenever clinically indicated.',
      focus: 'Care Continuity',
      principles: ['Progress evaluation', 'Dynamic dosage adjustment', 'Integrative medical referral'],
    },
  ] as TreatmentStep[],
};
