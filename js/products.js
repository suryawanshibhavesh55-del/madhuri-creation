// Madhuri Creation - Product Catalog Data Store

const PRODUCT_CATALOG = [
  // ================= HANDMADE SOAPS (Price: ₹99, Weight: 100g) =================
  // Soap Product 1 (First Product)
  {
    id: "soap-1",
    name: "Artisanal Natural Herbal Soap Bar",
    category: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    rating: 5,
    tag: "Bestseller",
    description: "Crafted with carefully selected natural ingredients including Coffee, Turmeric, Sandalwood, Almond, Cashew, and Rice to gently cleanse, nourish, and moisturize your skin for a healthy, glowing bathing experience.",
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
  // Soap Product 2 (Last Product / Packaged Box)
  {
    id: "soap-6",
    name: "Madhuri Naturals Signature Packaged Soap Bar",
    category: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    rating: 5,
    tag: "Gift Ready",
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

  // ================= HANDCRAFTED CANDLES (Price: ₹200 for all candles) =================
  {
    id: "candle-1",
    name: "Artisanal Pink Flower Candle Set",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "7 Pieces Set",
    rating: 5,
    tag: "Best Value",
    description: "A stunning set of 7 handcrafted floral candles in vibrant and soft pink hues. Carefully hand-poured with lotus and peony petal detail for festive elegance.",
    features: [
      "7 Handcrafted Pieces",
      "Vibrant Pink Floral Sculptures",
      "Long Clean Burn",
      "Perfect Festive Centerpiece"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM.jpeg"
    ]
  },
  {
    id: "candle-2",
    name: "Luxury Blossom Rose Candle Collection",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "5 Pieces Luxury Tray Set",
    rating: 5,
    tag: "Luxury Gift",
    description: "Exquisitely detailed rose and peony flower candles presented on a golden luxury tray. Handcrafted with gold leaf accents for grand celebrations and home decor.",
    features: [
      "5 Sculpted Rose & Peony Candles",
      "Gold Flake Petal Accents",
      "Luxury Presentation",
      "Warm Natural Glow"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.18 PM.jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg"
    ]
  },
  {
    id: "candle-3",
    name: "Handcrafted Crimson Lotus Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Sculpted Lotus Candle",
    rating: 5,
    tag: "Artisanal Pick",
    description: "Intricately hand-sculpted lotus petal candle in deep crimson red. Symbolizes warmth, purity, and spiritual radiance in sacred home spaces.",
    features: [
      "Deep Crimson Red Petals",
      "Intricate Lotus Carving",
      "Eco Wax Blend",
      "Smokeless Wick"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg"
    ]
  },
  {
    id: "candle-4",
    name: "Royal Dual-Tone Crimson & Dark Lotus Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Dual-Tone Sculpted Lotus",
    rating: 5,
    tag: "Dual-Tone",
    description: "Unique hand-poured lotus candle featuring rich crimson red inner petals transitioning into obsidian dark base petals for a striking aesthetic.",
    features: [
      "Dual-Tone Color Gradient",
      "Handcrafted Petal Alignment",
      "Premium Wax Blend",
      "Dramatic Ambient Glow"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg"
    ]
  },
  {
    id: "candle-5",
    name: "Handcrafted Floral Ambient Table Candle Set",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "7 Lit Flower Candles Set",
    rating: 5,
    tag: "Festive Favorite",
    description: "Assorted handcrafted blooming flower candles designed to illuminate dinner tables, diwali rangolis, and intimate celebrations with cozy floral radiance.",
    features: [
      "7 Assorted Floral Candles",
      "Floating / Tabletop Suitable",
      "Warm Soft Light",
      "Artisanal Craftsmanship"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg"
    ]
  },
  {
    id: "candle-6",
    name: "Sculpted Blooming Rose & Botanical Leaf Candle",
    category: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Blooming Rose Candle",
    rating: 5,
    tag: "Botanical",
    description: "A lifelike blooming rose candle in romantic pink tones resting gracefully on a sculpted green leafy base. Adds romantic elegance to any bedside or mantelpiece.",
    features: [
      "Detailed Rose & Leaf Base",
      "Soft Pink Rose Wax",
      "Gentle Ambient Flame",
      "Thoughtful Favor & Gift"
    ],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM.jpeg",
    additionalImages: [
      "assets/WhatsApp Image 2026-08-28 at 12.56.21 PM.jpeg"
    ]
  }
];

if (typeof window !== 'undefined') {
  window.PRODUCT_CATALOG = PRODUCT_CATALOG;
}
