// Madhuri Creation - Main Application Script (Refined & Balanced Layout)

document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupMobileDrawer();

  // Load dynamic data from MongoDB API with graceful fallback to static catalog
  await loadDynamicData();
});

/**
 * Load Dynamic Products & Categories from Backend API
 */
async function loadDynamicData() {
  try {
    const [prodRes, catRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/categories')
    ]);

    if (prodRes.ok) {
      const dbProducts = await prodRes.json();
      if (Array.isArray(dbProducts) && dbProducts.length > 0) {
        window.PRODUCT_CATALOG = dbProducts.map(p => ({
          id: p._id || p.id,
          name: p.name,
          category: p.categoryId,
          categoryLabel: p.categoryLabel,
          price: p.price,
          weight: p.weight,
          specs: p.specs,
          rating: 5,
          tag: p.tag,
          description: p.description,
          features: p.features || [],
          mainImage: p.mainImage,
          additionalImages: p.additionalImages || [],
          whatsappNumber: p.whatsappNumber
        }));
      }
    }

    if (catRes.ok) {
      const dbCategories = await catRes.json();
      if (Array.isArray(dbCategories) && dbCategories.length > 0) {
        window.DYNAMIC_CATEGORIES = dbCategories.filter(c => c.active);
      }
    }
  } catch (err) {
    console.log('Using static product catalog fallback:', err.message);
  }

  // Render Collections
  renderCategorySections();
}

/**
 * Render Category Sections
 */
function renderCategorySections() {
  const soapGrid = document.getElementById('soap-products-grid');
  const candleGrid = document.getElementById('candle-products-grid');
  const supGrid = document.getElementById('sup-products-grid');
  const rangoliGrid = document.getElementById('rangoli-products-grid');
  const dynamicContainer = document.getElementById('dynamic-categories-container');

  if (!window.PRODUCT_CATALOG) return;

  // Render Soaps
  if (soapGrid) {
    const soaps = window.PRODUCT_CATALOG.filter(p => p.category === 'soaps' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('soap')));
    soapGrid.innerHTML = soaps.map(product => createProductCardHTML(product)).join('');
  }

  // Render Candles
  if (candleGrid) {
    const candles = window.PRODUCT_CATALOG.filter(p => p.category === 'candles' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('candle')));
    candleGrid.innerHTML = candles.map(product => createProductCardHTML(product)).join('');
  }

  // Render Customized Sup
  if (supGrid) {
    const sups = window.PRODUCT_CATALOG.filter(p => p.category === 'custom-sup' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('sup')));
    supGrid.innerHTML = sups.map(product => createProductCardHTML(product)).join('');
  }

  // Render Customized Rangoli
  if (rangoliGrid) {
    const rangolis = window.PRODUCT_CATALOG.filter(p => p.category === 'custom-rangoli' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('rangoli')));
    rangoliGrid.innerHTML = rangolis.map(product => createProductCardHTML(product)).join('');
  }

  // Render Custom/Newly Created Admin Categories
  if (dynamicContainer && window.DYNAMIC_CATEGORIES) {
    const defaultSlugs = ['soaps', 'candles', 'custom-sup', 'custom-rangoli'];
    const customCategories = window.DYNAMIC_CATEGORIES.filter(c => !defaultSlugs.includes(c.slug));

    if (customCategories.length > 0) {
      dynamicContainer.innerHTML = customCategories.map(cat => {
        const catProducts = window.PRODUCT_CATALOG.filter(p => p.category === cat.slug || p.categoryLabel.toLowerCase() === cat.name.toLowerCase());
        if (catProducts.length === 0) return '';

        return `
          <section id="${cat.slug}" class="py-16 bg-cream-100 border-t border-amber-900/10 scroll-mt-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-8">
              <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-amber-900/15 gap-4">
                <div>
                  <div class="text-xs uppercase tracking-[0.2em] text-amber-900 font-bold flex items-center gap-1.5 mb-1">
                    <span>✦</span><span>Special Collection</span><span>✦</span>
                  </div>
                  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">${cat.name}</h2>
                  <p class="text-xs sm:text-sm text-stone-600 mt-1 font-light">${cat.description || 'Thoughtfully handcrafted items for special moments.'}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${catProducts.map(p => createProductCardHTML(p)).join('')}
              </div>
            </div>
          </section>
        `;
      }).join('');
    } else {
      dynamicContainer.innerHTML = '';
    }
  }
}

/**
 * Generate Clean Luxury Product Card HTML
 * @param {Object} product 
 * @returns {string} HTML markup
 */
