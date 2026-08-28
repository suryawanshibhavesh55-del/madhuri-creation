// Madhuri Creation - Product Catalog Data (Static Fallback & Reference Store)

window.PRODUCT_CATEGORIES = [
  {
    id: "soaps",
    name: "Handmade Soaps",
    slug: "soaps",
    subtitle: "Natural care, handcrafted with love. Pure ingredients & skin-nourishing moisture.",
    whatsappNumber: "8407913008"
  },
  {
    id: "candles",
    name: "Handcrafted Candles",
    slug: "candles",
    subtitle: "तुमच्या घराला सुंदर look आणि मनाला प्रसन्न करणारा fragrance देणाऱ्या handmade candles. Gifting, पूजा, decoration व रोजच्या वापरासाठी योग्य.",
    whatsappNumber: "8407913008"
  },
  {
    id: "custom-sup",
    name: "Customized Sup",
    slug: "custom-sup",
    subtitle: "तुमच्या खास समारंभासाठी सुंदर आणि आकर्षक Customized सुप (डोहाळे जेवण & मंगळागौर)",
    whatsappNumber: "8275892945"
  },
  {
    id: "custom-rangoli",
    name: "Customized Rangoli",
    slug: "custom-rangoli",
    subtitle: "सण, पूजा आणि शुभ प्रसंगांसाठी सुंदर, आकर्षक आणि पारंपरिक handmade rangoli designs.",
    whatsappNumber: "8275892945"
  }
];

