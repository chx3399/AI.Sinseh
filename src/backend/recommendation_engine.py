import json
import copy
from typing import List, Dict, Optional

def generate_tcm_daily_plan(constitution: str, ncd_risks: Optional[List[str]] = None) -> str:
    """
    Generates a structured daily plan based on TCM constitution and NCD risks.
    Dynamically adjusts dietary recommendations (foods to avoid, recommended foods)
    based on specific Non-Communicable Diseases (NCDs).
    """
    if ncd_risks is None:
        ncd_risks = []

    # TCM Knowledge Base with Singaporean localized recipes
    tcm_db = {
        "Qi Deficiency": {
            "foods_recommended": {
                "Warming": ["Chicken", "Ginseng", "Red Dates", "Ginger"],
                "Neutral": ["Yam (Taro)", "Rice", "Shiitake Mushrooms"],
                "Cooling": []
            },
            "foods_to_avoid": ["Raw salads", "Iced drinks", "Watermelon", "Green tea"],
            "exercise": {
                "type": "Gentle, sustained movements to build Qi without exhaustion.",
                "intensity_1_to_10": 3,
                "recommendations": ["Tai Chi", "Qi Gong", "Brisk walking in the morning"]
            },
            "recipes": [
                {
                    "name": "Herbal Chicken Soup (Dang Gui)",
                    "ingredients": ["Black chicken", "Dang Gui (Angelica root)", "Red dates", "Goji berries"],
                    "instructions": "Double boil for 2 hours. Easily found at local hawker soup stalls or cooked at home."
                },
                {
                    "name": "Healthy Yam Paste (Orh Nee)",
                    "ingredients": ["Steamed yam", "Ginkgo nuts", "Minimal shallot oil", "Stevia/Monk fruit sweetener"],
                    "instructions": "Mash steamed yam and blend with a touch of oil and sugar substitute. Avoid traditional high-lard versions."
                }
            ]
        },
        "Dampness-Heat": {
            "foods_recommended": {
                "Warming": [],
                "Neutral": ["Coix seed (Barley)", "Red bean", "Pork lean meat"],
                "Cooling": ["Winter melon", "Lotus root", "Cucumber", "Green bean"]
            },
            "foods_to_avoid": ["Durian", "Mango", "Deep-fried foods", "Spicy Mala", "Alcohol", "Mutton"],
            "exercise": {
                "type": "Moderate to high intensity to promote sweating and clear dampness.",
                "intensity_1_to_10": 7,
                "recommendations": ["Swimming", "Cycling", "Brisk walking in the evening (avoid midday sun)"]
            },
            "recipes": [
                {
                    "name": "Winter Melon & Pork Rib Soup",
                    "ingredients": ["Winter melon chunks", "Lean pork ribs", "Barley", "Dried scallops"],
                    "instructions": "Simmer for 1.5 hours. A common, cooling dish available at most mixed rice (Cai Fan) stalls."
                },
                {
                    "name": "Unsweetened Barley Water",
                    "ingredients": ["Pearl barley", "Pandan leaves", "Water"],
                    "instructions": "Boil barley with pandan leaves for 45 mins. Drink warm or room temperature without sugar."
                }
            ]
        }
    }

    base_plan = tcm_db.get(constitution)
    if not base_plan:
        return json.dumps({"error": "Constitution not found in database."})

    # Deep copy to avoid mutating the base dictionary across multiple function calls
    plan = copy.deepcopy(base_plan)

    # NCD Risk Adjustments (Dynamic modifications to the diet)
    ncd_warnings = []
    
    # Normalize risk strings for easier matching
    risks_lower = [risk.lower() for risk in ncd_risks]

    if any(r in risks_lower for r in ["type 2 diabetes", "diabetes"]):
        ncd_warnings.append("DIABETES ALERT: Substitute white rice with brown rice or quinoa. Strictly avoid added sugars.")
        plan["foods_to_avoid"].extend(["Added sugars", "Refined carbohydrates", "Sweetened beverages", "High-GI tropical fruits"])
        
    if any(r in risks_lower for r in ["hypertension", "cardiovascular diseases", "cvd"]):
        ncd_warnings.append("CARDIOVASCULAR/HYPERTENSION ALERT: Reduce sodium intake. Do not consume the broth of herbal soups, eat only the ingredients.")
        plan["foods_to_avoid"].extend(["High-sodium foods", "Processed meats", "Salty broths", "Canned foods"])
        
    if "metabolic syndrome" in risks_lower:
        ncd_warnings.append("METABOLIC ALERT: Ensure a caloric deficit. Prioritize cooling/neutral vegetables and lean proteins.")
        plan["foods_to_avoid"].extend(["Trans fats", "High-calorie processed foods", "Excessive cooking oil"])
        
    if "cancers" in risks_lower:
        ncd_warnings.append("ONCOLOGY ALERT: Focus on antioxidant-rich, fresh foods. Avoid any charred or highly processed items.")
        plan["foods_to_avoid"].extend(["Charred/smoked meats", "Highly processed foods", "Preserved/cured meats"])
        plan["foods_recommended"]["Neutral"].extend(["Cruciferous vegetables", "Fresh berries", "Green leafy vegetables"])
        
    if "respiratory diseases" in risks_lower:
        ncd_warnings.append("RESPIRATORY ALERT: Avoid phlegm-producing foods and cold drinks that can constrict airways.")
        plan["foods_to_avoid"].extend(["Dairy products (if phlegm-producing)", "Cold/Iced drinks", "Excessively sweet foods"])

    # Deduplicate foods_to_avoid
    plan["foods_to_avoid"] = list(set(plan["foods_to_avoid"]))

    output = {
        "constitution": constitution,
        "ncd_considerations": ncd_warnings,
        "dietary_plan": {
            "recommended_foods": plan["foods_recommended"],
            "foods_to_avoid": plan["foods_to_avoid"]
        },
        "exercise_plan": plan["exercise"],
        "local_singaporean_recipes": plan["recipes"]
    }

    return json.dumps(output, indent=4)

# Example Execution
if __name__ == "__main__":
    print("--- Dampness-Heat with Diabetes & Cardiovascular Risks ---")
    print(generate_tcm_daily_plan("Dampness-Heat", ["Type 2 Diabetes", "Cardiovascular Diseases"]))
    
    print("\n--- Qi Deficiency with Respiratory Diseases ---")
    print(generate_tcm_daily_plan("Qi Deficiency", ["Respiratory Diseases"]))
