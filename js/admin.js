// Madhuri Creation - Admin Panel Client Engine (4 Categories + Per-Product WhatsApp & Price-on-Request)

let allProducts = [];
let allCategories = [];
let uploadedImages = []; // Stores array of { url, public_id }
let deletingProductId = null;
let editingCategoryId = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});

/**
 * Check Authentication status
 */
async function checkAuth() {
  try {
    const res = await fetch('/api/auth/check');
    const data = await res.json();

    const loginView = document.getElementById('admin-login-view');
    const dashboardView = document.getElementById('admin-dashboard-view');

    if (data.authenticated) {
      loginView.classList.add('hidden');
      dashboardView.classList.remove('hidden');
      dashboardView.classList.add('flex');
      loadDashboardData();
    } else {
      loginView.classList.remove('hidden');
      dashboardView.classList.add('hidden');
      dashboardView.classList.remove('flex');
    }
  } catch (err) {
    console.error('Auth check error:', err);
  }
}

/**
 * Handle Login Form Submit
 */
async function handleLoginSubmit(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('login-username').value.trim();
  const passwordInput = document.getElementById('login-password').value;
  const errorAlert = document.getElementById('login-error-alert');
  const submitBtn = document.getElementById('login-submit-btn');

  errorAlert.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.innerText = 'AUTHENTICATING...';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameInput, password: passwordInput })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      checkAuth();
    } else {
      errorAlert.textContent = data.error || 'Invalid credentials. Please try again.';
      errorAlert.classList.remove('hidden');
    }
  } catch (err) {
    errorAlert.textContent = 'Server connection error. Please try again.';
    errorAlert.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'LOG IN TO DASHBOARD';
  }
}

/**
 * Handle Logout
 */
async function handleLogout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    checkAuth();
  } catch (err) {
    console.error('Logout error:', err);
  }
}

/**
 * Load All Dashboard Data (Products & Categories)
 */
async function loadDashboardData() {
  try {
    const [prodRes, catRes] = await Promise.all([
      fetch('/api/products?includeInactive=true'),
      fetch('/api/categories')
    ]);

    allProducts = await prodRes.json();
    allCategories = await catRes.json();

    if (!Array.isArray(allProducts)) allProducts = [];
    if (!Array.isArray(allCategories)) allCategories = [];

    renderMetrics();
    renderRecentProductsTable();
    renderAllProductsTable();
    renderCategoriesTable();
    populateCategoryDropdowns();
  } catch (err) {
    console.error('Error loading dashboard data:', err);
  }
}

/**
 * Seed Default Data
 */
async function seedInitialData() {
  if (!confirm('Re-seed default 4 categories (Soaps, Candles, Customized Sup & Rangoli) into database?')) return;
  try {
    const res = await fetch('/api/products/seed', { method: 'POST' });
    const data = await res.json();
    alert(data.message || 'Seeding complete!');
    loadDashboardData();
  } catch (err) {
    alert('Failed to seed data: ' + err.message);
  }
}

/**
 * Render Metric Cards
 */
function renderMetrics() {
  const totalProducts = allProducts.length;
  const soaps = allProducts.filter(p => p.categoryId === 'soaps' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('soap')));
  const candles = allProducts.filter(p => p.categoryId === 'candles' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('candle')));
  const sups = allProducts.filter(p => p.categoryId === 'custom-sup' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('sup')));
  const rangolis = allProducts.filter(p => p.categoryId === 'custom-rangoli' || (p.categoryLabel && p.categoryLabel.toLowerCase().includes('rangoli')));

  if (document.getElementById('stat-total-products')) document.getElementById('stat-total-products').textContent = totalProducts;
  if (document.getElementById('stat-total-soaps')) document.getElementById('stat-total-soaps').textContent = soaps.length;
  if (document.getElementById('stat-total-candles')) document.getElementById('stat-total-candles').textContent = candles.length;
  if (document.getElementById('stat-total-sup')) document.getElementById('stat-total-sup').textContent = sups.length;
  if (document.getElementById('stat-total-rangoli')) document.getElementById('stat-total-rangoli').textContent = rangolis.length;
}

/**
 * Populate Category Dropdowns
 */
function populateCategoryDropdowns() {
  const filterSelect = document.getElementById('filter-category-select');
  const formSelect = document.getElementById('form-product-category');

  const optionsHTML = allCategories.map(c => 
    `<option value="${c.slug}">${c.name}</option>`
  ).join('');

  if (filterSelect) {
    filterSelect.innerHTML = `<option value="all">All Categories</option>` + optionsHTML;
  }

  if (formSelect) {
    formSelect.innerHTML = optionsHTML || `
      <option value="soaps">Handmade Soaps</option>
      <option value="candles">Handcrafted Candles</option>
      <option value="custom-sup">Customized Sup</option>
      <option value="custom-rangoli">Customized Rangoli</option>
    `;
  }
}

