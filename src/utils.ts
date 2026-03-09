import { CCMQ_QUESTIONS, ConstitutionType, CONSTITUTIONS } from './questions';
import { TongueData } from './types';

export interface ScoreResult {
  type: ConstitutionType;
  score: number;
}

export function calculateScores(answers: Record<number, number>): ScoreResult[] {
  const scores: Record<ConstitutionType, { sum: number; count: number }> = {} as any;

  CONSTITUTIONS.forEach((type) => {
    scores[type] = { sum: 0, count: 0 };
  });

  CCMQ_QUESTIONS.forEach((q) => {
    let val = answers[q.id] || 3; // Default to 3 if somehow missing
    if (q.isReverse) {
      val = 6 - val;
    }
    scores[q.type].sum += val;
    scores[q.type].count += 1;
  });

  const results: ScoreResult[] = CONSTITUTIONS.map((type) => {
    const { sum, count } = scores[type];
    const adjustedScore = ((sum - count) / (count * 4)) * 100;
    return {
      type,
      score: Math.round(adjustedScore * 10) / 10, // Round to 1 decimal
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function getNCDRisks(primary: ConstitutionType, secondary: ConstitutionType) {
  const risks = new Set<string>();
  
  const checkRisk = (type: ConstitutionType) => {
    if (type === 'Phlegm-Dampness' || type === 'Damp-Heat') {
      risks.add('Metabolic Syndrome');
      risks.add('Type 2 Diabetes');
      risks.add('Hypertension');
    }
    if (type === 'Blood Stasis') {
      risks.add('Cardiovascular Issues');
    }
    if (type === 'Qi-Deficiency' || type === 'Yang-Deficiency') {
      risks.add('Chronic Fatigue Syndrome');
      risks.add('Immunodeficiency');
    }
    if (type === 'Yin-Deficiency') {
      risks.add('Hyperthyroidism');
      risks.add('Menopausal Syndrome');
    }
  };

  checkRisk(primary);
  checkRisk(secondary);

  return Array.from(risks);
}

export function getInterventions(primary: ConstitutionType, race: string) {
  const interventions: Record<string, { diet: string[]; exercise: string[]; lifestyle: string[] }> = {
    'Gentleness': {
      diet: ['Balanced diet with seasonal vegetables', 'Moderate portions', 'Regular meal times'],
      exercise: ['Brisk walking', 'Swimming', 'General fitness maintenance'],
      lifestyle: ['Maintain regular sleep schedule', 'Balanced work and rest', 'Positive mindset']
    },
    'Qi-Deficiency': {
      diet: ['Avoid cold and raw foods', 'Eat easily digestible foods'],
      exercise: ['Tai Chi', 'Gentle yoga', 'Avoid excessive sweating'],
      lifestyle: ['Ensure adequate sleep', 'Avoid overexertion', 'Keep warm']
    },
    'Yang-Deficiency': {
      diet: ['Avoid cold drinks completely', 'Consume warming foods'],
      exercise: ['Brisk walking in the sun', 'Baduanjin qigong', 'Avoid swimming in cold water'],
      lifestyle: ['Keep lower back and feet warm', 'Sunbathe regularly', 'Avoid damp environments']
    },
    'Yin-Deficiency': {
      diet: ['Avoid spicy and fried foods', 'Consume hydrating and nourishing foods'],
      exercise: ['Swimming', 'Tai Chi', 'Avoid intense cardio that causes heavy sweating'],
      lifestyle: ['Sleep before 11 PM', 'Avoid saunas', 'Practice meditation to calm the mind']
    },
    'Phlegm-Dampness': {
      diet: ['Avoid sweet, greasy, and heavy foods', 'Consume foods that promote diuresis'],
      exercise: ['Aerobic exercises (jogging, cycling)', 'Ball games', 'Gradually increase intensity'],
      lifestyle: ['Avoid damp living environments', 'Wear breathable clothing', 'Stay active']
    },
    'Damp-Heat': {
      diet: ['Avoid alcohol, spicy, and greasy foods', 'Consume cooling and damp-resolving foods'],
      exercise: ['High-intensity interval training (HIIT)', 'Swimming', 'Long-distance running'],
      lifestyle: ['Keep skin clean and dry', 'Avoid hot and humid environments', 'Regulate emotions']
    },
    'Blood Stasis': {
      diet: ['Avoid cold and greasy foods', 'Consume foods that promote circulation'],
      exercise: ['Tai Chi', 'Dance', 'Meridian stretching'],
      lifestyle: ['Avoid prolonged sitting', 'Promote blood circulation with warm baths', 'Manage stress']
    },
    'Qi-Depression': {
      diet: ['Avoid heavy and hard-to-digest foods', 'Consume aromatic foods'],
      exercise: ['Outdoor hiking', 'Group sports', 'Yoga'],
      lifestyle: ['Engage in social activities', 'Practice deep breathing', 'Cultivate hobbies']
    },
    'Special Diathesis': {
      diet: ['Mild, non-allergenic foods', 'Avoid seafood and spicy foods if allergic'],
      exercise: ['Gentle indoor exercises', 'Avoid exercising in high pollen or polluted areas'],
      lifestyle: ['Keep living space dust-free', 'Avoid known allergens', 'Maintain a clean environment']
    }
  };

  const base = interventions[primary] || interventions['Gentleness'];
  let tailoredDiet = [...base.diet];

  // Tailor diet based on race and local grocery availability
  if (primary === 'Damp-Heat') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Clear broth Soto Ayam (use less oil, add more celery and coriander)');
      tailoredDiet.push('Recipe: Ulam (traditional salad) with pegaga and sambal belacan (in moderation)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Moong Dal (green gram) soup cooked with turmeric and cumin, minimal ghee');
      tailoredDiet.push('Recipe: Bitter gourd poriyal (stir-fry with minimal oil)');
    } else {
      tailoredDiet.push('Recipe: Mung bean and barley soup (boil 50g mung beans and 30g barley until soft, minimal sugar)');
      tailoredDiet.push('Recipe: Stir-fried lotus root with celery and wood ear mushroom');
    }
  } else if (primary === 'Phlegm-Dampness') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Asam Pedas fish (use stingray or mackerel, tamarind helps cut through dampness)');
      tailoredDiet.push('Recipe: Sup Sayur (clear vegetable soup with radish and carrots)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Rasam (tamarind and pepper soup, excellent for digestion and clearing phlegm)');
      tailoredDiet.push('Recipe: Radish sambar (use less dal and more radish)');
    } else {
      tailoredDiet.push('Recipe: Winter melon and pork rib soup (add ginger and coix seed/barley)');
      tailoredDiet.push('Recipe: Stir-fried white radish with dried shrimp');
    }
  } else if (primary === 'Qi-Deficiency') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Sup Ayam Kampung (free-range chicken soup with ginger and spices)');
      tailoredDiet.push('Recipe: Bubur Ayam (chicken porridge with ginger and spring onions)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Chicken rasam or mild chicken curry with turmeric and ginger');
      tailoredDiet.push('Recipe: Kitchari (basmati rice and mung dal cooked with warming spices)');
    } else {
      tailoredDiet.push('Recipe: Ginseng and chicken soup (double-boiled for 2 hours)');
      tailoredDiet.push('Recipe: Yam and red date porridge (nourishes Qi and spleen)');
    }
  } else if (primary === 'Yang-Deficiency') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Sup Kambing (mutton soup with warming spices like cloves, cinnamon, and star anise)');
      tailoredDiet.push('Recipe: Ginger tea (Teh Halia) to warm the body');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Mutton Chukka (dry mutton curry with black pepper and warming spices)');
      tailoredDiet.push('Recipe: Masala Chai (brewed with fresh ginger, cardamom, and cloves)');
    } else {
      tailoredDiet.push('Recipe: Mutton soup with ginger and angelica root (Dang Gui)');
      tailoredDiet.push('Recipe: Stir-fried chives with walnut and shrimp');
    }
  } else if (primary === 'Yin-Deficiency') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Bubur Kacang Hijau (mung bean porridge, use less coconut milk and sugar)');
      tailoredDiet.push('Recipe: Sayur Bayam (spinach soup with sweet potato)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Cucumber and yogurt raita (cooling and hydrating)');
      tailoredDiet.push('Recipe: Payasam (made with sago/tapioca pearls and milk, served cool)');
    } else {
      tailoredDiet.push('Recipe: Snow pear and white fungus sweet soup (double-boiled with rock sugar)');
      tailoredDiet.push('Recipe: Steamed egg with lily bulbs and goji berries');
    }
  } else if (primary === 'Blood Stasis') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Ikan Singgang (sour and clear fish soup with turmeric and galangal to promote circulation)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Tomato Rasam with extra garlic and black pepper');
    } else {
      tailoredDiet.push('Recipe: Black fungus and red date soup');
      tailoredDiet.push('Recipe: Hawthorn berry (Shan Zha) tea');
    }
  } else if (primary === 'Qi-Depression') {
    if (race === 'Malay') {
      tailoredDiet.push('Recipe: Nasi Ulam (herb rice with finely chopped aromatic leaves like daun kaduk and lemongrass)');
    } else if (race === 'Indian') {
      tailoredDiet.push('Recipe: Mint and coriander chutney (fresh and aromatic to lift the mood)');
    } else {
      tailoredDiet.push('Recipe: Rose bud and chrysanthemum tea');
      tailoredDiet.push('Recipe: Steamed fish with tangerine peel and ginger');
    }
  } else if (primary === 'Special Diathesis') {
    tailoredDiet.push('Recipe: Simple clear chicken broth with minimal seasoning');
    tailoredDiet.push('Recipe: Steamed seasonal vegetables (avoid known allergens)');
  } else {
    tailoredDiet.push('Recipe: Balanced mixed vegetable stir-fry with lean protein');
    tailoredDiet.push('Recipe: Clear soup with tofu and leafy greens');
  }

  return {
    ...base,
    diet: tailoredDiet
  };
}

