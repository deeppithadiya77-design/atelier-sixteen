/**
 * Atelier Sixteen — Lead Generation & Contact Configuration
 *
 * Replace the placeholders below to connect your live backend endpoints:
 * 1. Web3Forms: https://web3forms.com/ (paste your access key)
 * 2. Google Sheets: Deploy a Google Apps Script Web App URL to log leads
 * 3. WhatsApp: Use digits only with country code (e.g., "918799612229")
 */

export const STUDIO_CONTACT = {
  brandName: 'Atelier Sixteen',
  tagline: 'INTERIOR | ARCHITECTURE | LANDSCAPE',
  email: 'atelier.sixteen16@gmail.com',
  phoneDisplay: '+91 87996 12229',
  whatsappNumber: '918799612229',
  instagramHandle: '@ateliersixteen_16',
  instagramUrl: 'https://www.instagram.com/ateliersixteen_16/',
  addresses: [
    {
      label: 'Rajkot Studio',
      line: 'B-218, RK Iconic, 150 Feet Ring Road, Near Shital Park, Rajkot, Gujarat',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=B-218%2C%20RK%20Iconic%2C%20150%20Feet%20Ring%20Road%2C%20Near%20Shital%20Park%2C%20Rajkot%2C%20Gujarat',
    },
    {
      label: 'Ahmedabad Studio',
      line: '307 Athena Avenue, Nr. Land Rover Showroom, S. G. Highway, Gota, 382481, Ahmedabad',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=307%20Athena%20Avenue%2C%20Nr.%20Land%20Rover%20Showroom%2C%20S.%20G.%20Highway%2C%20Gota%2C%20382481%2C%20Ahmedabad',
    },
  ],
  studioHours: 'Monday — Saturday, 10:00 AM – 7:00 PM IST',
};

export const LEAD_INTEGRATION_CONFIG = {
  // Paste your Web3Forms public access key here to receive email notifications
  web3FormsAccessKey: '',
  // Paste your Google Apps Script Web App URL here to append leads to a Sheet
  googleSheetsWebhookUrl: '',
};

/**
 * Builds a pre-filled WhatsApp click-to-chat URL using the submitted project details.
 */
export function buildWhatsAppUrl(formData = {}) {
  const lines = [
    'Hello Atelier Sixteen,',
    "I'd like to discuss a project consultation.",
  ];

  if (formData.projectType) lines.push(`• Project Type: ${formData.projectType}`);
  if (formData.city) lines.push(`• City / Location: ${formData.city}`);
  if (formData.areaSqFt) lines.push(`• Approximate Area: ${formData.areaSqFt} sq. ft.`);
  if (formData.budgetRange) lines.push(`• Budget Range: ${formData.budgetRange}`);
  if (formData.fullName) lines.push(`• Name: ${formData.fullName}`);
  if (formData.phone) lines.push(`• Phone: ${formData.phone}`);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${STUDIO_CONTACT.whatsappNumber}?text=${text}`;
}

/**
 * Submits a consultation lead to configured integrations (Web3Forms / Google Sheets).
 * Falls back cleanly to local confirmation when keys are not yet configured.
 */
export async function submitConsultationLead(payload) {
  const tasks = [];

  if (LEAD_INTEGRATION_CONFIG.web3FormsAccessKey) {
    tasks.push(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: LEAD_INTEGRATION_CONFIG.web3FormsAccessKey,
          subject: `New Atelier Sixteen Inquiry — ${payload.projectType} (${payload.city})`,
          from_name: 'Atelier Sixteen Website',
          ...payload,
        }),
      })
    );
  }

  if (LEAD_INTEGRATION_CONFIG.googleSheetsWebhookUrl) {
    tasks.push(
      fetch(LEAD_INTEGRATION_CONFIG.googleSheetsWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          ...payload,
        }),
      })
    );
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  } else {
    // Brief intentional pause so confirmation feedback feels composed
    await new Promise((resolve) => setTimeout(resolve, 450));
  }

  return { ok: true };
}
