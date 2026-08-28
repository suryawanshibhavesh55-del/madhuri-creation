// Madhuri Creation - Product Quick View Modal Engine (Indian Handcrafted Theme)

function openProductModal(productId) {
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-content');

  if (!modal || !content || !window.PRODUCT_CATALOG) return;

  const product = window.PRODUCT_CATALOG.find(p => p.id === productId || p._id === productId);
  if (!product) return;

  const category = (product.category || product.categoryId || '').toLowerCase();
  const isCustomSup = category === 'custom-sup' || category.includes('sup');
  const isCustomRangoli = category === 'custom-rangoli' || category.includes('rangoli');
  const isPriceOnRequest = !product.price || product.price === 0;
  const displayPrice = isPriceOnRequest ? 'Price on Request' : `₹${product.price}`;

  const ctaText = isCustomSup ? 'Customize / Order on WhatsApp' : (isCustomRangoli ? 'Enquire / Customize on WhatsApp' : 'Order on WhatsApp');

  const galleryImages = [
    product.mainImage,
    ...(product.additionalImages || [])
  ];

  content.innerHTML = `
    <div class="relative bg-festive-card rounded-3xl overflow-hidden shadow-2xl border border-amber-900/20 max-w-4xl w-full mx-auto my-8">
      
      <!-- Close Button -->
      <button 
        onclick="closeProductModal()"
        class="absolute top-4 right-4 z-20 bg-stone-900/80 hover:bg-stone-900 text-amber-100 p-2.5 rounded-full shadow-lg transition-colors border border-amber-500/30"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-0">
        
        <!-- Left: Image Gallery -->
        <div class="md:col-span-6 bg-white p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-900/10">
          
          <!-- Main Display -->
          <div class="relative aspect-square overflow-hidden rounded-2xl bg-stone-50 border border-amber-900/10 shadow-inner flex items-center justify-center p-2">
            <img 
              id="modal-main-img" 
              src="${product.mainImage}" 
              alt="${product.name}" 
              class="w-full h-full ${isCustomSup || isCustomRangoli ? 'object-contain' : 'object-cover'} rounded-xl"
            />
            ${product.tag ? `
              <span class="absolute top-3 left-3 bg-[#6B1D2F] text-amber-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/40 shadow-md">
                ${product.tag}
              </span>
            ` : ''}
          </div>

          <!-- Thumbnail Strip -->
          ${galleryImages.length > 1 ? `
            <div class="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              ${galleryImages.map((img, idx) => `
                <button 
                  onclick="changeModalImage('${img}')"
                  class="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-900/20 hover:border-amber-700 transition-all flex-shrink-0 bg-stone-50 p-1"
                >
                  <img src="${img}" class="w-full h-full ${isCustomSup || isCustomRangoli ? 'object-contain' : 'object-cover'} rounded-lg" alt="" />
                </button>
              `).join('')}
            </div>
          ` : ''}

        </div>

        <!-- Right: Details & Call-To-Action -->
        <div class="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white/95">
          
          <div class="space-y-4">
            
            <div class="flex items-center justify-between text-xs font-semibold text-amber-900 uppercase tracking-widest">
              <span class="flex items-center gap-1"><span>✦</span> ${product.categoryLabel}</span>
              ${product.weight || product.specs ? `<span class="bg-amber-100/90 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-900/15">${product.weight || product.specs}</span>` : ''}
            </div>

            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              ${product.name}
            </h2>

            <div class="flex items-baseline gap-3 pt-1">
              <span class="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                ${displayPrice}
              </span>
              ${isPriceOnRequest ? '<span class="text-xs text-amber-800 font-semibold">(Customizable size & design)</span>' : ''}
            </div>

            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed font-light font-devanagari">
              ${product.description}
            </p>

            <!-- Customization Highlight Callout for Sup & Rangoli -->
            ${isCustomSup ? `
              <div class="bg-amber-50 p-4 rounded-2xl border border-amber-300/60 space-y-1.5 text-xs text-amber-950">
                <div class="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>📸</span> <span>Photo & Name Customization</span>
                </div>
                <p class="font-light text-[11px]">तुमचा फोटो, नाव, कार्यक्रमाचे नाव (डोहाळे जेवण / मंगळागौर) आणि आवडीनुसार रंग व सजावट करून मिळेल.</p>
              </div>
            ` : ''}

            ${isCustomRangoli ? `
              <div class="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1.5 text-xs text-purple-950">
                <div class="font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                  <span>🪷</span> <span>Perfect For Celebrations</span>
                </div>
                <p class="font-light text-[11px]">गौरी आगमन, गणपती, नवरात्र, दिवाळी, मंगळागौर, लक्ष्मीपूजन, गृहप्रवेश & पूजा.</p>
              </div>
            ` : ''}

            <!-- Features List -->
            ${product.features && product.features.length > 0 ? `
              <div class="pt-2">
                <span class="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-2">Key Highlights</span>
                <ul class="grid grid-cols-1 gap-1.5 text-xs text-stone-700 font-medium">
                  ${product.features.map(f => `
                    <li class="flex items-center gap-2">
                      <span class="text-amber-700 text-sm">✔</span>
                      <span>${f}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

          </div>

          <!-- Bottom Order Button -->
          <div class="pt-4 border-t border-amber-900/10">
            <button 
              onclick="handleWhatsAppOrder(window.PRODUCT_CATALOG.find(p => p.id === '${product.id}' || p._id === '${product.id}'))"
              class="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all duration-200 border border-emerald-600/40"
            >
              <svg class="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.151 4.202 4.294-1.127z"/>
              </svg>
              <span>${ctaText}</span>
            </button>
          </div>

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

function changeModalImage(imgSrc) {
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) {
    mainImg.src = imgSrc;
  }
}
