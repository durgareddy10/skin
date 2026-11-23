import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export const diseaseData = {
  AD: {
    code: "AD",
    name: "Atopic Dermatitis",
    subtitle:
      "A chronic inflammatory skin condition commonly associated with dry, itchy, and hyper-reactive skin.",
    icon: "💧",
    type: "Inflammatory",

    about:
      "Atopic dermatitis is a common long-term skin condition where an impaired skin barrier and immune dysregulation cause dry, sensitive, and itchy patches. Dietary choices can significantly modulate inflammation and reduce the frequency and severity of flare-ups.",

    causes: [
      "Genetic predisposition and filaggrin gene mutations affecting the skin moisture barrier",
      "Overactive immune response producing elevated IgE antibodies",
      "Environmental allergens (dust mites, pollen, pet dander)",
      "Harsh chemical soaps, synthetic fragrances, and detergents",
      "Stress, dry climate, heat, and excessive sweating",
    ],

    symptoms: [
      "Severe, persistent itching, often worsening at night",
      "Red, inflamed, and thickened skin patches on flexural folds (elbows, knees)",
      "Cracked, raw, and bleeding skin from constant scratching",
      "Small raised bumps that may weep fluid and crust over",
      "Dry, scaly patches that sting upon contact with water or sweat",
    ],

    diet: {
      overview:
        "An anti-inflammatory and gut-strengthening diet helps repair the compromised epidermal barrier and calms overreactive immune responses.",
      foodsToEat: [
        {
          food: "Wild Fatty Fish (Salmon, Mackerel, Sardines)",
          badge: "Omega-3",
          benefit:
            "Packed with EPA and DHA essential fatty acids that actively suppress pro-inflammatory leukotrienes and soothe itchy skin from within.",
        },
        {
          food: "Flaxseeds, Chia Seeds & Walnuts",
          badge: "Plant ALA",
          benefit:
            "Provides alpha-linolenic acid (ALA) which strengthens lipid bilayers in the stratum corneum and prevents moisture loss.",
        },
        {
          food: "Quercetin-Dense Foods (Apples, Blueberries, Kale)",
          badge: "Antihistamine",
          benefit:
            "Quercetin is a powerful natural bioflavonoid that inhibits mast cell degranulation, reducing allergic skin itching.",
        },
        {
          food: "Probiotic Foods (Kefir, Live Yogurt, Sauerkraut)",
          badge: "Gut Health",
          benefit:
            "Cultivates diverse beneficial gut flora (Lactobacillus & Bifidobacterium) which regulates systemic immune tolerance.",
        },
        {
          food: "Zinc-Rich Foods (Pumpkin Seeds, Lentils, Chickpeas)",
          badge: "Skin Repair",
          benefit:
            "Zinc is critical for cellular regeneration, DNA synthesis, and accelerating the healing of scratched skin lesions.",
        },
        {
          food: "Beta-Carotene Vegetables (Carrots, Sweet Potatoes)",
          badge: "Vitamin A",
          benefit:
            "Converts into active Vitamin A, essential for maintaining healthy epithelial tissue and natural skin defenses.",
        },
      ],
      foodsToAvoid: [
        {
          food: "Cow's Milk & High-Fat Dairy Products",
          badge: "Major Allergen",
          reason:
            "Contains A1 beta-casein and whey proteins that frequently provoke allergic immune reactions and trigger atopic flare-ups.",
        },
        {
          food: "Refined White Sugar & Sweetened Drinks",
          badge: "High Glycemic",
          reason:
            "Triggers insulin surges and advanced glycation end-products (AGEs), driving systemic inflammatory pathways.",
        },
        {
          food: "Gluten & Refined Wheat Products",
          badge: "Sensitivity",
          reason:
            "Can increase intestinal permeability ('leaky gut') in sensitive individuals, allowing allergens into circulation.",
        },
        {
          food: "Ultra-Processed Foods & Preservatives",
          badge: "Chemical Additives",
          reason:
            "Artificial colorings, sodium benzoates, and nitrites irritate the immune system and amplify skin flare frequency.",
        },
        {
          food: "Nightshade Vegetables (Tomatoes, Eggplant, Peppers)",
          badge: "Alkaloids",
          reason:
            "Contains solanine and lectins which can irritate sensitive mucosal linings and heighten skin reactivity in some individuals.",
        },
        {
          food: "Excessive Table Salt & Salty Snacks",
          badge: "Dehydrating",
          reason:
            "High sodium levels alter cellular osmotic balance, exacerbating epidermal dehydration and pruritus (itching).",
        },
      ],
      hydrationTip:
        "Drink at least 2.5 to 3 liters of purified water daily. Adequate cellular hydration prevents microscopic cracking of dry skin.",
      lifestyleTip:
        "Consider an elimination diet for 3 weeks under healthcare supervision to pinpoint specific personal trigger foods.",
    },

    precautions: [
      "Apply thick, fragrance-free emollient creams within 3 minutes of bathing to lock in moisture",
      "Take lukewarm, short showers (5–10 minutes) and avoid hot water",
      "Wear 100% breathable organic cotton clothing and avoid scratchy wool or synthetic polyester",
      "Keep fingernails trimmed short and clean to prevent open skin infections from scratching",
      "Use hypoallergenic, fragrance-free laundry detergents with an extra rinse cycle",
    ],

    seekHelp:
      "Consult a dermatologist if your skin becomes painful, develops yellow crusting or pus (signs of bacterial infection), or if intense itching disrupts your sleep and daily functioning.",
  },

  CD: {
    code: "CD",
    name: "Contact Dermatitis",
    subtitle:
      "Skin inflammation and irritation triggered by direct contact with allergens, irritants, or reactive chemical agents.",
    icon: "🔴",
    type: "Allergic / Irritant",

    about:
      "Contact dermatitis occurs when external substances either physically damage the skin surface (irritant contact dermatitis) or trigger a delayed hypersensitivity immune reaction (allergic contact dermatitis). Nutrition helps minimize systemic histamine levels and accelerates epithelial healing.",

    causes: [
      "Chemicals in household cleaning detergents, bleach, and solvents",
      "Metals such as nickel (found in jewelry, belt buckles, watch straps, and coins)",
      "Cosmetics, fragrances, hair dyes (PPD), and preservatives like parabens",
      "Poison ivy, oak, sumac, and other botanical sap resins",
      "Latex gloves and topical antibiotic ointments (like neomycin)",
    ],

    symptoms: [
      "Stinging, burning redness confined to the area of contact",
      "Fluid-filled blisters or vesicles that can ooze and crust",
      "Localized intense itching, swelling, and skin warmth",
      "Dry, leathery, or cracked skin from chronic low-grade exposure",
      "Tenderness and skin hypersensitivity to touch or temperature changes",
    ],

    diet: {
      overview:
        "A low-histamine, cellular-repair nutrition plan calms cutaneous hypersensitivity and provides the micronutrients necessary to rebuild the damaged contact area.",
      foodsToEat: [
        {
          food: "Vitamin C Rich Foods (Bell Peppers, Kiwi, Papaya)",
          badge: "Immune Shield",
          benefit:
            "Vitamin C acts as a natural antihistamine and is essential for collagen cross-linking to repair the irritated contact site.",
        },
        {
          food: "Turmeric & Fresh Ginger Root",
          badge: "Curcumin",
          benefit:
            "Inhibits NF-kB and COX-2 inflammatory enzymes, reducing the intensity of redness, swelling, and burning sensations.",
        },
        {
          food: "Dark Leafy Greens (Kale, Bok Choy, Swiss Chard)",
          badge: "Antioxidants",
          benefit:
            "Abundant in chlorophyll, folate, and carotenoids that assist liver detoxification of environmental chemical residues.",
        },
        {
          food: "Extra Virgin Cold-Pressed Olive Oil",
          badge: "Oleocanthal",
          benefit:
            "Contains oleocanthal, a natural compound with anti-inflammatory properties similar to low-dose ibuprofen.",
        },
        {
          food: "Green Tea (Organic Sencha or Matcha)",
          badge: "EGCG Polyphenols",
          benefit:
            "Supplies epigallocatechin gallate, which stabilizes mast cells and modulates allergic contact reactions.",
        },
        {
          food: "Clean Plant & Lean Proteins (Tofu, Lentils, Poultry)",
          badge: "Amino Acids",
          benefit:
            "Supplies L-lysine and L-proline necessary for regenerating new, healthy epithelial layers over damaged skin.",
        },
      ],
      foodsToAvoid: [
        {
          food: "High-Nickel Foods (Dark Chocolate, Soy, Canned Foods, Cashews)",
          badge: "Nickel Sensitivity",
          reason:
            "If allergic to nickel jewelry/buckles, dietary nickel can cause systemic flare-ups and perpetuate contact rashes.",
        },
        {
          food: "Aged & Fermented Cheeses (Parmesan, Blue Cheese)",
          badge: "High Histamine",
          reason:
            "Contains concentrated biogenic amines and histamine, which directly magnifies skin itching and burning.",
        },
        {
          food: "Cured & Processed Meats (Salami, Bacon, Hot Dogs)",
          badge: "Nitrates & Sulfites",
          reason:
            "Nitrites and preservatives generate reactive oxygen species that stress cutaneous healing.",
        },
        {
          food: "Alcohol (especially Red Wine & Craft Beer)",
          badge: "Vasodilator",
          reason:
            "Dilates peripheral blood vessels, accelerating redness and tissue heat at the rash site while blocking DAO enzymes.",
        },
        {
          food: "Spicy Irritants (Hot Chili Peppers, Wasabi)",
          badge: "Capsaicin",
          reason:
            "Triggers neurogenic inflammation and substance P release, exacerbating stinging and skin sensitivity.",
        },
        {
          food: "Artificial Food Colorings & Flavor Enhancers",
          badge: "Chemical Additive",
          reason:
            "Known systemic irritants that can lower the threshold for external allergic reactions.",
        },
      ],
      hydrationTip:
        "Flush toxins by drinking warm lemon water and unsweetened herbal infusions throughout the day.",
      lifestyleTip:
        "Identify and eliminate the specific external contact allergen (e.g. switch to nickel-free belts, fragrance-free detergents).",
    },

    precautions: [
      "Wash skin immediately with mild soap and water if you come into contact with a known irritant",
      "Wear protective non-latex gloves when cleaning or doing household chores",
      "Switch to hypoallergenic and fragrance-free skin moisturizers and cosmetics",
      "Use cool, damp compresses on the affected area to soothe acute burning and itching",
      "Always patch-test any new cosmetic, cream, or lotion on the inner forearm for 48 hours first",
    ],

    seekHelp:
      "Seek emergency medical evaluation if the rash involves your eyes, eyelids, mouth, or genitals, or if you experience facial swelling, wheezing, or difficulty breathing.",
  },

  EC: {
    code: "EC",
    name: "Eczema",
    subtitle:
      "A spectrum of itchy, red, and irritated skin conditions tied to epidermal barrier impairment and immune signaling.",
    icon: "🌿",
    type: "Common",

    about:
      "Eczema is an umbrella term for conditions causing skin inflammation, cracking, and severe pruritus. Diet plays a pivotal role in maintaining gut microbiome balance, regulating Th2 immune cytokines, and supplying essential lipids to seal the skin barrier.",

    causes: [
      "Dysfunctional epidermal barrier leading to transepidermal water loss (TEWL)",
      "Immune system dysregulation with excessive inflammatory cytokine release",
      "Cold, dry winter air or excessively hot and humid conditions",
      "Emotional stress and hormonal fluctuations triggering cortisol spikes",
      "Dietary sensitivities and food intolerances (dairy, gluten, additives)",
    ],

    symptoms: [
      "Chronic, intense itching that demands scratching",
      "Dry, sensitive skin that cracks and stings easily",
      "Red to brownish-gray patches, especially on hands, feet, ankles, and neck",
      "Thickened, leathery, and cracked skin from prolonged scratching (lichenification)",
      "Raw, swollen skin sensitive to temperature changes and sweating",
    ],

    diet: {
      overview:
        "Eliminate high-inflammatory triggers while flooding the body with skin-barrier repair nutrients, Omega-3s, and prebiotic fibers.",
      foodsToEat: [
        {
          food: "Omega-3 Wild Fish (Wild Salmon, Sardines, Trout)",
          badge: "Anti-Inflammatory",
          benefit:
            "Reduces production of inflammatory eicosanoids and prostaglandins, resulting in visibly calmer and less irritated skin.",
        },
        {
          food: "Bone Broth or Plant Collagen Support",
          badge: "Barrier Repair",
          benefit:
            "Rich in glycine, proline, and glutamine that repair gut epithelial junctions and strengthen the dermis.",
        },
        {
          food: "Berries (Blueberries, Blackberries, Raspberries)",
          badge: "Anthocyanins",
          benefit:
            "Dense in bioflavonoids that protect delicate skin capillaries and reduce histamine-induced tissue redness.",
        },
        {
          food: "Prebiotic Fibers (Asparagus, Leeks, Garlic, Oats)",
          badge: "Microbiome",
          benefit:
            "Nourishes beneficial gut bacteria that produce short-chain fatty acids (SCFAs) like butyrate to calm inflammation.",
        },
        {
          food: "Pumpkin, Sunflower & Hemp Seeds",
          badge: "Vitamin E & Zinc",
          benefit:
            "Supplies natural Vitamin E, the primary lipid-soluble antioxidant guarding cell membranes from oxidative breakdown.",
        },
        {
          food: "Steamed Cruciferous Vegetables (Broccoli, Brussels Sprouts)",
          badge: "Sulforaphane",
          benefit:
            "Activates the Nrf2 cellular antioxidant pathway, enhancing the body's internal defense against flare-ups.",
        },
      ],
      foodsToAvoid: [
        {
          food: "Conventional Cow's Dairy (Milk, Cheese, Cream)",
          badge: "Common Trigger",
          reason:
            "One of the most documented food triggers for eczema, stimulating inflammatory pathways and mucus production.",
        },
        {
          food: "Refined White Sugar & High-Fructose Corn Syrup",
          badge: "Inflammatory Spike",
          reason:
            "Spikes blood sugar, leading to rapid insulin secretion and heightened systemic inflammatory cytokine activity.",
        },
        {
          food: "Deep-Fried Foods & Industrial Seed Oils (Canola, Soybean, Corn)",
          badge: "Omega-6 Excess",
          reason:
            "Excessive Omega-6 fatty acids convert into arachidonic acid, fueling inflammatory skin cascades.",
        },
        {
          food: "Eggs (for sensitive individuals)",
          badge: "Egg Albumin",
          reason:
            "Egg white proteins (ovalbumin) are a frequent trigger for eczema flares, especially in children and young adults.",
        },
        {
          food: "Soy & Soy-Derived Products",
          badge: "Phytoestrogens & Lectins",
          reason:
            "Can trigger allergic immune responses and digestive irritation in sensitive eczema sufferers.",
        },
        {
          food: "Alcohol & Sweet Cocktails",
          badge: "Dehydrating",
          reason:
            "Depletes critical hydration and B-vitamins, while dilating skin capillaries and intensifying nighttime itchiness.",
        },
      ],
      hydrationTip:
        "Keep a large water bottle at your desk and sip regularly. Hydration inside directly correlates to barrier softness outside.",
      lifestyleTip:
        "Cook meals at home with whole ingredients and replace vegetable oils with extra virgin olive oil or avocado oil.",
    },

    precautions: [
      "Moisturize your skin at least twice daily using rich ointment-based or ceramide-infused creams",
      "Avoid very hot baths or showers; keep water lukewarm and limit duration to 10 minutes",
      "Gently pat the skin dry with a soft towel rather than rubbing vigorously",
      "Use an indoor humidifier during dry winter months to maintain ambient humidity above 45%",
      "Practice stress-reduction techniques (meditation, breathwork, gentle walking) to prevent stress-induced flare-ups",
    ],

    seekHelp:
      "Consult a healthcare professional or dermatologist if your eczema is spreading, fails to respond to over-the-counter moisturizers, or becomes warm, crusty, or oozing.",
  },

  SC: {
    code: "SC",
    name: "Scabies",
    subtitle:
      "A highly contagious parasitic infestation caused by Sarcoptes scabiei mites burrowing into the skin.",
    icon: "🔬",
    type: "Contagious",

    about:
      "Scabies is a contagious parasitic skin infestation. While medical treatment (such as prescription 5% permethrin cream or oral ivermectin) is strictly required to eradicate the mites, targeted nutrition accelerates tissue regeneration, boosts immune defense, and reduces severe nocturnal itching.",

    causes: [
      "Infestation by the microscopic mite Sarcoptes scabiei var. hominis",
      "Direct, prolonged skin-to-skin contact with an infested individual",
      "Sharing bedding, blankets, towels, or unwashed clothing with an infested person",
      "Crowded residential environments, childcare centers, or communal living",
      "Delayed diagnosis allowing mites to reproduce and spread across body folds",
    ],

    symptoms: [
      "Overwhelming, intense itching that becomes drastically worse at night",
      "Thin, pencil-like burrow tracks on the skin (between fingers, wrists, armpits, belt line)",
      "Pimple-like itchy rash and small blister-like bumps",
      "Secondary bacterial sores from aggressive scratching",
      "Crusting of the skin in severe cases",
    ],

    diet: {
      overview:
        "A nutrient-dense, antimicrobial, and immune-strengthening diet accelerates skin tissue repair and prevents secondary bacterial infections.",
      foodsToEat: [
        {
          food: "Fresh Raw Crushed Garlic & Onions",
          badge: "Allicin & Sulfur",
          benefit:
            "Contains potent natural antimicrobial allicin and sulfur compounds that support immune defense against parasitic burden.",
        },
        {
          food: "Beta-Carotene Powerhouses (Sweet Potatoes, Carrots, Butternut Squash)",
          badge: "Tissue Repair",
          benefit:
            "Supplies Vitamin A needed for rapid re-epithelialization of burrowed and excoriated skin layers.",
        },
        {
          food: "Vitamin C Citrus & Bell Peppers",
          badge: "Collagen & Immunity",
          benefit:
            "Enhances neutrophil activity to prevent secondary bacterial infections (impetigo) in scratched open sores.",
        },
        {
          food: "Clean High-Protein Sources (Lentils, Organic Eggs, Chicken Breast)",
          badge: "Wound Healing",
          benefit:
            "Delivers amino acids essential for rebuilding damaged epidermal and dermal layers.",
        },
        {
          food: "Zinc-Dense Seeds (Pumpkin Seeds, Sesame, Hemp)",
          badge: "Zinc Barrier",
          benefit:
            "Essential for cellular regeneration, zinc accelerates the closing of open scratches and mite burrows.",
        },
        {
          food: "Herbal Teas (Chamomile, Passionflower, Lemon Balm)",
          badge: "Nerve Soother",
          benefit:
            "Calms the central nervous system and mitigates the severe nocturnal itch sensation before bedtime.",
        },
      ],
      foodsToAvoid: [
        {
          food: "Refined Sugars & Sweetened Pastries",
          badge: "Immune Suppressant",
          reason:
            "Sugar temporarily suppresses white blood cell phagocytosis, slowing wound healing and inviting bacterial complications.",
        },
        {
          food: "Alcohol & High-Caffeine Energy Drinks",
          badge: "Histamine Trigger",
          reason:
            "Spikes peripheral blood flow, dehydrates skin cells, and drastically intensifies nocturnal itch reflexes.",
        },
        {
          food: "Ultra-Processed Fast Foods & Trans Fats",
          badge: "Empty Calories",
          reason:
            "Starves the body of cellular building blocks needed to heal physical mite burrows.",
        },
        {
          food: "Excessive Spicy Foods & Hot Chilies",
          badge: "Thermal Irritant",
          reason:
            "Increases body temperature and induces sweating, which aggravates mite-related pruritus.",
        },
        {
          food: "Artificial Sweeteners & Preservatives",
          badge: "Metabolic Burden",
          reason:
            "Places unnecessary metabolic detox burden on the liver while it processes anti-parasitic medications.",
        },
      ],
      hydrationTip:
        "Drink 3 liters of water and electrolyte-rich broths daily to flush metabolic waste from mite eradication.",
      lifestyleTip:
        "Strictly wash all clothing, towels, and bed linens in hot water (at least 60°C / 140°F) and dry on high heat to prevent re-infestation.",
    },

    precautions: [
      "Apply prescription permethrin 5% cream from the neck down to the soles of your feet for the full recommended duration (8–14 hours)",
      "All household members and sexual partners must be treated simultaneously, even if they have no symptoms",
      "Wash all clothing, bedding, and towels used in the last 4 days in hot water and dry on high heat",
      "Items that cannot be washed should be sealed in an airtight plastic bag for at least 72 hours (mites die without human skin contact)",
      "Avoid all skin-to-skin contact with others until treatment is completed",
    ],

    seekHelp:
      "Medical prescription treatment is mandatory for scabies; over-the-counter creams cannot eliminate mites. Consult a doctor immediately if you or family members suspect scabies.",
  },

  SD: {
    code: "SD",
    name: "Seborrheic Dermatitis",
    subtitle:
      "A chronic inflammatory condition affecting sebaceous gland-rich areas (scalp, eyebrows, chest) driven by Malassezia yeast.",
    icon: "🫧",
    type: "Common",

    about:
      "Seborrheic dermatitis causes flaky, greasy scales and redness on sebum-rich areas of the body. It is strongly linked to overproliferation of Malassezia yeast, which feeds on skin lipids. An anti-fungal, low-glycemic diet helps starve the yeast and rebalances sebum production.",

    causes: [
      "Overgrowth and inflammatory reaction to Malassezia yeast naturally residing on the skin",
      "Excessive sebum (oil) production by overactive sebaceous glands",
      "Cold, dry winter weather and low ambient humidity",
      "High stress levels, anxiety, and fatigue that alter hormonal and immune balance",
      "Dietary intake high in refined sugars and yeasty fermented foods",
    ],

    symptoms: [
      "Stubborn, greasy yellowish or white flakes (dandruff) on scalp, hairline, or beard",
      "Patches of red, irritated, and greasy skin covered with flaky scales",
      "Scaling in the eyebrows, sides of the nose, ears, eyelids, and central chest",
      "Mild to moderate itching or burning sensation in affected areas",
      "Skin sensitivity that worsens during cold weather or stressful periods",
    ],

    diet: {
      overview:
        "An anti-fungal, low-sugar, low-yeast dietary protocol deprives Malassezia yeast of metabolic fuel while stabilizing sebum secretion.",
      foodsToEat: [
        {
          food: "Anti-Fungal Herbs (Fresh Oregano, Thyme, Rosemary, Garlic)",
          badge: "Anti-Fungal",
          benefit:
            "Contains carvacrol, thymol, and allicin, natural compounds proven to inhibit yeast and fungal proliferation.",
        },
        {
          food: "Cold-Pressed Extra Virgin Coconut Oil",
          badge: "Caprylic Acid",
          benefit:
            "Rich in caprylic and lauric acids which disrupt fungal and yeast cell membranes from within.",
        },
        {
          food: "B-Vitamin Rich Foods (Lentils, Spinach, Almonds, Quinoa)",
          badge: "B-Complex",
          benefit:
            "Biotin (B7), B6, and B3 are vital cofactors in regulating epidermal lipid metabolism and sebum gland activity.",
        },
        {
          food: "Cruciferous Vegetables (Cauliflower, Broccoli, Cabbage)",
          badge: "DIM / Detox",
          benefit:
            "Contains diindolylmethane (DIM) which supports balanced hormone metabolism that governs oil production.",
        },
        {
          food: "Antioxidant Berries & Pomegranates",
          badge: "Polyphenols",
          benefit:
            "Dense in anthocyanins and ellagic acid that guard sebum lipids from oxidative degradation.",
        },
        {
          food: "Unsweetened Raw Apple Cider Vinegar (in water)",
          badge: "pH Balance",
          benefit:
            "Supports healthy stomach acid and internal microbiome balance, discouraging opportunistic yeast overgrowth.",
        },
      ],
      foodsToAvoid: [
        {
          food: "Refined Carbohydrates (White Bread, Pastries, White Rice)",
          badge: "High Glycemic",
          reason:
            "Rapidly raises blood sugar, elevating sebum oil production and providing prime fuel for Malassezia yeast.",
        },
        {
          food: "Beer, Wine & Yeasty Alcoholic Drinks",
          badge: "Yeast Fuel",
          reason:
            "Fermented beverages contain active yeasts and simple sugars that directly aggravate seborrheic flaking.",
        },
        {
          food: "Refined White Sugar, Candy & Sweetened Sodas",
          badge: "Yeast Proliferation",
          reason:
            "Creates an ideal metabolic environment for fungal organism expansion throughout the body and skin.",
        },
        {
          food: "Aged Cheeses & High-Fat Dairy",
          badge: "Sebum Stimulant",
          reason:
            "High saturated dairy fats stimulate 5-alpha reductase, increasing sebum secretion on the scalp and face.",
        },
        {
          food: "Deep-Fried & Greasy Fast Foods",
          badge: "Oxidized Lipids",
          reason:
            "Increases lipid peroxidation in skin sebum, provoking inflammatory redness and scale formation.",
        },
        {
          food: "Hydrogenated Margarine & Trans Fats",
          badge: "Damaged Fats",
          reason:
            "Disrupts natural skin barrier fluidity and impairs healthy sebum production.",
        },
      ],
      hydrationTip:
        "Drink plenty of water and green tea. Proper hydration reduces the concentration of irritant fatty acids in skin oil.",
      lifestyleTip:
        "Wash hair with targeted anti-fungal shampoos (ketoconazole, zinc pyrithione, or selenium sulfide) and leave on scalp for 5 minutes before rinsing.",
    },

    precautions: [
      "Use medicated anti-dandruff shampoos containing ketoconazole, zinc pyrithione, or salicylic acid",
      "Avoid heavy hair oils, pomades, or greasy face creams that feed yeast organisms",
      "Wash face and scalp regularly with gentle, oil-free cleansers",
      "Avoid scratching or peeling off crusts, which can cause bleeding and secondary infections",
      "Get moderate natural sunlight exposure (10–15 minutes), which naturally inhibits yeast growth",
    ],

    seekHelp:
      "Consult a doctor or dermatologist if the flaking and redness fail to improve with medicated shampoos, spreads over large body areas, or becomes painful and swollen.",
  },

  TC: {
    code: "TC",
    name: "Tinea Corporis",
    subtitle:
      "A superficial fungal infection of the body (commonly called Ringworm) caused by dermatophyte fungi.",
    icon: "⭕",
    type: "Contagious Fungal",

    about:
      "Tinea corporis (ringworm) is a fungal infection characterized by characteristic circular, red, raised-border lesions. While antifungal medication is the primary curative treatment, an anti-fungal, zero-sugar diet starves dermatophytes and speeds skin clearance.",

    causes: [
      "Infection by dermatophyte fungi (Trichophyton, Microsporum, or Epidermophyton)",
      "Direct skin-to-skin contact with an infected human or pet (especially cats and dogs)",
      "Sharing contaminated gym equipment, wrestling mats, towels, combs, or clothing",
      "Warm, humid, sweaty environments that promote rapid fungal spore growth",
      "Weakened immune defenses, excessive perspiration, or compromised skin barrier",
    ],

    symptoms: [
      "Circular or ring-shaped red rash with elevated, scaly edges and clearer center",
      "Intense itching, stinging, and redness along the expanding outer ring border",
      "Small bumps or blister-like sores along the perimeter of the circular patch",
      "Overlapping or multiple expanding rings across torso, arms, or legs",
      "Dry, peeling, or flaky skin in the affected area",
    ],

    diet: {
      overview:
        "A strict anti-fungal, zero-sugar, low-yeast protocol deprives dermatophyte fungi of glucose and cellular fuel, accelerating topical and oral antifungal treatment.",
      foodsToEat: [
        {
          food: "Freshly Crushed Raw Garlic",
          badge: "Potent Antifungal",
          benefit:
            "Releases active allicin within minutes, one of nature's strongest natural antifungal and antimycotic compounds.",
        },
        {
          food: "Virgin Coconut Oil (Cold-Pressed)",
          badge: "Caprylic & Lauric",
          benefit:
            "Medium-chain triglycerides (MCTs) integrate into and dissolve fungal cell membranes.",
        },
        {
          food: "Ginger & Turmeric Roots",
          badge: "Antimycotic",
          benefit:
            "Powerful rhizomes containing gingerols and curcumin that inhibit fungal hyphae growth and reduce rash redness.",
        },
        {
          food: "Leafy Alkaline Greens (Celery, Spinach, Cucumber, Kale)",
          badge: "Alkalizing",
          benefit:
            "Alkalizes body tissues and creates a biological environment unfavorable for dermatophyte spore expansion.",
        },
        {
          food: "Pumpkin, Chia & Flax Seeds",
          badge: "Zinc & Essential Fats",
          benefit:
            "Supplies the zinc and essential fatty acids needed to repair the annular lesions and rebuild healthy skin.",
        },
        {
          food: "Plain Unsweetened Probiotic Kefir or Yogurt",
          badge: "Flora Balance",
          benefit:
            "Re-establishes a strong population of protective bacteria that outcompete opportunistic fungal species.",
        },
      ],
      foodsToAvoid: [
        {
          food: "Refined White Sugar & High-Fructose Syrups",
          badge: "Fungal Fuel",
          reason:
            "Fungi depend directly on glucose for cellular division and spore germination; cutting sugar starves them.",
        },
        {
          food: "Yeast-Containing Breads, Pizza Dough & Pastries",
          badge: "Yeast Cross-Reaction",
          reason:
            "Active baker's yeast and leavened grains can trigger cross-reactive immune strain during fungal infections.",
        },
        {
          food: "Mushrooms & Edible Fungi",
          badge: "Fungal Species",
          reason:
            "Can stimulate systemic fungal sensitivity and cross-reactions while fighting an active tinea infection.",
        },
        {
          food: "Alcohol, Beer & Wine",
          badge: "Fermentation Sugars",
          reason:
            "High in fermentation byproducts and simple sugars that impair white blood cell fungal defense.",
        },
        {
          food: "Sweetened Fruit Juices & Dried Fruits",
          badge: "Concentrated Fructose",
          reason:
            "Concentrated fructose causes rapid spikes in blood sugar that feed fungal dermatophytes.",
        },
        {
          food: "Processed Sweet Condiments (Ketchup, Sweet Relish, BBQ Sauce)",
          badge: "Hidden Sugars",
          reason:
            "Loaded with high-fructose corn syrup, artificial vinegars, and preservatives that encourage fungal persistence.",
        },
      ],
      hydrationTip:
        "Drink clean filtered water infused with lemon or crushed mint throughout the day to support kidney filtration of fungal die-off byproducts.",
      lifestyleTip:
        "Strictly avoid sharing towels or clothing, keep the skin clean and dry, and change sweaty workout clothes immediately.",
    },

    precautions: [
      "Apply topical antifungal medication (clotrimazole, terbinafine, miconazole) consistently for at least 1–2 weeks after the rash appears healed",
      "Keep the affected skin thoroughly clean, cool, and dry, especially after exercising",
      "Do not share personal towels, clothing, bedding, or combs with family members",
      "Wash clothing and gym towels in hot water with disinfectant laundry additive",
      "Have household pets examined by a veterinarian, as cats and dogs are frequent asymptomatic ringworm carriers",
    ],

    seekHelp:
      "Consult a doctor or dermatologist if the ring-shaped rash spreads rapidly, affects the scalp, beard, or nails, or does not improve after 2 weeks of over-the-counter antifungal application.",
  },
};