/**
 * Switch Admin Sidebar Tabs
 */
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('bg-stone-100', 'font-bold'));

  const activeTab = document.getElementById(`tab-${tabName}`);
  const activeBtn = document.getElementById(`tab-btn-${tabName}`);

  if (activeTab) activeTab.classList.remove('hidden');
  if (activeBtn) activeBtn.classList.add('bg-stone-100', 'font-bold');
}

/**
 * Render Recent Products Table
 */
function renderRecentProductsTable() {
  const tbody = document.getElementById('recent-products-tbody');
  if (!tbody) return;

  const recent = [...allProducts].slice(0, 5);
  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-stone-400">No products found. Click "Seed Default Data" or "Add Product".</td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(p => {
    const displayPrice = (!p.price || p.price === 0) ? 'Price on Request' : `₹${p.price}`;
    return `
      <tr class="hover:bg-stone-50">
        <td class="p-3 font-medium flex items-center gap-3">
          <img src="${p.mainImage}" class="w-10 h-10 object-contain rounded-lg bg-stone-100 border border-stone-200" alt="" />
          <span>${p.name}</span>
        </td>
        <td class="p-3 text-stone-600">${p.categoryLabel}</td>
        <td class="p-3 font-semibold">${displayPrice}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
            ${p.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td class="p-3">
          <button onclick="openEditProductModal('${p._id}')" class="text-amber-900 font-semibold hover:underline mr-2">Edit</button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Filter & Render All Products Table
 */
function filterProducts() {
  const search = document.getElementById('product-search-input').value.toLowerCase();
  const categoryFilter = document.getElementById('filter-category-select').value;
  const statusFilter = document.getElementById('filter-status-select').value;
  const sortFilter = document.getElementById('filter-sort-select').value;

  let filtered = [...allProducts];

  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) || 
      (p.categoryLabel && p.categoryLabel.toLowerCase().includes(search)) ||
      (p.description && p.description.toLowerCase().includes(search))
    );
  }

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(p => p.categoryId === categoryFilter || (p.categoryLabel && p.categoryLabel.toLowerCase().includes(categoryFilter)));
  }

  if (statusFilter === 'active') {
    filtered = filtered.filter(p => p.active);
  } else if (statusFilter === 'inactive') {
    filtered = filtered.filter(p => !p.active);
  }

  if (sortFilter === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortFilter === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortFilter === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else {
    filtered.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  renderAllProductsTable(filtered);
}

function renderAllProductsTable(products = allProducts) {
  const tbody = document.getElementById('all-products-tbody');
  if (!tbody) return;

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-stone-400">No matching products found.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => {
    const displayPrice = (!p.price || p.price === 0) ? '<span class="text-amber-800 font-bold">Price on Request</span>' : `₹${p.price}`;

    return `
      <tr class="hover:bg-stone-50 transition-colors border-b border-stone-100">
        <td class="p-4">
          <img src="${p.mainImage}" class="w-12 h-12 object-contain rounded-xl bg-white border border-stone-300 p-1" alt="" />
        </td>
        <td class="p-4">
          <div class="font-bold text-stone-900">${p.name}</div>
          <div class="text-[11px] text-stone-400">${p.weight || p.specs || ''}</div>
        </td>
        <td class="p-4 text-stone-600 font-medium">${p.categoryLabel}</td>
        <td class="p-4 font-bold text-stone-900">${displayPrice}</td>
        <td class="p-4">
          <button 
            onclick="toggleProductActive('${p._id}', ${p.active})" 
            class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${p.active ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-200 text-stone-600'}"
          >
            ${p.active ? '● ACTIVE' : '○ INACTIVE'}
          </button>
        </td>
        <td class="p-4 text-xs font-mono text-stone-500">
          ${p.whatsappNumber || '8407913008'}
        </td>
        <td class="p-4 text-right space-x-2">
          <button onclick="openEditProductModal('${p._id}')" class="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors">Edit</button>
          <button onclick="confirmDeleteProduct('${p._id}', '${p.name.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Precise Local & Cloudinary Image Upload Handler
 */
async function handleCloudinaryUpload(e) {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const statusEl = document.getElementById('upload-status');
  statusEl.textContent = 'Processing image...';

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = async function(event) {
      const base64Data = event.target.result;

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Data })
        });
        const data = await res.json();

        if (res.ok && data.url) {
          uploadedImages.push({ url: data.url, public_id: data.public_id || 'pub_' + Date.now() });
        } else {
          uploadedImages.push({ url: base64Data, public_id: 'local_' + Date.now() });
        }
      } catch (err) {
        uploadedImages.push({ url: base64Data, public_id: 'local_' + Date.now() });
      }

      renderUploadedThumbnails();
      updateLivePreview();
      statusEl.textContent = '';
    };
    reader.readAsDataURL(file);
  }
}

