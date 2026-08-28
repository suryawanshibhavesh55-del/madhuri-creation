const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());

// Multer memory storage for direct server-side Cloudinary upload
const upload = multer({ storage: multer.memoryStorage() });

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'b3phezvf',
  api_key: process.env.CLOUDINARY_API_KEY || '688326191474694',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'QLYERhx7crpqiE3rWOUz0JiXJr4'
});

// ================= MONGODB CONNECTION =================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://suryawanshibhavesh55_db_user:ax2Sz9MeocIKnTiM@cluster0.bvmw9g2.mongodb.net/madhuri_creation?retryWrites=true&w=majority';
const JWT_SECRET = process.env.JWT_SECRET || 'madhuri_creation_secret_key_2026_x89q2m';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'MadhuriAdmin2026!';

mongoose.set('bufferCommands', false);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('MongoDB Connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

// Ensure DB connected for every API request
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
      next();
    } catch (err) {
      return res.status(500).json({ error: 'Database Connection Error: ' + err.message });
    }
  } else {
    next();
  }
});

// ================= MONGOOSE SCHEMAS & MODELS =================
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  active: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  whatsappNumber: { type: String, default: '8407913008' }
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  categoryId: { type: String, required: true },
  categoryLabel: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: null },
  weight: { type: String, default: '' },
  specs: { type: String, default: '' },
  description: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  productType: { type: String, default: '' },
  sku: { type: String, default: '' },
  stock: { type: Number, default: 10 },
  mainImage: { type: String, required: true },
  additionalImages: [{ type: String }],
  cloudinaryPublicIds: [{ type: String }],
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tag: { type: String, default: '' },
  features: [{ type: String }],
  displayOrder: { type: Number, default: 0 },
  whatsappNumber: { type: String, default: '' }
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'MADHURI CREATION' },
  whatsappNumber: { type: String, default: '8407913008' },
  customWhatsappNumber: { type: String, default: '8275892945' },
  contactAddress: { type: String, default: 'Kalewadi, Pune, Maharashtra - 411017' }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

// Seed Data Definition (4 Official Categories & Products)
const seedCategories = [
  { name: 'Handmade Soaps', slug: 'soaps', description: 'Natural care, handcrafted with love.', displayOrder: 1, active: true, whatsappNumber: '8407913008' },
  { name: 'Handcrafted Candles', slug: 'candles', description: 'Beautifully crafted candles for beautiful moments.', displayOrder: 2, active: true, whatsappNumber: '8407913008' },
  { name: 'Customized Sup', slug: 'custom-sup', description: 'तुमच्या खास समारंभासाठी सुंदर आणि आकर्षक Customized सुप', displayOrder: 3, active: true, whatsappNumber: '8275892945' },
  { name: 'Customized Rangoli', slug: 'custom-rangoli', description: 'सण, पूजा आणि शुभ प्रसंगांसाठी सुंदर, आकर्षक आणि पारंपरिक handmade rangoli designs.', displayOrder: 4, active: true, whatsappNumber: '8275892945' }
];