export default function DiseaseDetails() {
  const { code } = useParams();
  const navigate = useNavigate();

  const disease = diseaseData[code?.toUpperCase()];

  if (!disease) {
    return (
      <div style={styles.notFoundPage}>
        <div style={styles.notFoundCard}>
          <div style={{ fontSize: "60px", marginBottom: "15px" }}>🔍</div>
          <h1 style={{ fontSize: "36px", color: "#29251f", margin: "0 0 12px" }}>
            Condition Not Found
          </h1>
          <p style={{ color: "#756c61", fontSize: "16px", marginBottom: "25px" }}>
            We could not find detailed medical or dietary information for the code "{code}".
          </p>
          <button
            onClick={() => navigate("/diseases")}
            style={styles.primaryButton}
          >
            ← Back to All Conditions
          </button>
        </div>
      </div>
    );
  }

  const diet = disease.diet;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* TOP BREADCRUMB / BACK */}
        <div style={{ marginBottom: "28px" }}>
          <button
            onClick={() => navigate("/diseases")}
            style={styles.backButton}
          >
            ← Back to All Skin Conditions
          </button>
        </div>

        {/* HERO HEADER */}
        <div style={styles.heroCard}>
          <div style={styles.heroTop}>
            <div style={styles.iconBox}>{disease.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={styles.badgeRow}>
                <span style={styles.codeBadge}>{disease.code}</span>
                <span style={styles.typeBadge}>{disease.type}</span>
                <span style={styles.dietAvailableBadge}>🥗 Diet Guide Included</span>
              </div>
              <h1 style={styles.title}>{disease.name}</h1>
              <p style={styles.subtitle}>{disease.subtitle}</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: ABOUT */}
        <div style={styles.contentCard}>
          <div style={styles.sectionEyebrow}>ABOUT THIS CONDITION</div>
          <h2 style={styles.sectionHeading}>What is {disease.name}?</h2>
          <p style={styles.bodyText}>{disease.about}</p>
        </div>

        {/* SECTION 2: CAUSES & SYMPTOMS (TWO COLUMNS) */}
        <div style={styles.twoColumnGrid}>
          {/* CAUSES */}
          <div style={styles.columnCard}>
            <div style={styles.sectionEyebrow}>POTENTIAL TRIGGERS</div>
            <h3 style={styles.cardHeading}>Causes & Risk Factors</h3>
            <ul style={styles.list}>
              {disease.causes.map((cause, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span style={styles.bulletDot}>•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SYMPTOMS */}
          <div style={styles.columnCard}>
            <div style={styles.sectionEyebrow}>CLINICAL SIGNS</div>
            <h3 style={styles.cardHeading}>Common Symptoms</h3>
            <ul style={styles.list}>
              {disease.symptoms.map((symptom, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span style={styles.bulletDot}>•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: DIET & NUTRITION GUIDE (CORE USER REQUEST)    */}
        {/* ======================================================== */}
        <div id="diet-section" style={styles.dietMasterCard}>
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div style={styles.dietEyebrow}>
              🥗 CLINICAL NUTRITION & HEALING DIET
            </div>
            <h2 style={styles.dietMainHeading}>
              Dietary Guide for {disease.name}
            </h2>
            <p style={styles.dietSubheading}>{diet.overview}</p>
          </div>

          {/* TWO SIDES: FOODS TO EAT vs FOODS TO AVOID */}
          <div style={styles.dietGrid}>
            {/* FOODS TO EAT */}
            <div style={styles.eatBox}>
              <div style={styles.eatHeader}>
                <span style={{ fontSize: "24px" }}>✅</span>
                <div>
                  <h3 style={styles.eatTitle}>Foods to Eat (Healing & Anti-Inflammatory)</h3>
                  <div style={styles.eatSubtitle}>
                    Items that accelerate skin barrier repair and calm inflammation
                  </div>
                </div>
              </div>

              <div style={styles.foodList}>
                {diet.foodsToEat.map((item, idx) => (
                  <div key={idx} style={styles.foodCardEat}>
                    <div style={styles.foodCardTop}>
                      <span style={styles.foodName}>{item.food}</span>
                      <span style={styles.foodBadgeEat}>{item.badge}</span>
                    </div>
                    <div style={styles.foodBenefitText}>{item.benefit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOODS TO AVOID */}
            <div style={styles.avoidBox}>
              <div style={styles.avoidHeader}>
                <span style={{ fontSize: "24px" }}>🚫</span>
                <div>
                  <h3 style={styles.avoidTitle}>Foods to Avoid (Not Eaten Items / Triggers)</h3>
                  <div style={styles.avoidSubtitle}>
                    Items known to spike inflammation, histamine, or exacerbate flares
                  </div>
                </div>
              </div>

              <div style={styles.foodList}>
                {diet.foodsToAvoid.map((item, idx) => (
                  <div key={idx} style={styles.foodCardAvoid}>
                    <div style={styles.foodCardTop}>
                      <span style={styles.foodNameAvoid}>{item.food}</span>
                      <span style={styles.foodBadgeAvoid}>{item.badge}</span>
                    </div>
                    <div style={styles.foodReasonText}>{item.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIETITIAN ACTION PLAN PRO-TIPS */}
          <div style={styles.dietProTipCard}>
            <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "28px" }}>💧</span>
              <div>
                <strong style={{ color: "#7a4e00", fontSize: "16px", display: "block", marginBottom: "4px" }}>
                  Hydration & Barrier Protection Rule
                </strong>
                <p style={{ margin: "0 0 12px", color: "#613e00", fontSize: "14px", lineHeight: "1.6" }}>
                  {diet.hydrationTip}
                </p>
                <strong style={{ color: "#7a4e00", fontSize: "14px", display: "block", marginBottom: "4px" }}>
                  💡 Practical Lifestyle Advice:
                </strong>
                <p style={{ margin: 0, color: "#613e00", fontSize: "14px", lineHeight: "1.6" }}>
                  {diet.lifestyleTip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRECAUTIONS */}
        <div style={styles.contentCard}>
          <div style={styles.sectionEyebrow}>DAILY MANAGEMENT</div>
          <h2 style={styles.sectionHeading}>Doctor-Approved Precautions</h2>
          <div style={styles.precautionsGrid}>
            {disease.precautions.map((precaution, idx) => (
              <div key={idx} style={styles.precautionItem}>
                <span style={styles.precautionNumber}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p style={styles.precautionText}>{precaution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: WHEN TO SEEK MEDICAL HELP */}
        <div style={styles.seekHelpCard}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "30px" }}>🩺</span>
            <div>
              <div style={styles.seekHelpEyebrow}>WHEN TO SEEK PROFESSIONAL CARE</div>
              <h3 style={styles.seekHelpHeading}>Consult a Board-Certified Dermatologist</h3>
              <p style={styles.seekHelpBody}>{disease.seekHelp}</p>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION CTA */}
        <div style={styles.bottomCtaCard}>
          <div>
            <h4 style={{ margin: "0 0 6px", fontSize: "18px", color: "#29251f" }}>
              Have a suspicious skin lesion?
            </h4>
            <p style={{ margin: 0, color: "#625a51", fontSize: "14px" }}>
              Upload a clear photo for an AI-assisted classification and history report.
            </p>
          </div>
          <button
            onClick={() => navigate("/check-skin")}
            style={styles.scanNowButton}
          >
            Scan Your Skin Now →
          </button>
        </div>

        {/* MEDICAL DISCLAIMER */}
        <div style={styles.disclaimerBox}>
          <span style={{ fontSize: "18px", color: "#b95731" }}>ⓘ</span>
          <p style={styles.disclaimerText}>
            <strong>Educational & Nutritional Information Disclaimer:</strong> DermaScan provides AI
            classification and nutritional guides for educational and informational purposes only. It is not
            a clinical medical diagnosis. Individual responses to foods vary. Always consult a licensed healthcare
            provider or registered dietitian before implementing significant dietary restrictions or when managing
            severe skin conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// STYLES (SAME COLOR PALETTE + POLISHED RESPONSIVE TYPOGRAPHY)
// ========================================================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ee",
    color: "#29251f",
    padding: "40px 20px 80px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "1080px",
    margin: "0 auto",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#756c61",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 0",
    transition: "color 0.2s",
  },
  heroCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "22px",
    padding: "36px",
    marginBottom: "28px",
    boxShadow: "0 8px 30px rgba(41, 37, 31, 0.04)",
  },
  heroTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "26px",
    flexWrap: "wrap",
  },
  iconBox: {
    width: "80px",
    height: "80px",
    borderRadius: "18px",
    background: "#eee5d9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    flexShrink: 0,
  },
  badgeRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  codeBadge: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    color: "#b95731",
    background: "#f8ece8",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  typeBadge: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#625a51",
    background: "#eee5d9",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  dietAvailableBadge: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#1e682a",
    background: "#eef8f0",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "clamp(32px, 5vw, 46px)",
    color: "#29251f",
    lineHeight: "1.1",
    fontWeight: "700",
  },
  subtitle: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#625a51",
  },
  contentCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "20px",
    padding: "34px",
    marginBottom: "26px",
    boxShadow: "0 6px 24px rgba(41, 37, 31, 0.03)",
  },
  sectionEyebrow: {
    fontSize: "11px",
    letterSpacing: "2.5px",
    fontWeight: "700",
    color: "#b95731",
    marginBottom: "8px",
  },
  sectionHeading: {
    margin: "0 0 16px",
    fontSize: "clamp(22px, 3.5vw, 28px)",
    color: "#29251f",
    fontWeight: "700",
  },
  bodyText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#524a41",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
    marginBottom: "28px",
  },
  columnCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 6px 24px rgba(41, 37, 31, 0.03)",
  },
  cardHeading: {
    margin: "0 0 18px",
    fontSize: "22px",
    color: "#29251f",
    fontWeight: "700",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  listItem: {
    display: "flex",
    gap: "12px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#524a41",
    alignItems: "flex-start",
  },
  bulletDot: {
    color: "#b95731",
    fontSize: "18px",
    lineHeight: "1",
    fontWeight: "700",
  },

  // DIET SECTION STYLES
  dietMasterCard: {
    background: "#fffdfa",
    border: "2px solid #e2d7c7",
    borderRadius: "24px",
    padding: "clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 28px)",
    marginBottom: "28px",
    boxShadow: "0 10px 35px rgba(41, 37, 31, 0.05)",
  },
  dietEyebrow: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "3px",
    color: "#b95731",
    marginBottom: "10px",
  },
  dietMainHeading: {
    margin: "0 0 14px",
    fontSize: "clamp(24px, 4.5vw, 36px)",
    color: "#29251f",
    fontWeight: "700",
  },
  dietSubheading: {
    maxWidth: "760px",
    margin: "0 auto",
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#625a51",
  },
  dietGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "20px",
    marginBottom: "28px",
  },
  eatBox: {
    background: "#f4fbf5",
    border: "1px solid #c2e8c9",
    borderRadius: "18px",
    padding: "26px",
  },
  eatHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid #d0eed5",
  },
  eatTitle: {
    margin: "0 0 3px",
    fontSize: "18px",
    color: "#1c5d29",
    fontWeight: "700",
  },
  eatSubtitle: {
    fontSize: "13px",
    color: "#2d753b",
    lineHeight: "1.4",
  },
  avoidBox: {
    background: "#fef6f5",
    border: "1px solid #f6cfcb",
    borderRadius: "18px",
    padding: "26px",
  },
  avoidHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    paddingBottom: "14px",
    borderBottom: "1px solid #fad7d4",
  },
  avoidTitle: {
    margin: "0 0 3px",
    fontSize: "18px",
    color: "#a4251a",
    fontWeight: "700",
  },
  avoidSubtitle: {
    fontSize: "13px",
    color: "#b43226",
    lineHeight: "1.4",
  },
  foodList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  foodCardEat: {
    background: "#ffffff",
    border: "1px solid #d4eed8",
    borderRadius: "12px",
    padding: "16px 18px",
    boxShadow: "0 2px 8px rgba(28, 93, 41, 0.04)",
  },
  foodCardAvoid: {
    background: "#ffffff",
    border: "1px solid #f9dcd9",
    borderRadius: "12px",
    padding: "16px 18px",
    boxShadow: "0 2px 8px rgba(164, 37, 26, 0.04)",
  },
  foodCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
    flexWrap: "wrap",
  },
  foodName: {
    fontWeight: "700",
    color: "#1c5d29",
    fontSize: "15px",
  },
  foodNameAvoid: {
    fontWeight: "700",
    color: "#a4251a",
    fontSize: "15px",
  },
  foodBadgeEat: {
    fontSize: "11px",
    fontWeight: "700",
    background: "#e3f5e7",
    color: "#1c5d29",
    padding: "3px 9px",
    borderRadius: "12px",
  },
  foodBadgeAvoid: {
    fontSize: "11px",
    fontWeight: "700",
    background: "#fde8e5",
    color: "#a4251a",
    padding: "3px 9px",
    borderRadius: "12px",
  },
  foodBenefitText: {
    fontSize: "13.5px",
    color: "#4a4239",
    lineHeight: "1.6",
  },
  foodReasonText: {
    fontSize: "13.5px",
    color: "#4a4239",
    lineHeight: "1.6",
  },
  dietProTipCard: {
    background: "#fff9ee",
    border: "1px solid #ecd8b3",
    borderRadius: "16px",
    padding: "24px",
  },

  // PRECAUTIONS
  precautionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    marginTop: "18px",
  },
  precautionItem: {
    background: "#f8f4ec",
    border: "1px solid #ded5c8",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  },
  precautionNumber: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#b95731",
    background: "#ebdcc9",
    padding: "4px 8px",
    borderRadius: "8px",
    flexShrink: 0,
  },
  precautionText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#524a41",
  },

  // SEEK HELP & BOTTOM
  seekHelpCard: {
    background: "#fbf6ee",
    border: "1px solid #e2d4c0",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "28px",
  },
  seekHelpEyebrow: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#b95731",
    marginBottom: "4px",
  },
  seekHelpHeading: {
    margin: "0 0 10px",
    fontSize: "20px",
    color: "#29251f",
    fontWeight: "700",
  },
  seekHelpBody: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#524a41",
  },
  bottomCtaCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "20px",
    padding: "28px 34px",
    marginBottom: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    boxShadow: "0 6px 20px rgba(41, 37, 31, 0.04)",
  },
  scanNowButton: {
    background: "#b95731",
    color: "#ffffff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(185, 87, 49, 0.25)",
  },
  disclaimerBox: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    padding: "20px 24px",
    background: "#f0e9df",
    borderRadius: "14px",
    border: "1px solid #dfd4c4",
  },
  disclaimerText: {
    margin: 0,
    fontSize: "12.5px",
    lineHeight: "1.7",
    color: "#756c61",
  },
  notFoundPage: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#f7f4ee",
  },
  notFoundCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "22px",
    padding: "45px",
    textAlign: "center",
    maxWidth: "500px",
  },
  primaryButton: {
    background: "#29251f",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
};
