// Madhuri Creation - Product Modal Engine

let activeModalProduct = null;

function openProductModal(productId) {
  const product = window.PRODUCT_CATALOG.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;

  const modalOverlay = document.getElementById('product-modal');
  if (!modalOverlay) return;

  // Set Content
  const modalImg = document.getElementById('modal-main-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalPrice = document.getElementById('modal-price');
  const modalSpec = document.getElementById('modal-spec');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalThumbnails = document.getElementById('modal-thumbnails');
  const modalWaBtn = document.getElementById('modal-wa-btn');

  modalTitle.textContent = product.name;
  modalCategory.textContent = product.categoryLabel;
  modalPrice.textContent = `₹${product.price}`;
  modalSpec.textContent = product.weight ? `Weight: ${product.weight}` : (product.specs || '');
  modalDesc.textContent = product.description;

  // Render Features
  if (modalFeatures) {
    modalFeatures.innerHTML = product.features.map(f => 
      `<li class="flex items-center text-stone-700 text-sm py-1">
        <svg class="w-4 h-4 mr-2 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${f}
      </li>`
    ).join('');
  }

  // Set Main Image
  modalImg.src = product.mainImage;
  modalImg.alt = product.name;

  // Render Thumbnails
  const allImages = [product.mainImage, ...(product.additionalImages || [])];
  const uniqueImages = [...new Set(allImages)];

  if (modalThumbnails) {
    if (uniqueImages.length > 1) {
      modalThumbnails.style.display = 'flex';
      modalThumbnails.innerHTML = uniqueImages.map((imgSrc, idx) => `
        <button 
          onclick="changeModalImage('${imgSrc}', this)"
          class="thumb-btn border-2 ${idx === 0 ? 'border-amber-700 opacity-100' : 'border-transparent opacity-70'} hover:opacity-100 rounded-lg overflow-hidden transition-all duration-200 w-16 h-16 flex-shrink-0 focus:outline-none"
        >
          <img src="${imgSrc}" class="w-full h-full object-cover" alt="Thumbnail" />
        </button>
      `).join('');
    } else {
      modalThumbnails.style.display = 'none';
      modalThumbnails.innerHTML = '';
    }
  }

  // Configure WhatsApp button
  if (modalWaBtn) {
    modalWaBtn.onclick = function() {
      window.handleWhatsAppOrder(product);
    };
  }

  // Show Modal
  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

function changeModalImage(imgSrc, btnEl) {
  const modalImg = document.getElementById('modal-main-img');
  if (modalImg) {
    modalImg.src = imgSrc;
  }
  const buttons = document.querySelectorAll('#modal-thumbnails button');
  buttons.forEach(b => {
    b.classList.remove('border-amber-700', 'opacity-100');
    b.classList.add('border-transparent', 'opacity-70');
  });
  if (btnEl) {
    btnEl.classList.remove('border-transparent', 'opacity-70');
    btnEl.classList.add('border-amber-700', 'opacity-100');
  }
}

function closeProductModal() {
  const modalOverlay = document.getElementById('product-modal');
  if (!modalOverlay) return;
  modalOverlay.classList.add('hidden');
  modalOverlay.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  activeModalProduct = null;
}

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});

if (typeof window !== 'undefined') {
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
  window.changeModalImage = changeModalImage;
}
