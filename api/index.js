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
  displayOrder: { type: Number, default: 0 }
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
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'MADHURI CREATION' },
  whatsappNumber: { type: String, default: '8407913008' },
  contactAddress: { type: String, default: 'Kalewadi, Pune, Maharashtra - 411017' }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

// Seed Data Definition
const seedProducts = [
  {
    name: "Artisanal Natural Herbal Soap Bar",
    categoryId: "soaps",
    categoryLabel: "Handmade Soaps",
    price: 99,
    weight: "100 g",
    tag: "Bestseller",
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
    description: "Signature packaged 100g handmade natural soap housed in our luxury gold foil stamped box. Pure natural formulation containing Sandalwood, Cashew, Rice, and Sesame.",
    features: ["Gold Foil Stamped Box Packaging", "100g (When Packed)", "SLS Free & Paraben Free", "Ideal for Everyday Pampering & Gifting"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.25 PM.jpeg",
    additionalImages: ["assets/soap_box_ingredients.jpg", "assets/WhatsApp Image 2026-08-28 at 12.56.26 PM.jpeg", "assets/WhatsApp Image 2026-08-28 at 12.56.23 PM (1).jpeg"],
    active: true,
    displayOrder: 2
  },
  {
    name: "Artisanal Pink Flower Candle Set",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "7 Pieces Set",
    tag: "Best Value",
    description: "A stunning set of 7 handcrafted floral candles in vibrant and soft pink hues. Carefully hand-poured with lotus and peony petal detail for festive elegance.",
    features: ["7 Handcrafted Pieces", "Vibrant Pink Floral Sculptures", "Long Clean Burn", "Perfect Festive Centerpiece"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.23 PM.jpeg"],
    active: true,
    displayOrder: 3
  },
  {
    name: "Luxury Blossom Rose Candle Collection",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "5 Pieces Luxury Tray Set",
    tag: "Luxury Gift",
    description: "Exquisitely detailed rose and peony flower candles presented on a golden luxury tray. Handcrafted with gold leaf accents for grand celebrations and home decor.",
    features: ["5 Sculpted Rose & Peony Candles", "Gold Flake Petal Accents", "Luxury Presentation", "Warm Natural Glow"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.18 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg"],
    active: true,
    displayOrder: 4
  },
  {
    name: "Handcrafted Crimson Lotus Candle",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Sculpted Lotus Candle",
    tag: "Artisanal Pick",
    description: "Intricately hand-sculpted lotus petal candle in deep crimson red. Symbolizes warmth, purity, and spiritual radiance in sacred home spaces.",
    features: ["Deep Crimson Red Petals", "Intricate Lotus Carving", "Eco Wax Blend", "Smokeless Wick"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg"],
    active: true,
    displayOrder: 5
  },
  {
    name: "Royal Dual-Tone Crimson & Dark Lotus Candle",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Dual-Tone Sculpted Lotus",
    tag: "Dual-Tone",
    description: "Unique hand-poured lotus candle featuring rich crimson red inner petals transitioning into obsidian dark base petals for a striking aesthetic.",
    features: ["Dual-Tone Color Gradient", "Handcrafted Petal Alignment", "Premium Wax Blend", "Dramatic Ambient Glow"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.20 PM (1).jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.16 PM.jpeg"],
    active: true,
    displayOrder: 6
  },
  {
    name: "Handcrafted Floral Ambient Table Candle Set",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "7 Lit Flower Candles Set",
    tag: "Festive Favorite",
    description: "Assorted handcrafted blooming flower candles designed to illuminate dinner tables, diwali rangolis, and intimate celebrations with cozy floral radiance.",
    features: ["7 Assorted Floral Candles", "Floating / Tabletop Suitable", "Warm Soft Light", "Artisanal Craftsmanship"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.19 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.22 PM (1).jpeg"],
    active: true,
    displayOrder: 7
  },
  {
    name: "Sculpted Blooming Rose & Botanical Leaf Candle",
    categoryId: "candles",
    categoryLabel: "Handcrafted Candles",
    price: 200,
    specs: "Blooming Rose Candle",
    tag: "Botanical",
    description: "A lifelike blooming rose candle in romantic pink tones resting gracefully on a sculpted green leafy base. Adds romantic elegance to any bedside or mantelpiece.",
    features: ["Detailed Rose & Leaf Base", "Soft Pink Rose Wax", "Gentle Ambient Flame", "Thoughtful Favor & Gift"],
    mainImage: "assets/WhatsApp Image 2026-08-28 at 12.56.22 PM.jpeg",
    additionalImages: ["assets/WhatsApp Image 2026-08-28 at 12.56.21 PM.jpeg"],
    active: true,
    displayOrder: 8
  }
];

async function autoSeedIfEmpty() {
  try {
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      const catCount = await Category.countDocuments();
      if (catCount === 0) {
        await Category.insertMany([
          { name: 'Handmade Soaps', slug: 'soaps', description: 'Natural care, handcrafted with love.', displayOrder: 1, active: true },
          { name: 'Handcrafted Candles', slug: 'candles', description: 'Beautifully crafted candles for beautiful moments.', displayOrder: 2, active: true }
        ]);
      }
      await Product.insertMany(seedProducts);
      console.log('Auto-seeded initial database records successfully.');
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

    // Upload to Cloudinary stream
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
    const { name, description, image, displayOrder, active } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = new Category({
      name,
      slug,
      description: description || '',
      image: image || '',
      displayOrder: displayOrder || 0,
      active: active !== undefined ? active : true
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
    const { name, description, image, displayOrder, active } = req.body;
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
      displayOrder
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
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0
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
    if (updateData.price) updateData.price = Number(updateData.price);
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
    
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany([
        { name: 'Handmade Soaps', slug: 'soaps', description: 'Natural care, handcrafted with love.', displayOrder: 1, active: true },
        { name: 'Handcrafted Candles', slug: 'candles', description: 'Beautifully crafted candles for beautiful moments.', displayOrder: 2, active: true }
      ]);
    }

    const prodCount = await Product.countDocuments();
    if (prodCount > 0) {
      return res.json({ message: 'Database already contains products. Skipping seed.', count: prodCount });
    }

    await Product.insertMany(seedProducts);
    res.json({ success: true, message: 'Database seeded successfully with initial products!', count: seedProducts.length });
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
    const { businessName, whatsappNumber, contactAddress } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    if (businessName) settings.businessName = businessName;
    if (whatsappNumber) settings.whatsappNumber = whatsappNumber;
    if (contactAddress) settings.contactAddress = contactAddress;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
