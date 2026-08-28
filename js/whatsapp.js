// Madhuri Creation - WhatsApp Integration Engine (Multi-Number & Category-Specific Routing)

const DEFAULT_MAIN_WHATSAPP = '8407913008';
const CUSTOM_CATEGORY_WHATSAPP = '8275892945';

/**
 * Handle WhatsApp Order for specific product
 * @param {Object} product 
 */
function handleWhatsAppOrder(product) {
  if (!product) {
    handleGeneralWhatsApp();
    return;
  }

  // Determine target WhatsApp number
  let targetNumber = product.whatsappNumber;
  if (!targetNumber) {
    const category = (product.category || product.categoryId || '').toLowerCase();
    if (category === 'custom-sup' || category === 'custom-rangoli' || category.includes('sup') || category.includes('rangoli')) {
      targetNumber = CUSTOM_CATEGORY_WHATSAPP;
    } else {
      targetNumber = DEFAULT_MAIN_WHATSAPP;
    }
  }

  // Sanitize phone number (strip non-digits)
  const cleanPhone = targetNumber.replace(/\D/g, '');
  const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

  const category = (product.category || product.categoryId || '').toLowerCase();
  let messageText = '';

  if (category === 'custom-sup' || category.includes('sup')) {
    // Customized Sup Message Template
    messageText = `Hello Madhuri Creation,\n\nI would like to order a Customized Sup.\n\nProduct/Design: ${product.name}\nPrice: ₹${product.price || 500}\n\nCustomization Details:\n- Photo: Required\n- Name: \n- Event Name: \n- Preferred Color: \n- Preferred Decoration: \n\nPlease contact me to confirm the design and order details.`;
  } else if (category === 'custom-rangoli' || category.includes('rangoli')) {
    // Customized Rangoli Message Template
    const displayPrice = (product.price && product.price > 0) ? `₹${product.price}` : 'Price on Request';
    const displaySize = product.specs || product.weight || 'Standard Size';
    messageText = `Hello Madhuri Creation,\n\nI would like to enquire/order about this Handmade Rangoli.\n\nDesign: ${product.name}\nSize: ${displaySize}\nPrice: ${displayPrice}\n\nPlease share the available sizes, customization options and final price.\n\nThank you.`;
  } else if (category === 'candles' || category.includes('candle')) {
    // Candle Message Template
    const displayType = product.specs || product.weight || 'Handcrafted Candle';
    messageText = `Hello Madhuri Creation,\n\nI would like to order:\n\nProduct: ${product.name}\nType: ${displayType}\nPrice: ₹${product.price}\n\nPlease confirm availability and order details.`;
  } else {
    // Default / Soap Message Template
    messageText = `Hello Madhuri Creation,\n\nI would like to order:\n\nProduct: ${product.name}\nCategory: ${product.categoryLabel || 'Handmade Care'}\nPrice: ₹${product.price}\n\nPlease confirm availability and payment details. Thank you!`;
  }

  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
}

/**
 * Handle General WhatsApp Inquiry
 */
function handleGeneralWhatsApp() {
  const fullPhone = '91' + DEFAULT_MAIN_WHATSAPP;
  const messageText = `Hello Madhuri Creation,\n\nI am visiting your website and would like to enquire about your handcrafted natural soaps, candles, customized sup, and rangoli collections.`;
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
}