function renderUploadedThumbnails() {
  const container = document.getElementById('image-thumbnails-container');
  if (!container) return;

  container.innerHTML = uploadedImages.map((img, idx) => `
    <div class="relative group w-20 h-20 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-amber-700' : 'border-stone-200'} bg-stone-100 shadow-sm">
      <img src="${img.url}" class="w-full h-full object-contain p-1 bg-white" alt="" />
      ${idx === 0 ? `<span class="absolute top-1 left-1 bg-amber-900 text-white text-[9px] font-bold px-1 rounded">MAIN</span>` : ''}
      <button type="button" onclick="removeUploadedImage(${idx})" class="absolute top-1 right-1 bg-rose-800 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100">✕</button>
    </div>
  `).join('');
}

function removeUploadedImage(idx) {
  uploadedImages.splice(idx, 1);
  renderUploadedThumbnails();
  updateLivePreview();
}

/**
 * Open Add Product Modal
 */
function openAddProductModal() {
  document.getElementById('form-product-id').value = '';
  document.getElementById('product-modal-title').textContent = 'Add New Product';
  document.getElementById('product-form').reset();
  uploadedImages = [];
  renderUploadedThumbnails();
  handleCategoryFormChange();
  updateLivePreview();

  document.getElementById('product-form-modal').classList.remove('hidden');
  document.getElementById('product-form-modal').classList.add('flex');
}

/**
 * Open Edit Product Modal
 */
function openEditProductModal(id) {
  const product = allProducts.find(p => p._id === id);
  if (!product) return;

  document.getElementById('form-product-id').value = product._id;
  document.getElementById('product-modal-title').textContent = 'Edit Product: ' + product.name;

  document.getElementById('form-product-name').value = product.name;
  document.getElementById('form-product-category').value = product.categoryId;
  document.getElementById('form-product-price').value = product.price !== undefined ? product.price : 0;
  document.getElementById('form-product-weight').value = product.weight || product.specs || '';
  document.getElementById('form-product-tag').value = product.tag || '';
  document.getElementById('form-product-desc').value = product.description || '';
  document.getElementById('form-product-features').value = (product.features || []).join(', ');
  document.getElementById('form-product-whatsapp').value = product.whatsappNumber || (product.categoryId === 'custom-sup' || product.categoryId === 'custom-rangoli' ? '8275892945' : '8407913008');
  document.getElementById('form-product-order').value = product.displayOrder || 0;
  document.getElementById('form-product-active').checked = product.active;
  document.getElementById('form-product-featured').checked = product.featured;

  // Restore uploaded images
  uploadedImages = [
    { url: product.mainImage },
    ...(product.additionalImages || []).map(url => ({ url }))
  ];

  renderUploadedThumbnails();
  updateLivePreview();

  document.getElementById('product-form-modal').classList.remove('hidden');
  document.getElementById('product-form-modal').classList.add('flex');
}

function closeProductFormModal() {
  document.getElementById('product-form-modal').classList.add('hidden');
  document.getElementById('product-form-modal').classList.remove('flex');
}

function handleCategoryFormChange() {
  const catSelect = document.getElementById('form-product-category');
  const priceInput = document.getElementById('form-product-price');
  const whatsappInput = document.getElementById('form-product-whatsapp');

  if (!catSelect) return;

  const catVal = catSelect.value;
  if (!document.getElementById('form-product-id').value) {
    if (catVal === 'custom-sup') {
      priceInput.value = 500;
      if (whatsappInput) whatsappInput.value = '8275892945';
    } else if (catVal === 'custom-rangoli') {
      priceInput.value = 0; // 0 indicates Price on Request
      if (whatsappInput) whatsappInput.value = '8275892945';
    } else if (catVal === 'soaps') {
      priceInput.value = 99;
      if (whatsappInput) whatsappInput.value = '8407913008';
    } else if (catVal === 'candles') {
      priceInput.value = 200;
      if (whatsappInput) whatsappInput.value = '8407913008';
    }
  }
}