window.PRODUCT_CATALOG = [
  // ================= 1. HANDMADE SOAPS (₹99) =================
  {
    id: "soap_1",
    name: "Artisanal Natural Herbal Soap Bar",
    category: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    rating: 5,
    tag: "Bestseller",
    whatsappNumber: "8407913008",
    description: "Crafted with carefully selected natural ingredients including Coffee, Turmeric, Sandalwood, Almond, Cashew, and Rice to gently cleanse, nourish, and moisturize your skin.",
    features: [
      "100% Natural Ingredients",
      "SLS Free & Paraben Free",
      "Nourishes & Moisturizes Skin",
      "Infused with Almond, Coffee & Turmeric"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM (1).jpeg",
    additionalImages: [
      "assets/soap_box_ingredients.jpg",
      "assets/WhatsApp Image 2026-08-28 at 12.56.24 PM (1).jpeg",
      "assets/WhatsApp Image 2026-08-28 at 12.56.25 PM.jpeg"
    ]
  },
  {
    id: "soap_2",
    name: "Madhuri Naturals Signature Packaged Soap Bar",
    category: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    rating: 5,
    tag: "Gift Ready",
    whatsappNumber: "8407913008",
    description: "Signature packaged 100g handmade natural soap housed in our luxury gold foil stamped box. Pure natural formulation containing Sandalwood, Cashew, Rice, and Sesame.",
    features: [
      "Gold Foil Stamped Box Packaging",
      "100g (When Packed)",
      "SLS Free & Paraben Free",
      "Ideal for Everyday Pampering & Gifting"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.25 PM.jpeg",
    additionalImages: [
      "assets/soap_box_ingredients.jpg",
      "assets/WhatsApp Image 2026-08-28 at 12.56.26 PM.jpeg",
      "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM (1).jpeg"
    ]
  },

  // ================= 2. HANDCRAFTED CANDLES (FULL 7 CANDLE PRODUCTS) =================
  {
    id: "candle_1",
    name: "Single Handcrafted Rose & Floral Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 60,
    weight: "Single Candle",
    specs: "1 Piece",
    rating: 5,
    tag: "Single Candle",
    whatsappNumber: "8407913008",
    description: "Handmade single rose floral candle crafted with care to add a beautiful look and a pleasant fragrance to your home. Ideal for everyday use, return gifts, and subtle decor.",
    features: [
      "Single Handcrafted Candle",
      "Pleasant Soothing Fragrance",
      "Smokeless Eco Wick",
      "Perfect For Return Gifts & Everyday Decor"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.21 PM.jpeg"]
  },
  {
    id: "candle_2",
    name: "Premium Sculpted Crimson Lotus Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 99,
    weight: "Premium Candle",
    specs: "1 Piece Premium",
    rating: 5,
    tag: "Premium Candle",
    whatsappNumber: "8407913008",
    description: "Exquisitely hand-sculpted lotus petal candle in deep crimson red. Symbolizes warmth, purity, and spiritual radiance in sacred home spaces.",
    features: [
      "Deep Crimson Red Petals",
      "Intricate Lotus Carving",
      "Eco Wax Blend & Smokeless Wick",
      "Ideal for Puja & Elegant Gifting"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg"]
  },
  {
    id: "candle_3",
    name: "Royal Dual-Tone Crimson & Dark Lotus Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 99,
    weight: "Premium Candle",
    specs: "Dual-Tone Lotus",
    rating: 5,
    tag: "Dual-Tone Premium",
    whatsappNumber: "8407913008",
    description: "Unique hand-poured lotus candle featuring rich crimson red inner petals transitioning into obsidian dark base petals for a striking aesthetic.",
    features: [
      "Dual-Tone Color Gradient",
      "Handcrafted Petal Alignment",
      "Premium Fragrance Blend",
      "Dramatic Ambient Glow"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg"]
  },
  {
    id: "candle_4",
    name: "Sculpted Blooming Rose & Botanical Leaf Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 60,
    weight: "Single Candle",
    specs: "Blooming Rose",
    rating: 5,
    tag: "Botanical Single",
    whatsappNumber: "8407913008",
    description: "A lifelike blooming rose candle in romantic pink tones resting gracefully on a sculpted green leafy base. Adds romantic elegance to any bedside or mantelpiece.",
    features: [
      "Detailed Rose & Leaf Base",
      "Soft Pink Rose Wax",
      "Gentle Ambient Flame",
      "Thoughtful Favor & Gift"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.21 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.22 PM.jpeg"]
  },
  {
    id: "candle_5",
    name: "Candle Combo – 7 Pcs Artisanal Pink Flower Set",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    weight: "7 pcs Combo",
    specs: "7 Pieces Set",
    rating: 5,
    tag: "Best Value Combo",
    whatsappNumber: "8407913008",
    description: "A stunning set of 7 handcrafted floral candles in vibrant and soft pink hues. Carefully hand-poured with lotus and peony petal detail for festive elegance.",
    features: [
      "7 Handcrafted Pieces Set",
      "Vibrant Pink Floral Sculptures",
      "Best Value Festival Combo",
      "Smokeless Long Glow"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.23 PM.jpeg"]
  },
  {
    id: "candle_6",
    name: "Luxury Blossom Rose Candle Collection",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    weight: "5 pcs Luxury Set",
    specs: "5 Pieces Tray Set",
    rating: 5,
    tag: "Luxury Gift Set",
    whatsappNumber: "8407913008",
    description: "Exquisitely detailed rose and peony flower candles presented on a golden luxury tray. Handcrafted with gold leaf accents for weddings, celebrations, and home decor.",
    features: [
      "5 Sculpted Rose & Peony Candles",
      "Gold Flake Petal Accents",
      "Luxury Presentation",
      "Warm Natural Glow"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.18 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg"]
  },
  {
    id: "candle_7",
    name: "Handcrafted Floral Ambient Table Candle Set",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    weight: "7 pcs Table Set",
    specs: "7 Lit Flower Set",
    rating: 5,
    tag: "Festive Set",
    whatsappNumber: "8407913008",
    description: "Assorted handcrafted blooming flower candles designed to illuminate dinner tables, diwali rangolis, and intimate celebrations with cozy floral radiance.",
    features: [
      "7 Assorted Floral Candles",
      "Floating / Tabletop Suitable",
      "Warm Soft Light",
      "Artisanal Craftsmanship"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg"]
  },

  // ================= 3. CUSTOMIZED SUP (₹500 | WhatsApp: 8275892945) =================
  {
    id: "sup_1",
    name: "डोहाळे जेवण सुप (Dohale Jevan Customized Sup)",
    category: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    rating: 5,
    tag: "डोहाळे जेवण Special",
    whatsappNumber: "8275892945",
    description: "तुमच्या खास डोहाळे जेवण समारंभासाठी सुंदर, आकर्षक आणि पारंपरिक Handmade Customized सुप. तुमचा फोटो, नाव व कार्यक्रमाचे नाव तुमच्या आवडीनुसार Customize करून मिळेल.",
    features: [
      "✨ सुंदर Handmade Decoration",
      "✨ आकर्षक Traditional Design",
      "📸 Photo & Name Customization",
      "🎨 तुमच्या पसंतीनुसार रंग व सजावट",
      "🎉 प्रत्येक कार्यक्रमासाठी Unique Design"
    ],
    customizationDetails: "Photo + Name + Event Name + Preferred Color & Decoration",
    perfectFor: "डोहाळे जेवण, सण-समारंभ & Special Gifting",
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg",
    additionalImages: [
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg",
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg"
    ]
  },
  {
    id: "sup_2",
    name: "पहिली मंगळागौर सुप - Crimson Red (Pahili Mangalagaur Customized Sup)",
    category: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    rating: 5,
    tag: "मंगळागौर Special",
    whatsappNumber: "8275892945",
    description: "खास पहिली मंगळागौर व मंगळागौर पूजेसाठी पारंपरिक लाल बांबू सुप. श्री व सौ. यांच्या फोटो व नावासह सुंदर फुले, मोती आणि गोटा-पट्टी सजावट.",
    features: [
      "📸 फोटो व नाव Customization",
      "🌸 सुरेख मोती व Floral बॉर्डर",
      "✨ मंगळागौर व सण-समारंभासाठी उपयुक्त",
      "💖 Madhuri Naturals Handcrafted Quality"
    ],
    customizationDetails: "Photo + Couple Name + Event Name",
    perfectFor: "पहिली मंगळागौर, मंगळागौर, सण-समारंभ",
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg",
    additionalImages: [
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg",
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg"
    ]
  },
  {
    id: "sup_3",
    name: "पहिली मंगळागौर सुप - Festive Yellow (Pahili Mangalagaur Customized Sup)",
    category: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    rating: 5,
    tag: "Festive Favorite",
    whatsappNumber: "8275892945",
    description: "तेजस्वी पिवळ्या रंगात सजवलेले मंगळागौर सुप. सुंदर फोटो प्रिंट, सोनेरी बॉर्डर व रंगीबेरंगी गोंडे (tassels) सजावटीसह.",
    features: [
      "💛 Radiant Yellow Traditional Base",
      "📸 Photo & Name Customization",
      "🎀 Gota Patti & Tassel Accents",
      "🎁 Perfect Special Celebration Gift"
    ],
    customizationDetails: "Photo + Name + Event Name + Tassel Colors",
    perfectFor: "मंगळागौर, पहिली मंगळागौर, Gifting",
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg",
    additionalImages: [
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg",
      "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg"
    ]
  },

  // ================= 4. CUSTOMIZED RANGOLI (Price on Request | WhatsApp: 8275892945) =================
  {
    id: "rangoli_1",
    name: "कमळ Rangoli (Handcrafted Pink Lotus Rangoli Mat Pair)",
    category: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    priceLabel: "Price on Request",
    weight: "Pair of Lotus Rangolis",
    rating: 5,
    tag: "Bestseller Rangoli",
    whatsappNumber: "8275892945",
    description: "सण, पूजा आणि शुभ प्रसंगांसाठी सुंदर, आकर्षक आणि पारंपरिक handmade कमळ rangoli designs. Design आणि size नुसार Price उपलब्ध.",
    features: [
      "🪷 सुंदर कमळ Petal Design",
      "✨ 100% Reusable Handmade Rangoli",
      "🎨 Size & Color Customization Available",
      "🪔 पूजा, गृहप्रवेश व सणासाठी उत्तम"
    ],
    perfectFor: "गौरी आगमन, गणपती, नवरात्र, दिवाळी, मंगळागौर, लक्ष्मीपूजन, गृहप्रवेश, पूजा",
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (1).jpeg",
    additionalImages: [
      "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (3).jpeg",
      "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.20 PM.jpeg"
    ]
  },
  {
    id: "rangoli_2",
    name: "देवी / गौराई Rangoli (\"गौराई आली\" Handmade Festive Set)",
    category: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    priceLabel: "Price on Request",
    weight: "Gaurai Rangoli Backdrop Set",
    rating: 5,
    tag: "गौराई विशेष",
    whatsappNumber: "8275892945",
    description: "गौरी आगमन, गणपती व नवरात्र पूजेसाठी पारंपरिक \"गौराई आली\" हस्तकला रांगोळी सेट. देवीचे सुरेख मुखवटे व कमळ पाकळ्यांची आकर्षक मांडणी.",
    features: [
      "🌺 देवी / गौराई विशेष Design",
      "🎨 Hand-Painted & Embellished Details",
      "👑 गौरी आगमन व नवरात्र पूजा स्पेशल",
      "📐 Design आणि size नुसार Price"
    ],
    perfectFor: "गौरी आगमन, नवरात्र, गणपती, गृहप्रवेश",
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (2).jpeg",
    additionalImages: [
      "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM.jpeg",
      "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.20 PM (1).jpeg"
    ]
  },
  {
    id: "rangoli_3",
    name: "शुभ चिन्ह श्री गणेश Rangoli (Ganesha Shubh Chinh Rangoli)",
    category: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    priceLabel: "Price on Request",
    weight: "Embossed Ganesha Rangoli",
    rating: 5,
    tag: "Shubh Chinh",
    whatsappNumber: "8275892945",
    description: "गणेशोत्सव, दिवाळी व गृहप्रवेशासाठी शुभ श्री गणेश चिन्ह असलेली लाल व सोनेरी हस्तकला रांगोळी plate.",
    features: [
      "🕉️ शुभ गणेश चिन्ह Motif",
      "✨ Rich Textured Red & Gold Finish",
      "🚪 दारासमोर व पूजेच्या चौरंगावर उत्तम",
      "🎁 Elegant Festival Gift"
    ],
    perfectFor: "गणपती, दिवाळी, गृहप्रवेश, पूजा",
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.18 PM.jpeg",
    additionalImages: []
  },
  {
    id: "rangoli_4",
    name: "Festival Special Crimson Lotus Rangoli Pair",
    category: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    priceLabel: "Price on Request",
    weight: "Pair of Crimson Lotus Cutouts",
    rating: 5,
    tag: "Festival Special",
    whatsappNumber: "8275892945",
    description: "सुरेख लाल व सोनेरी बॉर्डरच्या कमळाच्या पाकळ्यांची हस्तकला रांगोळी pair. दिवाळी, लक्ष्मीपूजन व सणांच्या सजावटीसाठी.",
    features: [
      "🪔 100% Reusable Festival Decor",
      "✨ Rich Crimson Red Glitter Texture",
      "🌸 Easy to Place & Rearrange",
      "💬 Enquiry / Customize on WhatsApp"
    ],
    perfectFor: "दिवाळी, लक्ष्मीपूजन, नवरात्र, पूजा",
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.20 PM.jpeg",
    additionalImages: [
      "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (1).jpeg"
    ]
  }
];
