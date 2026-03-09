export type ConstitutionType = 
  | 'Gentleness'
  | 'Qi-Deficiency'
  | 'Yang-Deficiency'
  | 'Yin-Deficiency'
  | 'Phlegm-Dampness'
  | 'Damp-Heat'
  | 'Blood Stasis'
  | 'Qi-Depression'
  | 'Special Diathesis';

export type Cluster = 
  | 'Energy & Breathing'
  | 'Temperature & Sensation'
  | 'Digestion & Stools'
  | 'Head, Throat & Mouth'
  | 'Skin & Physical Appearance'
  | 'Emotional State'
  | 'Immunity & General';

export interface Question {
  id: number;
  text: string;
  type: ConstitutionType;
  isReverse?: boolean;
  cluster: Cluster;
  tooltip?: string;
}

export const CONSTITUTIONS: ConstitutionType[] = [
  'Gentleness',
  'Qi-Deficiency',
  'Yang-Deficiency',
  'Yin-Deficiency',
  'Phlegm-Dampness',
  'Damp-Heat',
  'Blood Stasis',
  'Qi-Depression',
  'Special Diathesis'
];

export const CCMQ_QUESTIONS: Question[] = [
  { id: 1, text: "Do you feel energetic?", type: 'Gentleness', isReverse: true, cluster: 'Energy & Breathing' },
  { id: 2, text: "Do you easily feel tired or fatigued?", type: 'Qi-Deficiency', cluster: 'Energy & Breathing' },
  { id: 3, text: "Do you have a weak voice or feel out of breath easily?", type: 'Qi-Deficiency', cluster: 'Energy & Breathing' },
  { id: 4, text: "Do you feel cold in your hands and feet?", type: 'Yang-Deficiency', cluster: 'Temperature & Sensation' },
  { id: 5, text: "Are you afraid of cold and prefer warm environments?", type: 'Yang-Deficiency', cluster: 'Temperature & Sensation' },
  { id: 6, text: "Do you experience dry mouth, throat, or lips?", type: 'Yin-Deficiency', cluster: 'Head, Throat & Mouth' },
  { id: 7, text: "Do you feel feverish in your palms and soles?", type: 'Yin-Deficiency', cluster: 'Temperature & Sensation', tooltip: "A sensation of heat specifically in the palms of your hands and soles of your feet." },
  { id: 8, text: "Do you feel a sense of heaviness in your body or limbs?", type: 'Phlegm-Dampness', cluster: 'Energy & Breathing' },
  { id: 9, text: "Do you have a sticky or sweet taste in your mouth?", type: 'Phlegm-Dampness', cluster: 'Head, Throat & Mouth' },
  { id: 10, text: "Do you have oily skin or a shiny face?", type: 'Damp-Heat', cluster: 'Skin & Physical Appearance' },
  { id: 11, text: "Are you prone to acne or sores?", type: 'Damp-Heat', cluster: 'Skin & Physical Appearance' },
  { id: 12, text: "Do you have dark circles under your eyes or dull skin?", type: 'Blood Stasis', cluster: 'Skin & Physical Appearance' },
  { id: 13, text: "Do you experience sharp, localized pain in your body?", type: 'Blood Stasis', cluster: 'Temperature & Sensation', tooltip: "Pain that feels like a needle prick and stays in one specific spot." },
  { id: 14, text: "Do you often feel depressed or emotionally down?", type: 'Qi-Depression', cluster: 'Emotional State' },
  { id: 15, text: "Are you prone to sighing frequently?", type: 'Qi-Depression', cluster: 'Emotional State' },
  { id: 16, text: "Do you have allergies (e.g., to pollen, dust, or food)?", type: 'Special Diathesis', cluster: 'Immunity & General' },
  { id: 17, text: "Do you sneeze frequently without catching a cold?", type: 'Special Diathesis', cluster: 'Head, Throat & Mouth' },
  { id: 18, text: "Do you sweat easily even with little exertion?", type: 'Qi-Deficiency', cluster: 'Temperature & Sensation' },
  { id: 19, text: "Do you feel dizzy or lightheaded when standing up?", type: 'Qi-Deficiency', cluster: 'Head, Throat & Mouth', tooltip: "A sudden feeling of faintness or spinning when you rise from sitting or lying down." },
  { id: 20, text: "Do you prefer hot food and drinks?", type: 'Yang-Deficiency', cluster: 'Digestion & Stools' },
  { id: 21, text: "Do you experience discomfort after eating cold food?", type: 'Yang-Deficiency', cluster: 'Digestion & Stools' },
  { id: 22, text: "Do you have night sweats (sweating while asleep)?", type: 'Yin-Deficiency', cluster: 'Temperature & Sensation', tooltip: "Waking up to find your sleepwear or bedding drenched in sweat, not related to room temperature." },
  { id: 23, text: "Do you often feel thirsty and want to drink water?", type: 'Yin-Deficiency', cluster: 'Head, Throat & Mouth' },
  { id: 24, text: "Do you feel bloated or have a distended abdomen?", type: 'Phlegm-Dampness', cluster: 'Digestion & Stools' },
  { id: 25, text: "Do you have excess phlegm or mucus in your throat?", type: 'Phlegm-Dampness', cluster: 'Head, Throat & Mouth' },
  { id: 26, text: "Do you have a bitter taste in your mouth?", type: 'Damp-Heat', cluster: 'Head, Throat & Mouth' },
  { id: 27, text: "Do you sleep well and wake up feeling refreshed?", type: 'Gentleness', isReverse: true, cluster: 'Energy & Breathing' },
  { id: 28, text: "Do you have a dry or hard stool?", type: 'Damp-Heat', cluster: 'Digestion & Stools' },
  { id: 29, text: "Do you easily get bruises on your skin?", type: 'Blood Stasis', cluster: 'Skin & Physical Appearance' },
  { id: 30, text: "Do you have purple or dark spots on your skin or tongue?", type: 'Blood Stasis', cluster: 'Skin & Physical Appearance' },
  { id: 31, text: "Do you feel anxious or nervous easily?", type: 'Qi-Depression', cluster: 'Emotional State' },
  { id: 32, text: "Do you feel a lump or tightness in your throat?", type: 'Qi-Depression', cluster: 'Head, Throat & Mouth', tooltip: "A sensation of something stuck in the throat that cannot be swallowed or coughed up." },
  { id: 33, text: "Do you have asthma or wheezing?", type: 'Special Diathesis', cluster: 'Energy & Breathing' },
  { id: 34, text: "Do you easily get hives or itchy skin?", type: 'Special Diathesis', cluster: 'Skin & Physical Appearance' },
  { id: 35, text: "Are you prone to catching colds?", type: 'Qi-Deficiency', cluster: 'Immunity & General' },
  { id: 36, text: "Does your heart palpitate or beat fast easily?", type: 'Qi-Deficiency', cluster: 'Energy & Breathing', tooltip: "Feeling like your heart is thumping, racing, or skipping a beat even when resting." },
  { id: 37, text: "Do you have a pale complexion?", type: 'Yang-Deficiency', cluster: 'Skin & Physical Appearance' },
  { id: 38, text: "Do you urinate frequently, especially at night?", type: 'Yang-Deficiency', cluster: 'Digestion & Stools' },
  { id: 39, text: "Do you have dry eyes or poor vision at night?", type: 'Yin-Deficiency', cluster: 'Head, Throat & Mouth' },
  { id: 40, text: "Do you have a red face or flushed cheeks?", type: 'Yin-Deficiency', cluster: 'Skin & Physical Appearance' },
  { id: 41, text: "Do you feel sluggish or heavy-headed?", type: 'Phlegm-Dampness', cluster: 'Head, Throat & Mouth' },
  { id: 42, text: "Do you have a thick, greasy tongue coating?", type: 'Phlegm-Dampness', cluster: 'Head, Throat & Mouth', tooltip: "A coating on the tongue that looks like a layer of oil or cottage cheese." },
  { id: 43, text: "Do you feel irritable or easily angered?", type: 'Damp-Heat', cluster: 'Emotional State' },
  { id: 44, text: "Do you have a heavy or sluggish feeling in your body?", type: 'Damp-Heat', cluster: 'Energy & Breathing' },
  { id: 45, text: "Do you have varicose veins or visible dark veins?", type: 'Blood Stasis', cluster: 'Skin & Physical Appearance' },
  { id: 46, text: "Do you experience numbness or tingling in your limbs?", type: 'Blood Stasis', cluster: 'Temperature & Sensation' },
  { id: 47, text: "Do you overthink or worry excessively?", type: 'Qi-Depression', cluster: 'Emotional State' },
  { id: 48, text: "Do you have a poor appetite or indigestion?", type: 'Qi-Depression', cluster: 'Digestion & Stools' },
  { id: 49, text: "Are you sensitive to certain medications or smells?", type: 'Special Diathesis', cluster: 'Immunity & General' },
  { id: 50, text: "Do you have a stuffy nose or nasal congestion?", type: 'Special Diathesis', cluster: 'Head, Throat & Mouth' },
  { id: 51, text: "Do you feel weak or lack strength in your muscles?", type: 'Qi-Deficiency', cluster: 'Energy & Breathing' },
  { id: 52, text: "Are you generally in good spirits and adaptable?", type: 'Gentleness', isReverse: true, cluster: 'Emotional State' },
  { id: 53, text: "Do you have a healthy appetite and good digestion?", type: 'Gentleness', isReverse: true, cluster: 'Digestion & Stools' },
  { id: 54, text: "Do you have cold pain in your back or knees?", type: 'Yang-Deficiency', cluster: 'Temperature & Sensation' },
  { id: 55, text: "Do you experience hot flashes?", type: 'Yin-Deficiency', cluster: 'Temperature & Sensation', tooltip: "A sudden feeling of intense warmth, usually over the face, neck, and chest." },
  { id: 56, text: "Do you have a soft, flabby body type?", type: 'Phlegm-Dampness', cluster: 'Skin & Physical Appearance' },
  { id: 57, text: "Do you have strong body odor or bad breath?", type: 'Damp-Heat', cluster: 'Head, Throat & Mouth' },
  { id: 58, text: "Do you have dark or purple lips?", type: 'Blood Stasis', cluster: 'Skin & Physical Appearance' },
  { id: 59, text: "Do you feel a sense of fullness in your chest or ribs?", type: 'Qi-Depression', cluster: 'Energy & Breathing' },
  { id: 60, text: "Do you have unexplained skin rashes or eczema?", type: 'Special Diathesis', cluster: 'Skin & Physical Appearance' }
];

// Ensure we have exactly 60 questions
if (CCMQ_QUESTIONS.length !== 60) {
  console.warn(`CCMQ_QUESTIONS has ${CCMQ_QUESTIONS.length} items instead of 60.`);
}