function createProductCardHTML(product) {
  const specBadge = product.weight ? product.weight : (product.specs || '');
  const category = (product.category || product.categoryId || '').toLowerCase();
  const isCustomSup = category === 'custom-sup' || category.includes('sup');
  const isCustomRangoli = category === 'custom-rangoli' || category.includes('rangoli');
  const isPriceOnRequest = !product.price || product.price === 0;

  const displayPrice = isPriceOnRequest ? 'Price on Request' : `₹${product.price}`;
  const buttonText = isCustomSup ? 'Customize / Order' : (isCustomRangoli ? 'Enquire / Customize' : 'Order on WhatsApp');

  // Category Color Accent Styling (Subtle & Refined)
  let badgeColor = 'bg-stone-900 text-amber-200 border-amber-500/30';
  let cardBorderColor = 'border-stone-200 hover:border-amber-700/30';
  
  if (isCustomSup) {
    badgeColor = 'bg-[#6B1D2F] text-amber-200 border-amber-400/30';
    cardBorderColor = 'border-amber-900/15 hover:border-amber-700/40';
  } else if (isCustomRangoli) {
    badgeColor = 'bg-[#581C87] text-pink-200 border-pink-400/30';
    cardBorderColor = 'border-purple-900/15 hover:border-purple-800/30';
  } else if (category === 'candles' || category.includes('candle')) {
    badgeColor = 'bg-[#D97706] text-white border-amber-400/30';
    cardBorderColor = 'border-amber-900/15 hover:border-amber-600/30';
  } else if (category === 'soaps' || category.includes('soap')) {
    badgeColor = 'bg-[#C2185B] text-white border-rose-300/30';
    cardBorderColor = 'border-rose-900/10 hover:border-rose-700/30';
  }

  return `
    <div class="product-card group bg-white rounded-3xl overflow-hidden border ${cardBorderColor} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      <!-- Image Container -->
      <div class="relative aspect-square overflow-hidden bg-cream-50 cursor-pointer p-3 border-b border-stone-100 flex items-center justify-center" onclick="openProductModal('${product.id}')">
        <img 
          src="${product.mainImage}" 
          alt="${product.name}" 
          loading="lazy"
          class="w-full h-full ${isCustomSup || isCustomRangoli ? 'object-contain p-1' : 'object-cover'} object-center group-hover:scale-105 transition-transform duration-500 rounded-2xl"
        />
        
        <!-- Tag Badge -->
        ${product.tag ? `
          <span class="absolute top-4 left-4 ${badgeColor} text-[10px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full border shadow-sm">
            ${product.tag}
          </span>
        ` : ''}

        <!-- Quick View Button -->
        <button 
          class="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-stone-900 p-2.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-all duration-300 border border-stone-200"
          title="Quick View"
          onclick="event.stopPropagation(); openProductModal('${product.id}')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div class="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
            <span class="uppercase tracking-widest text-[10px] font-bold text-amber-900 flex items-center gap-1">
              <span>✦</span> ${product.categoryLabel}
            </span>
            ${specBadge ? `<span class="bg-stone-100 text-stone-800 border border-stone-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">${specBadge}</span>` : ''}
          </div>

          <h3 
            class="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-maroon-900 transition-colors duration-200 line-clamp-1 cursor-pointer leading-snug"
            onclick="openProductModal('${product.id}')"
          >
            ${product.name}
          </h3>

          <p class="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed font-light">
            ${product.description}
          </p>
        </div>

        <!-- Card Footer -->
        <div class="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-3">
          <div class="flex items-baseline justify-between">
            <span class="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Price</span>
            <div class="text-base sm:text-lg font-serif font-bold text-stone-900">
              ${displayPrice}
            </div>
          </div>

          <!-- WhatsApp Button -->
          <button 
            onclick="handleWhatsAppOrder(window.PRODUCT_CATALOG.find(p => (p.id === '${product.id}' || p._id === '${product.id}')))"
            class="w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200 border border-emerald-600/30"
          >
            <svg class="w-4 h-4 fill-current text-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.151 4.202 4.294-1.127z"/>
            </svg>
            <span>${buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Setup navigation effects and smooth scrolling
 */
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('nav-festive-glass', 'shadow-sm');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('nav-festive-glass', 'shadow-sm');
      navbar.classList.add('bg-transparent');
    }
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        closeMobileDrawer();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Mobile Drawer Menu
 */
function setupMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
  }
}