const seedProducts = [
  // SOAPS
  {
    name: "Artisanal Natural Herbal Soap Bar",
    categoryId: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    tag: "Bestseller",
    whatsappNumber: "8407913008",
    description: "Crafted with carefully selected natural ingredients including Coffee, Turmeric, Sandalwood, Almond, Cashew, and Rice to gently cleanse, nourish, and moisturize your skin.",
    features: ["100% Natural Ingredients", "SLS Free & Paraben Free", "Nourishes & Moisturizes Skin", "Infused with Almond, Coffee & Turmeric"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM (1).jpeg",
    additionalImages: ["assets/soap_box_ingredients.jpg", "assets/WhatsApp Image 2026-08-28 at 12.56.24 PM (1).jpeg", "assets/WhatsApp Image 2026-08-28 at 12.56.25 PM.jpeg"],
    active: true,
    displayOrder: 1
  },
  {
    name: "Madhuri Naturals Signature Packaged Soap Bar",
    categoryId: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    tag: "Gift Ready",
    whatsappNumber: "8407913008",
    description: "Signature packaged 100g handmade natural soap housed in our luxury gold foil stamped box. Pure natural formulation containing Sandalwood, Cashew, Rice, and Sesame.",
    features: ["Gold Foil Stamped Box Packaging", "100g (When Packed)", "SLS Free & Paraben Free", "Ideal for Everyday Pampering & Gifting"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.25 PM.jpeg",
    additionalImages: ["assets/soap_box_ingredients.jpg", "assets/WhatsApp Image 2026-08-28 at 12.56.26 PM.jpeg", "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM (1).jpeg"],
    active: true,
    displayOrder: 2
  },

  // CANDLES
  {
    name: "Single Handcrafted Rose & Floral Candle",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 60,
    specs: "1 Piece",
    weight: "Single Candle",
    tag: "Single Candle",
    whatsappNumber: "8407913008",
    description: "Handmade single rose floral candle crafted with care to add a beautiful look and a pleasant fragrance to your home.",
    features: ["Single Handcrafted Candle", "Pleasant Soothing Fragrance", "Smokeless Eco Wick"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.21 PM.jpeg"],
    active: true,
    displayOrder: 3
  },
  {
    name: "Premium Sculpted Lotus Candle",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 99,
    specs: "1 Piece Premium",
    weight: "Premium Candle",
    tag: "Premium Candle",
    whatsappNumber: "8407913008",
    description: "Exquisitely hand-sculpted premium lotus candle in deep crimson and dual-tone hues.",
    features: ["1 Premium Sculpted Candle", "Intricate Lotus Carving", "Long Clean Burn"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg"],
    active: true,
    displayOrder: 4
  },
  {
    name: "Candle Combo – 7 Pcs Floral Set",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "7 Pieces Set",
    weight: "7 pcs Combo",
    tag: "Best Value Combo",
    whatsappNumber: "8407913008",
    description: "A stunning combo set of 7 handcrafted floral candles in vibrant pink and rose tones.",
    features: ["7 Handcrafted Pieces Set", "Vibrant Floral Sculptures", "Best Value Festival Combo"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.23 PM.jpeg"],
    active: true,
    displayOrder: 5
  },

  // CUSTOMIZED SUP
  {
    name: "डोहाळे जेवण सुप (Dohale Jevan Customized Sup)",
    categoryId: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    tag: "डोहाळे जेवण Special",
    whatsappNumber: "8275892945",
    description: "तुमच्या खास डोहाळे जेवण समारंभासाठी सुंदर, आकर्षक आणि पारंपरिक Handmade Customized सुप. फोटो, नाव व कार्यक्रमाचे नाव तुमच्या आवडीनुसार Customize करून मिळेल.",
    features: ["✨ सुंदर Handmade Decoration", "✨ आकर्षक Traditional Design", "📸 Photo & Name Customization", "🎨 तुमच्या पसंतीनुसार रंग व सजावट"],
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg",
    additionalImages: ["assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg", "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg"],
    active: true,
    displayOrder: 6
  },
  {
    name: "पहिली मंगळागौर सुप - Crimson Red (Pahili Mangalagaur Customized Sup)",
    categoryId: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    tag: "मंगळागौर Special",
    whatsappNumber: "8275892945",
    description: "खास पहिली मंगळागौर व मंगळागौर पूजेसाठी पारंपरिक लाल बांबू सुप. श्री व सौ. यांच्या फोटो व नावासह सुंदर फुले, मोती आणि गोटा-पट्टी सजावट.",
    features: ["📸 फोटो व नाव Customization", "🌸 सुरेख मोती व Floral बॉर्डर", "✨ मंगळागौर व सण-समारंभासाठी उपयुक्त"],
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg",
    additionalImages: ["assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg", "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg"],
    active: true,
    displayOrder: 7
  },
  {
    name: "पहिली मंगळागौर सुप - Festive Yellow (Pahili Mangalagaur Customized Sup)",
    categoryId: "custom-sup",
    categoryLabel: "Customized Sup",
    price: 500,
    weight: "Customized Sup",
    tag: "Festive Favorite",
    whatsappNumber: "8275892945",
    description: "तेजस्वी पिवळ्या रंगात सजवलेले मंगळागौर सुप. सुंदर फोटो प्रिंट, सोनेरी बॉर्डर व रंगीबेरंगी गोंडे (tassels) सजावटीसह.",
    features: ["💛 Radiant Yellow Traditional Base", "📸 Photo & Name Customization", "🎀 Gota Patti & Tassel Accents"],
    mainImage: "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (2).jpeg",
    additionalImages: ["assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM.jpeg", "assets/custom sups/WhatsApp Image 2026-08-28 at 5.38.06 PM (1).jpeg"],
    active: true,
    displayOrder: 8
  },

  // CUSTOMIZED RANGOLI
  {
    name: "कमळ Rangoli (Handcrafted Pink Lotus Rangoli Mat Pair)",
    categoryId: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    weight: "Pair of Lotus Rangolis",
    tag: "Bestseller Rangoli",
    whatsappNumber: "8275892945",
    description: "सण, पूजा आणि शुभ प्रसंगांसाठी सुंदर, आकर्षक आणि पारंपरिक handmade कमळ rangoli designs. Design आणि size नुसार Price उपलब्ध.",
    features: ["🪷 सुंदर कमळ Petal Design", "✨ 100% Reusable Handmade Rangoli", "🎨 Size & Color Customization Available"],
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (1).jpeg",
    additionalImages: ["assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (3).jpeg", "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.20 PM.jpeg"],
    active: true,
    displayOrder: 9
  },
  {
    name: "देवी / गौराई Rangoli (\"गौराई आली\" Handmade Festive Set)",
    categoryId: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    weight: "Gaurai Rangoli Backdrop Set",
    tag: "गौराई विशेष",
    whatsappNumber: "8275892945",
    description: "गौरी आगमन, गणपती व नवरात्र पूजेसाठी पारंपरिक \"गौराई आली\" हस्तकला रांगोळी सेट. देवीचे सुरेख मुखवटे व कमळ पाकळ्यांची आकर्षक मांडणी.",
    features: ["🌺 देवी / गौराई विशेष Design", "🎨 Hand-Painted & Embellished Details", "📐 Design आणि size नुसार Price"],
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM (2).jpeg",
    additionalImages: ["assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.19 PM.jpeg", "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.20 PM (1).jpeg"],
    active: true,
    displayOrder: 10
  },
  {
    name: "शुभ चिन्ह श्री गणेश Rangoli (Ganesha Shubh Chinh Rangoli)",
    categoryId: "custom-rangoli",
    categoryLabel: "Customized Rangoli",
    price: 0,
    weight: "Embossed Ganesha Rangoli",
    tag: "Shubh Chinh",
    whatsappNumber: "8275892945",
    description: "गणेशोत्सव, दिवाळी व गृहप्रवेशासाठी शुभ श्री गणेश चिन्ह असलेली लाल व सोनेरी हस्तकला रांगोळी plate.",
    features: ["🕉️ शुभ गणेश चिन्ह Motif", "✨ Rich Textured Red & Gold Finish", "🚪 दारासमोर व पूजेच्या चौरंगावर उत्तम"],
    mainImage: "assets/custom rangoli/WhatsApp Image 2026-08-28 at 4.53.18 PM.jpeg",
    additionalImages: [],
    active: true,
    displayOrder: 11
  }
];

async function autoSeedIfEmpty() {
  try {
    const prodCount = await Product.countDocuments();
    if (prodCount < 10) {
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Category.insertMany(seedCategories);
      await Product.insertMany(seedProducts);
      console.log('Database seeded with 4 official categories and products successfully.');
    }
  } catch (err) {
    console.error('Auto seed error:', err);
  }
}

// ================= AUTH MIDDLEWARE =================
function authenticateAdmin(req, res, next) {
  const token = req.cookies.admin_token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
}

// ================= AUTH ROUTES =================

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username: ADMIN_USER, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { username: ADMIN_USER }
    });
  } else {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /api/auth/check
app.get('/api/auth/check', (req, res) => {
  const token = req.cookies.admin_token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.json({ authenticated: false });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, user: decoded });
  } catch (err) {
    return res.json({ authenticated: false });
  }
});