/**
 * Live Card Preview Generator
 */
function updateLivePreview() {
  const container = document.getElementById('preview-card-container');
  if (!container) return;

  const name = document.getElementById('form-product-name').value || 'Product Title Preview';
  const priceVal = Number(document.getElementById('form-product-price').value || 0);
  const displayPrice = priceVal === 0 ? 'Price on Request' : `₹${priceVal}`;

  const weight = document.getElementById('form-product-weight').value || 'Standard';
  const tag = document.getElementById('form-product-tag').value;
  const desc = document.getElementById('form-product-desc').value || 'Product description preview...';
  const categorySelect = document.getElementById('form-product-category');
  const categoryLabel = categorySelect ? categorySelect.options[categorySelect.selectedIndex]?.text || 'Collection' : 'Collection';
  const mainImg = uploadedImages.length > 0 ? uploadedImages[0].url : 'https://via.placeholder.com/400x400?text=Product+Image';

  container.innerHTML = `
    <div class="bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-md">
      <div class="relative aspect-square overflow-hidden bg-stone-50 p-2">
        <img src="${mainImg}" class="w-full h-full object-contain" alt="" />
        ${tag ? `<span class="absolute top-2 left-2 bg-stone-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">${tag}</span>` : ''}
      </div>
      <div class="p-4 space-y-2">
        <div class="flex justify-between items-center text-[10px] text-amber-800 uppercase font-semibold">
          <span>${categoryLabel}</span>
          <span class="bg-amber-100 px-2 py-0.5 rounded text-amber-900 font-bold">${weight}</span>
        </div>
        <h4 class="font-serif font-bold text-stone-900 text-base leading-tight">${name}</h4>
        <p class="text-xs text-stone-500 line-clamp-2 font-light">${desc}</p>
        <div class="pt-2 flex justify-between items-center border-t border-amber-900/10">
          <span class="font-serif font-bold text-stone-900 text-base">${displayPrice}</span>
          <span class="bg-emerald-800 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">WhatsApp</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Submit Product Form (Create / Edit)
 */
async function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('form-product-id').value;
  const name = document.getElementById('form-product-name').value.trim();
  const categoryId = document.getElementById('form-product-category').value;
  const categorySelect = document.getElementById('form-product-category');
  const categoryLabel = categorySelect ? categorySelect.options[categorySelect.selectedIndex]?.text : 'Collection';
  const price = document.getElementById('form-product-price').value;
  const weight = document.getElementById('form-product-weight').value;
  const tag = document.getElementById('form-product-tag').value;
  const description = document.getElementById('form-product-desc').value;
  const featuresRaw = document.getElementById('form-product-features').value;
  const features = featuresRaw ? featuresRaw.split(',').map(f => f.trim()).filter(Boolean) : [];
  const whatsappNumber = document.getElementById('form-product-whatsapp').value || (categoryId === 'custom-sup' || categoryId === 'custom-rangoli' ? '8275892945' : '8407913008');
  const displayOrder = document.getElementById('form-product-order').value;
  const active = document.getElementById('form-product-active').checked;
  const featured = document.getElementById('form-product-featured').checked;

  if (uploadedImages.length === 0) {
    alert('Please upload at least one product image.');
    return;
  }

  const payload = {
    name,
    categoryId,
    categoryLabel,
    price: Number(price),
    weight,
    tag,
    description,
    features,
    whatsappNumber,
    displayOrder: Number(displayOrder),
    active,
    featured,
    mainImage: uploadedImages[0].url,
    additionalImages: uploadedImages.slice(1).map(i => i.url),
    cloudinaryPublicIds: uploadedImages.map(i => i.public_id).filter(Boolean)
  };

  const btn = document.getElementById('save-product-btn');
  btn.disabled = true;
  btn.innerText = 'SAVING...';

  try {
    const url = id ? `/api/products/${id}` : '/api/products';
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert(id ? 'Product updated successfully.' : 'Product created successfully.');
      closeProductFormModal();
      loadDashboardData();
    } else {
      alert('Error: ' + (data.error || 'Failed to save product.'));
    }
  } catch (err) {
    alert('Network error: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.innerText = 'SAVE PRODUCT';
  }
}

/**
 * Toggle Product Active Status
 */
async function toggleProductActive(id, currentActive) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !currentActive })
    });
    if (res.ok) loadDashboardData();
  } catch (err) {
    console.error('Toggle active error:', err);
  }
}

/**
 * Confirm & Delete Product
 */
function confirmDeleteProduct(id, name) {
  deletingProductId = id;
  document.getElementById('delete-product-name').textContent = name;
  document.getElementById('delete-confirm-modal').classList.remove('hidden');
  document.getElementById('delete-confirm-modal').classList.add('flex');

  document.getElementById('confirm-delete-btn').onclick = function() {
    executeDeleteProduct(id);
  };
}

function closeDeleteConfirmModal() {
  document.getElementById('delete-confirm-modal').classList.add('hidden');
  document.getElementById('delete-confirm-modal').classList.remove('flex');
  deletingProductId = null;
}

async function executeDeleteProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok && data.success) {
      closeDeleteConfirmModal();
      loadDashboardData();
    } else {
      alert('Failed to delete product: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    alert('Error deleting product: ' + err.message);
  }
}

/**
 * CATEGORY MANAGEMENT
 */
function renderCategoriesTable() {
  const tbody = document.getElementById('categories-tbody');
  if (!tbody) return;

  if (allCategories.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-stone-400">No categories found. Click "Add New Category".</td></tr>`;
    return;
  }

  tbody.innerHTML = allCategories.map(c => {
    const prodCount = allProducts.filter(p => p.categoryId === c.slug || (p.categoryLabel && p.categoryLabel.toLowerCase() === c.name.toLowerCase())).length;

    return `
      <tr class="hover:bg-stone-50 border-b border-stone-100">
        <td class="p-4 font-bold text-stone-900">${c.name}</td>
        <td class="p-4 text-stone-500 font-mono text-xs">${c.slug}</td>
        <td class="p-4 font-semibold text-stone-800">${prodCount} Products</td>
        <td class="p-4 text-stone-600">${c.displayOrder || 0}</td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}">
            ${c.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td class="p-4 text-right space-x-2">
          <button onclick="openEditCategoryModal('${c._id}')" class="px-3 py-1 rounded bg-stone-100 text-stone-800 font-semibold hover:bg-stone-200">Edit</button>
          <button onclick="deleteCategory('${c._id}')" class="px-3 py-1 rounded bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddCategoryModal() {
  editingCategoryId = null;
  document.getElementById('category-modal-title').textContent = 'Add New Category';
  document.getElementById('form-category-id').value = '';
  document.getElementById('form-category-name').value = '';
  document.getElementById('form-category-desc').value = '';
  document.getElementById('form-category-order').value = 0;

  document.getElementById('category-form-modal').classList.remove('hidden');
  document.getElementById('category-form-modal').classList.add('flex');
}

function openEditCategoryModal(id) {
  const category = allCategories.find(c => c._id === id);
  if (!category) return;

  editingCategoryId = id;
  document.getElementById('category-modal-title').textContent = 'Edit Category: ' + category.name;
  document.getElementById('form-category-id').value = category._id;
  document.getElementById('form-category-name').value = category.name;
  document.getElementById('form-category-desc').value = category.description || '';
  document.getElementById('form-category-order').value = category.displayOrder || 0;

  document.getElementById('category-form-modal').classList.remove('hidden');
  document.getElementById('category-form-modal').classList.add('flex');
}

function closeCategoryFormModal() {
  document.getElementById('category-form-modal').classList.add('hidden');
  document.getElementById('category-form-modal').classList.remove('flex');
}

async function handleCategoryFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('form-category-id').value;
  const name = document.getElementById('form-category-name').value.trim();
  const description = document.getElementById('form-category-desc').value;
  const displayOrder = document.getElementById('form-category-order').value;

  try {
    const url = id ? `/api/categories/${id}` : '/api/categories';
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, displayOrder: Number(displayOrder) })
    });

    const data = await res.json();

    if (res.ok) {
      alert(id ? 'Category updated.' : 'Category created.');
      closeCategoryFormModal();
      loadDashboardData();
    } else {
      alert('Error: ' + (data.error || 'Failed to save category.'));
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

async function deleteCategory(id) {
  try {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok && data.success) {
      loadDashboardData();
    } else {
      alert(data.error || 'Could not delete category.');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

/**
 * SETTINGS MANAGEMENT
 */
async function handleSettingsSubmit(e) {
  e.preventDefault();
  const businessName = document.getElementById('settings-business-name').value;
  const whatsappNumber = document.getElementById('settings-whatsapp-number').value;
  const contactAddress = document.getElementById('settings-address').value;

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, whatsappNumber, contactAddress })
    });

    if (res.ok) {
      alert('Business settings saved successfully.');
    } else {
      alert('Failed to save settings.');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
}
