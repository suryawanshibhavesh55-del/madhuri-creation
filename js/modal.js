// Madhuri Creation - Product Quick View Modal Engine

function openProductModal(productId) {
  if (!window.PRODUCT_CATALOG) return;

  const product = window.PRODUCT_CATALOG.find(p => (p.id === productId || p._id === productId));
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalContent = document.getElementById('modal-content');

  if (!modal || !modalContent) return;

  const category = (product.category || product.categoryId || '').toLowerCase();
  const isCustomSup = category === 'custom-sup' || category.includes('sup');
  const isCustomRangoli = category === 'custom-rangoli' || category.includes('rangoli');
  const isPriceOnRequest = !product.price || product.price === 0;

  const displayPrice = isPriceOnRequest ? 'Price on Request' : `₹${product.price}`;
  const ctaText = isCustomSup ? 'ORDER / CUSTOMIZE ON WHATSAPP' : (isCustomRangoli ? 'ENQUIRE / CUSTOMIZE ON WHATSAPP' : 'ORDER ON WHATSAPP');

  // Collect all gallery images
  const allImages = [product.mainImage, ...(product.additionalImages || [])].filter(Boolean);

  // Devanagari / Marathi supporting features & customization badges
  const featuresList = (product.features || []).map(f => `
    <li class="flex items-center gap-2 text-stone-700 text-xs sm:text-sm">
      <span class="text-amber-800 text-base">✦</span>
      <span>${f}</span>
    </li>
  `).join('');

  modalContent.innerHTML = `
    <div class="relative bg-cream-50 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-900/10 shadow-2xl flex flex-col md:flex-row">
      <!-- Close Button -->
      <button 
        onclick="closeProductModal()"
        class="absolute top-4 right-4 z-20 bg-stone-900/80 hover:bg-stone-900 text-cream-50 w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none"
      >
        ✕
      </button>

      <!-- Image Gallery Column -->
      <div class="md:w-1/2 bg-stone-900/5 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-amber-900/10">
        <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-inner border border-amber-900/10 flex items-center justify-center">
          <img 
            id="modal-main-img"
            src="${product.mainImage}" 
            alt="${product.name}" 
            class="w-full h-full ${isCustomSup || isCustomRangoli ? 'object-contain p-2' : 'object-cover'} transition-all duration-300"
          />
          ${product.tag ? `
            <span class="absolute top-3 left-3 bg-stone-900/80 text-amber-200 text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border border-amber-500/30">
              ${product.tag}
            </span>
          ` : ''}
        </div>

        <!-- Gallery Thumbnails -->
        ${allImages.length > 1 ? `
          <div class="flex items-center justify-center gap-3 mt-4 overflow-x-auto w-full pb-2">
            ${allImages.map((img, idx) => `
              <button 
                onclick="switchModalImage('${img}', this)"
                class="w-14 h-14 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-amber-900 shadow' : 'border-stone-200 opacity-70'} hover:opacity-100 transition-all flex-shrink-0 bg-white"
              >
                <img src="${img}" class="w-full h-full object-cover" alt="" />
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Details Column -->
      <div class="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          <div class="flex items-center justify-between text-xs text-amber-900 font-bold uppercase tracking-widest mb-2">
            <span>${product.categoryLabel || 'Madhuri Creation'}</span>
            ${product.weight || product.specs ? `<span class="bg-amber-100/80 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">${product.weight || product.specs}</span>` : ''}
          </div>

          <h2 class="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-snug">
            ${product.name}
          </h2>

          <div class="mt-3 flex items-baseline gap-3">
            <span class="text-2xl sm:text-3xl font-serif font-bold text-stone-900">${displayPrice}</span>
            ${isPriceOnRequest ? '<span class="text-xs text-stone-500 font-medium">(Varies by size & design)</span>' : ''}
          </div>

          <p class="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mt-4">
            ${product.description}
          </p>

          <!-- Customization Highlights for Sup & Rangoli -->
          ${isCustomSup ? `
            <div class="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-900/10 text-xs space-y-1.5 text-stone-800">
              <div class="font-bold text-amber-900 flex items-center gap-1.5">
                <span>📸 Customization Included:</span>
              </div>
              <p>• तुमचा फोटो + नाव + कार्यक्रमाचे नाव (डोहाळे जेवण / मंगळागौर)</p>
              <p>• आवडीनुसार रंग व traditional सजावट</p>
            </div>
          ` : ''}

          ${isCustomRangoli ? `
            <div class="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-900/10 text-xs space-y-1.5 text-stone-800">
              <div class="font-bold text-amber-900 flex items-center gap-1.5">
                <span>🌸 Perfect For:</span>
              </div>
              <p>गौरी आगमन, गणपती, नवरात्र, दिवाळी, मंगळागौर, लक्ष्मीपूजन, गृहप्रवेश & पूजा</p>
            </div>
          ` : ''}

          <!-- Features Bullet List -->
          ${featuresList ? `
            <div class="mt-5 pt-4 border-t border-amber-900/10">
              <h4 class="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">Highlights & Features</h4>
              <ul class="space-y-2">
                ${featuresList}
              </ul>
            </div>
          ` : ''}
        </div>

        <!-- WhatsApp Ordering Action Button -->
        <div class="pt-6 border-t border-amber-900/10 space-y-3">
          <button 
            onclick="handleWhatsAppOrder(window.PRODUCT_CATALOG.find(p => (p.id === '${product.id}' || p._id === '${product.id}')))"
            class="w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg class="w-5 h-5 fill-current text-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.151 4.202 4.294-1.127z"/>
            </svg>
            <span>${ctaText}</span>
          </button>
          <p class="text-[11px] text-stone-600 text-center font-light">
            Direct WhatsApp response from Madhuri Creation (Number: ${product.whatsappNumber || (isCustomSup || isCustomRangoli ? '8275892945' : '8407913008')})
          </p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
}

function switchModalImage(imgUrl, btnEl) {
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) {
    mainImg.src = imgUrl;
  }
  btnEl.parentElement.querySelectorAll('button').forEach(b => {
    b.classList.remove('border-amber-900', 'shadow');
    b.classList.add('border-stone-200', 'opacity-70');
  });
  btnEl.classList.remove('border-stone-200', 'opacity-70');
  btnEl.classList.add('border-amber-900', 'shadow');
}