export const NCD_INFO: Record<string, { symptoms: string[], causes: string[], prevention: string[], actions: string[] }> = {
  'Metabolic Syndrome': {
    symptoms: ['Increased blood pressure', 'High blood sugar', 'Excess body fat around the waist', 'Abnormal cholesterol levels'],
    causes: ['Insulin resistance', 'Obesity', 'Inactive lifestyle', 'Age and genetics'],
    prevention: ['Maintain a healthy weight', 'Eat a balanced diet rich in whole grains, fruits, and vegetables', 'Exercise regularly (at least 30 mins a day)'],
    actions: ['Consult a doctor for a blood test', 'Monitor waist circumference', 'Reduce sugar and refined carbohydrate intake']
  },
  'Type 2 Diabetes': {
    symptoms: ['Increased thirst', 'Frequent urination', 'Increased hunger', 'Unintended weight loss', 'Fatigue', 'Blurred vision'],
    causes: ['Insulin resistance', 'Overweight or obesity', 'Physical inactivity', 'Genetics and family history'],
    prevention: ['Eat healthy foods (lower fat and calories, higher fiber)', 'Get active', 'Lose excess weight', 'Avoid sedentary behavior'],
    actions: ['Schedule an HbA1c test', 'Check blood sugar levels regularly if advised', 'Consult a dietitian']
  },
  'Hypertension': {
    symptoms: ['Often asymptomatic ("silent killer")', 'Headaches', 'Shortness of breath', 'Nosebleeds (in severe cases)'],
    causes: ['High sodium intake', 'Obesity', 'Stress', 'Lack of physical activity', 'Genetics'],
    prevention: ['Reduce sodium (salt) intake', 'Eat a heart-healthy diet (DASH diet)', 'Limit alcohol consumption', 'Manage stress'],
    actions: ['Check blood pressure regularly', 'Reduce processed food intake', 'Consult a doctor for potential medication']
  },
  'Cardiovascular Issues': {
    symptoms: ['Chest pain or discomfort', 'Shortness of breath', 'Pain, numbness, weakness or coldness in legs or arms', 'Pain in neck, jaw, throat, upper abdomen or back'],
    causes: ['Atherosclerosis (plaque buildup in arteries)', 'High blood pressure', 'High cholesterol', 'Smoking', 'Diabetes'],
    prevention: ['Quit smoking', 'Control blood pressure and cholesterol', 'Exercise regularly', 'Maintain a healthy weight'],
    actions: ['Seek immediate emergency care if experiencing chest pain', 'Schedule a comprehensive heart health screening', 'Adopt a heart-healthy lifestyle']
  },
  'Chronic Fatigue Syndrome': {
    symptoms: ['Severe fatigue not improved by rest', 'Post-exertional malaise', 'Unrefreshing sleep', 'Memory or concentration problems'],
    causes: ['Unknown exact cause', 'Possible viral infections', 'Immune system problems', 'Hormonal imbalances'],
    prevention: ['Pace activities', 'Manage stress', 'Maintain a healthy sleep routine'],
    actions: ['Consult a doctor to rule out other conditions', 'Work with a physical therapist for graded exercise', 'Consider cognitive behavioral therapy']
  },
  'Immunodeficiency': {
    symptoms: ['Frequent and recurrent pneumonia, bronchitis, sinus infections, ear infections, meningitis or skin infections', 'Inflammation and infection of internal organs'],
    causes: ['Genetic defects (primary)', 'Malnutrition', 'Certain medications', 'Other diseases (secondary)'],
    prevention: ['Practice good hygiene', 'Eat a nutritious diet', 'Get adequate sleep', 'Manage stress'],
    actions: ['Consult an immunologist', 'Stay up to date on vaccinations (as advised by doctor)', 'Avoid exposure to people with infections']
  },
  'Hyperthyroidism': {
    symptoms: ['Unintentional weight loss', 'Rapid heartbeat (tachycardia)', 'Irregular heartbeat (arrhythmia)', 'Increased appetite', 'Nervousness, anxiety and irritability'],
    causes: ['Graves\' disease', 'Hyperfunctioning thyroid nodules', 'Thyroiditis'],
    prevention: ['Cannot always be prevented, but early detection is key', 'Avoid excessive iodine intake'],
    actions: ['Consult an endocrinologist', 'Get a thyroid function test (TSH, T3, T4)', 'Discuss treatment options']
  },
  'Menopausal Syndrome': {
    symptoms: ['Hot flashes', 'Night sweats', 'Sleep disturbances', 'Mood changes', 'Vaginal dryness'],
    causes: ['Natural decline of reproductive hormones', 'Oophorectomy', 'Chemotherapy and radiation therapy'],
    prevention: ['Maintain a healthy lifestyle to reduce symptom severity', 'Stay cool to manage hot flashes'],
    actions: ['Consult a gynecologist', 'Discuss Hormone Replacement Therapy (HRT) risks and benefits', 'Consider lifestyle modifications']
  }
};

export function validateTongue(primary: ConstitutionType, tongue: TongueData): number {
  let confidence = 85; // Base confidence

  if (tongue.coatingColor === 'Yellow' && tongue.texture === 'Greasy' && primary === 'Damp-Heat') {
    confidence += 10;
  }
  if (tongue.coatingColor === 'White' && tongue.texture === 'Greasy' && primary === 'Phlegm-Dampness') {
    confidence += 10;
  }
  if (tongue.bodyColor === 'Purple' && primary === 'Blood Stasis') {
    confidence += 10;
  }
  if (tongue.bodyColor === 'Pale' && (primary === 'Qi-Deficiency' || primary === 'Yang-Deficiency')) {
    confidence += 10;
  }
  if (tongue.bodyColor === 'Red' && tongue.texture === 'Peeled' && primary === 'Yin-Deficiency') {
    confidence += 10;
  }

  return Math.min(confidence, 99);
}
