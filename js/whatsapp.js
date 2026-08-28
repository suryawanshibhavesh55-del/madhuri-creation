// Madhuri Creation - WhatsApp Integration Engine

const WHATSAPP_NUMBER = "918407913008"; // Standard WhatsApp format for 8407913008

/**
 * Creates a pre-filled WhatsApp click-to-chat URL for a specific product
 * @param {Object} product - Product details object
 * @returns {string} Encoded WhatsApp URL
 */
function createWhatsAppOrderUrl(product) {
  const specText = product.weight ? `Weight: ${product.weight}` : (product.specs ? `Specs: ${product.specs}` : '');
  
  const message = 
`Hello Madhuri Creation! 🌸

I would like to place an order for:

📌 Product: ${product.name}
🏷️ Category: ${product.categoryLabel}
💰 Price: ₹${product.price}${specText ? `\n📦 ${specText}` : ''}

Please confirm availability and delivery details. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a general inquiry WhatsApp URL
 * @returns {string} Encoded WhatsApp URL
 */
function createWhatsAppGeneralUrl() {
  const message = 
`Hello Madhuri Creation! 🌸

I'm interested in your handcrafted soaps and candles. Could you please share more details or help me with custom/bulk orders?

Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp order link in a new window/tab safely
 * @param {Object} product 
 */
function handleWhatsAppOrder(product) {
  if (!product) return;
  const url = createWhatsAppOrderUrl(product);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Opens General WhatsApp link
 */
function handleGeneralWhatsApp() {
  const url = createWhatsAppGeneralUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
}

if (typeof window !== 'undefined') {
  window.createWhatsAppOrderUrl = createWhatsAppOrderUrl;
  window.createWhatsAppGeneralUrl = createWhatsAppGeneralUrl;
  window.handleWhatsAppOrder = handleWhatsAppOrder;
  window.handleGeneralWhatsApp = handleGeneralWhatsApp;
}
