import json
from typing import Dict, List, Any

# ==========================================
# 1. CCMQ 60-Item & 30-Item Definitions
# ==========================================

# The full 60-item list as provided
CCMQ_60_ITEMS = [
  { "id": 1, "text": "Are you energetic?", "type": "Gentleness", "reverse": False },
  { "id": 2, "text": "Do you get tired easily?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 3, "text": "Do you suffer from shortness of breath?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 4, "text": "Do you get palpitations?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 5, "text": "Do you get dizzy or lightheaded when standing up?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 6, "text": "Do you prefer quietness and dislike talking?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 7, "text": "Is your voice weak when talking?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 8, "text": "Do you feel gloomy or depressed?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 9, "text": "Do you feel anxious or worried easily?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 10, "text": "Are you sentimental or emotionally fragile?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 11, "text": "Are you easily scared or frightened?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 12, "text": "Do you feel distention in the underarm or breast?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 13, "text": "Do you feel chest or stomach stuffiness?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 14, "text": "Do you sigh for no reason?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 15, "text": "Does your body feel heavy or lethargic?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 16, "text": "Do the palms of your hands or soles of your feet feel hot?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 17, "text": "Do your hands or feet feel cold?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 18, "text": "Do you feel cold easily in your abdomen or back?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 19, "text": "Are you sensitive to cold (tend to wear more clothes)?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 20, "text": "Do your body and face feel hot?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 21, "text": "Are you more vulnerable to cold than others?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 22, "text": "Do you catch colds more easily than others?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 23, "text": "Do you sneeze even when not having a cold?", "type": "Special-Diathesis", "reverse": False },
  { "id": 24, "text": "Do you have a runny/stuffy nose without a cold?", "type": "Special-Diathesis", "reverse": False },
  { "id": 25, "text": "Do you cough due to seasonal or temperature changes?", "type": "Special-Diathesis", "reverse": False },
  { "id": 26, "text": "Do you sweat easily with slight physical activity?", "type": "Qi-Deficiency", "reverse": False },
  { "id": 27, "text": "Do you forget things easily?", "type": "Gentleness", "reverse": True },
  { "id": 28, "text": "Is your forehead or T-zone excessively oily?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 29, "text": "Do your skin or lips feel dry?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 30, "text": "Do you have allergies (medicine, food, pollen)?", "type": "Special-Diathesis", "reverse": False },
  { "id": 31, "text": "Does your skin get hives/urticaria easily?", "type": "Special-Diathesis", "reverse": False },
  { "id": 32, "text": "Does your skin turn red/show traces when scratched?", "type": "Special-Diathesis", "reverse": False },
  { "id": 33, "text": "Do black or purple bruises appear for no reason?", "type": "Blood-Stasis", "reverse": False },
  { "id": 34, "text": "Are your lips redder than others?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 35, "text": "Are there visible capillary veins on your cheeks?", "type": "Blood-Stasis", "reverse": False },
  { "id": 36, "text": "Do you feel pain somewhere in your body?", "type": "Blood-Stasis", "reverse": False },
  { "id": 37, "text": "Do you get hot flashes?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 38, "text": "Does your nose or face feel greasy or shiny?", "type": "Damp-Heat", "reverse": False },
  { "id": 39, "text": "Do you have a dark complexion or brown spots?", "type": "Blood-Stasis", "reverse": False },
  { "id": 40, "text": "Do you get acne or sores easily?", "type": "Damp-Heat", "reverse": False },
  { "id": 41, "text": "Do you have upper eyelid swelling?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 42, "text": "Do you get dark circles under the eyes easily?", "type": "Blood-Stasis", "reverse": False },
  { "id": 43, "text": "Do your eyes feel dry?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 44, "text": "Are your lips dark or purple?", "type": "Blood-Stasis", "reverse": False },
  { "id": 45, "text": "Do you often feel parched/need to drink water?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 46, "text": "Does your throat feel like something is stuck in it?", "type": "Special-Diathesis", "reverse": False },
  { "id": 47, "text": "Do you have a bitter or strange taste in your mouth?", "type": "Damp-Heat", "reverse": False },
  { "id": 48, "text": "Does your mouth feel sticky?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 49, "text": "Do you have a thick tongue coating?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 50, "text": "Do you have lots of phlegm in your throat?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 51, "text": "Do you feel uncomfortable after eating cold items?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 52, "text": "Can you adapt to external environment changes?", "type": "Gentleness", "reverse": False },
  { "id": 53, "text": "Do you suffer from insomnia?", "type": "Qi-Stagnation", "reverse": False },
  { "id": 54, "text": "Do you get diarrhea from cold food or exposure?", "type": "Yang-Deficiency", "reverse": False },
  { "id": 55, "text": "Are your stools sticky or feel incomplete?", "type": "Damp-Heat", "reverse": False },
  { "id": 56, "text": "Do you get constipated or have dry stools?", "type": "Yin-Deficiency", "reverse": False },
  { "id": 57, "text": "Is your stomach/belly flabby?", "type": "Phlegm-Dampness", "reverse": False },
  { "id": 58, "text": "Does your urine feel hot or look dark?", "type": "Damp-Heat", "reverse": False },
  { "id": 59, "text": "Is vaginal discharge yellowish? (Female only)", "type": "Damp-Heat", "additional_info": "Female", "reverse": False },
  { "id": 60, "text": "Is your scrotum always wet? (Male only)", "type": "Damp-Heat", "additional_info": "Male", "reverse": False }
]

# The reduced 30-item list (SF-CCMQ)
REDUCED_30_ITEM_IDS = [
    1, 27, 52,           # Gentleness
    2, 3, 22, 26,        # Qi-Deficiency
    17, 51, 54,          # Yang-Deficiency
    16, 29, 45,          # Yin-Deficiency
    15, 49, 57,          # Phlegm-Dampness
    38, 40, 47, 55,      # Damp-Heat
    33, 36, 44,          # Blood-Stasis
    8, 9, 14, 53,        # Qi-Stagnation
    23, 30, 31           # Special-Diathesis
]

CCMQ_30_ITEMS = [q for q in CCMQ_60_ITEMS if q["id"] in REDUCED_30_ITEM_IDS]

# ==========================================
# 2. Scoring Logic
# ==========================================

def calculate_ccmq_scores(answers: Dict[int, int], use_lite_version: bool = False) -> Dict[str, Any]:
    """
    Calculates the Adjusted Score (AS) for all 9 constitutions based on user answers.
    Answers should be a dictionary mapping question ID to a score (1-5).
    """
    questions = CCMQ_30_ITEMS if use_lite_version else CCMQ_60_ITEMS
    
    # Initialize tracking dictionaries
    raw_scores = {}
    counts = {}
    
    for q in questions:
        ctype = q["type"]
        if ctype not in raw_scores:
            raw_scores[ctype] = 0
            counts[ctype] = 0
            
        qid = q["id"]
        if qid in answers:
            score = answers[qid]
            
            # Apply reverse scoring if indicated
            if q.get("reverse"):
                score = 6 - score
                
            raw_scores[ctype] += score
            counts[ctype] += 1

    # Calculate Adjusted Scores (AS)
    adjusted_scores = {}
    for ctype in raw_scores.keys():
        if counts[ctype] > 0:
            # AS = [(Raw Sum - Number of Items) / (Number of Items * 4)] * 100
            as_score = ((raw_scores[ctype] - counts[ctype]) / (counts[ctype] * 4)) * 100
            adjusted_scores[ctype] = round(as_score, 2)
        else:
            adjusted_scores[ctype] = 0.0

    # Determine Diagnostic Thresholds
    diagnoses = {}
    
    # Evaluate Neutral/Gentleness first
    neutral_score = adjusted_scores.get("Gentleness", 0)
    other_scores = [score for ctype, score in adjusted_scores.items() if ctype != "Gentleness"]
    
    is_neutral = (neutral_score >= 60) and all(s < 30 for s in other_scores)
    
    for ctype, score in adjusted_scores.items():
        if ctype == "Gentleness":
            diagnoses[ctype] = "Yes" if is_neutral else "No"
        else:
            if score >= 40:
                diagnoses[ctype] = "Yes"
            elif 30 <= score < 40:
                diagnoses[ctype] = "Tendency"
            else:
                diagnoses[ctype] = "No"

    return {
        "adjusted_scores": adjusted_scores,
        "diagnoses": diagnoses
    }

# ==========================================
# 3. Personalized Content Mapping
# ==========================================

PERSONALIZED_CONTENT = {
    "Gentleness": {
        "recipe": "Balanced Diet (e.g., Steamed Fish with Ginger and Scallions)",
        "exercise": "Regular Jogging or Swimming"
    },
    "Qi-Deficiency": {
        "recipe": "Goji Berry & Red Date Tea, Herbal Chicken Soup",
        "exercise": "Brisk walking, Tai Chi, Qi Gong"
    },
    "Yang-Deficiency": {
        "recipe": "Ginger & Mutton Soup, Cinnamon Tea",
        "exercise": "Morning sunlight Tai Chi, Brisk walking"
    },
    "Yin-Deficiency": {
        "recipe": "Tremella Mushroom & Lily Bulb Soup",
        "exercise": "Walking at sunset, Swimming, Yoga"
    },
    "Phlegm-Dampness": {
        "recipe": "Winter Melon & Barley Soup, Radish Salad",
        "exercise": "High-Intensity Interval Training (HIIT), Aerobics"
    },
    "Damp-Heat": {
        "recipe": "Green Bean Soup, Lotus Root Salad",
        "exercise": "Swimming, Cycling (Avoid exercising in high heat)"
    },
    "Blood-Stasis": {
        "recipe": "Rose & Hawthorn Tea, Black Fungus Stir-fry",
        "exercise": "Meridian stretching, Dancing, Tai Chi"
    },
    "Qi-Stagnation": {
        "recipe": "Radish & Pork Rib Soup, Citrus Peel Tea",
        "exercise": "Jogging, Mountaineering, Active sports to release stress"
    },
    "Special-Diathesis": {
        "recipe": "Honey Water, Lean Meat Congee",
        "exercise": "Gentle Yoga, Light stretching"
    }
}

def get_personalized_recommendations(diagnoses: Dict[str, str]) -> Dict[str, Any]:
    """
    Returns personalized food and exercise recommendations based on the diagnosed constitutions.
    Prioritizes 'Yes' diagnoses over 'Tendency'.
    """
    recommendations = {}
    
    for ctype, status in diagnoses.items():
        if status in ["Yes", "Tendency"]:
            recommendations[ctype] = {
                "status": status,
                "content": PERSONALIZED_CONTENT.get(ctype, {})
            }
            
    return recommendations

# ==========================================
# Example Execution
# ==========================================
if __name__ == "__main__":
    # Mock answers for the 30-item Lite version
    # High scores in Qi-Deficiency items (2, 3, 22, 26)
    mock_answers = {
        1: 3, 27: 2, 52: 4,           # Gentleness (Moderate)
        2: 5, 3: 4, 22: 5, 26: 4,     # Qi-Deficiency (High)
        17: 2, 51: 1, 54: 1,          # Yang-Deficiency (Low)
        16: 1, 29: 2, 45: 2,          # Yin-Deficiency (Low)
        15: 2, 49: 1, 57: 2,          # Phlegm-Dampness (Low)
        38: 1, 40: 1, 47: 1, 55: 1,   # Damp-Heat (Low)
        33: 1, 36: 2, 44: 1,          # Blood-Stasis (Low)
        8: 2, 9: 3, 14: 2, 53: 2,     # Qi-Stagnation (Low)
        23: 1, 30: 1, 31: 1           # Special-Diathesis (Low)
    }

    results = calculate_ccmq_scores(mock_answers, use_lite_version=True)
    
    print("--- Adjusted Scores (AS) ---")
    print(json.dumps(results["adjusted_scores"], indent=2))
    
    print("\n--- Diagnoses ---")
    print(json.dumps(results["diagnoses"], indent=2))
    
    print("\n--- Personalized Content ---")
    recs = get_personalized_recommendations(results["diagnoses"])
    print(json.dumps(recs, indent=2))