// ================= CLOUDINARY UPLOAD ROUTE =================

// POST /api/upload (Protected)
app.post('/api/upload', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    let fileBuffer = null;

    if (req.file) {
      fileBuffer = req.file.buffer;
    } else if (req.body.imageBase64) {
      const matches = req.body.imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches) {
        fileBuffer = Buffer.from(matches[2], 'base64');
      } else {
        fileBuffer = Buffer.from(req.body.imageBase64, 'base64');
      }
    }

    if (!fileBuffer) {
      return res.status(400).json({ error: 'No image file or base64 data provided' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'madhuri_creation_products',
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || undefined
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Failed to upload image to Cloudinary', details: error.message });
        }
        res.json({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        });
      }
    );

    uploadStream.end(fileBuffer);
  } catch (err) {
    console.error('Upload route error:', err);
    res.status(500).json({ error: 'Image upload failed', details: err.message });
  }
});

// ================= CATEGORY ROUTES =================

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    await autoSeedIfEmpty();
    const categories = await Category.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categories (Protected)
app.post('/api/categories', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, image, displayOrder, active, whatsappNumber } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = new Category({
      name,
      slug,
      description: description || '',
      image: image || '',
      displayOrder: displayOrder || 0,
      active: active !== undefined ? active : true,
      whatsappNumber: whatsappNumber || '8407913008'
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/categories/:id (Protected)
app.put('/api/categories/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, image, displayOrder, active, whatsappNumber } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    if (name) {
      category.name = name;
      category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (active !== undefined) category.active = active;
    if (whatsappNumber !== undefined) category.whatsappNumber = whatsappNumber;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/categories/:id (Protected)
app.delete('/api/categories/:id', authenticateAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const productCount = await Product.countDocuments({ 
      $or: [{ categoryId: category.slug }, { categoryId: category._id.toString() }, { categoryLabel: category.name }]
    });

    if (productCount > 0) {
      return res.status(400).json({ 
        error: `This category contains ${productCount} product(s). Please move or delete those products before deleting this category.` 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PRODUCT ROUTES =================

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    await autoSeedIfEmpty();

    const { category, search, active, featured, includeInactive } = req.query;
    const query = {};

    if (includeInactive !== 'true') {
      query.active = true;
    } else if (active !== undefined) {
      query.active = active === 'true';
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (category && category !== 'all') {
      query.$or = [
        { categoryId: category },
        { categoryLabel: new RegExp(category, 'i') }
      ];
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { categoryLabel: new RegExp(search, 'i') }
      ];
    }

    const products = await Product.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products (Protected)
app.post('/api/products', authenticateAdmin, async (req, res) => {
  try {
    const {
      name,
      categoryId,
      categoryLabel,
      price,
      originalPrice,
      weight,
      specs,
      description,
      shortDescription,
      productType,
      sku,
      stock,
      mainImage,
      additionalImages,
      cloudinaryPublicIds,
      active,
      featured,
      tag,
      features,
      displayOrder,
      whatsappNumber
    } = req.body;

    if (!name || price === undefined || price === null || !mainImage) {
      return res.status(400).json({ error: 'Product name, price, and main image are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = new Product({
      name,
      slug,
      categoryId: categoryId || 'soaps',
      categoryLabel: categoryLabel || 'Handmade Soaps',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      weight: weight || '',
      specs: specs || '',
      description: description || '',
      shortDescription: shortDescription || '',
      productType: productType || '',
      sku: sku || '',
      stock: stock !== undefined ? Number(stock) : 10,
      mainImage,
      additionalImages: additionalImages || [],
      cloudinaryPublicIds: cloudinaryPublicIds || [],
      active: active !== undefined ? Boolean(active) : true,
      featured: Boolean(featured),
      tag: tag || '',
      features: features || [],
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      whatsappNumber: whatsappNumber || (categoryId === 'custom-sup' || categoryId === 'custom-rangoli' ? '8275892945' : '8407913008')
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id (Protected)
app.put('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const updateData = { ...req.body };
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.name) updateData.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id (Protected)
app.delete('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.cloudinaryPublicIds && product.cloudinaryPublicIds.length > 0) {
      for (const publicId of product.cloudinaryPublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (cErr) {
          console.error('Cloudinary destroy error:', cErr);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/seed (Initial Database Seed)
app.post('/api/products/seed', async (req, res) => {
  try {
    await connectDB();
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Category.insertMany(seedCategories);
    await Product.insertMany(seedProducts);
    res.json({ success: true, message: 'Database re-seeded successfully with 4 official categories and products!', count: seedProducts.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SETTINGS ROUTE =================

// GET /api/settings
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        businessName: 'MADHURI CREATION',
        whatsappNumber: '8407913008',
        customWhatsappNumber: '8275892945',
        contactAddress: 'Kalewadi, Pune, Maharashtra - 411017'
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings (Protected)
app.put('/api/settings', authenticateAdmin, async (req, res) => {
  try {
    const { businessName, whatsappNumber, customWhatsappNumber, contactAddress } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    if (businessName) settings.businessName = businessName;
    if (whatsappNumber) settings.whatsappNumber = whatsappNumber;
    if (customWhatsappNumber) settings.customWhatsappNumber = customWhatsappNumber;
    if (contactAddress) settings.contactAddress = contactAddress;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = app;
