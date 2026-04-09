const RESPONSES = {
  tomato:      'For tomatoes, apply NPK 120:60:60 kg/ha. Foliar spray of 0.5% boron during flowering improves fruit set. Water every 3–4 days in dry season. 🍅',
  potato:      'Potatoes need well-drained loamy soil. Plant at 60×20 cm spacing. Apply 150:80:100 kg/ha NPK. Watch for late blight — spray Mancozeb 0.25% preventively. 🥔',
  onion:       'Onion transplanting: maintain 15×10 cm spacing. Top dress with 50 kg N/ha at 30 days. Reduce irrigation 2 weeks before harvest for better storage. 🧅',
  wheat:       'Best sowing time for wheat in AP/Telangana: Oct 15 – Nov 15. Use HD-2967 or GW-322 varieties. Seed rate: 100 kg/ha. Irrigate at crown root initiation (21 days). 🌾',
  rice:        'For rice: maintain 5 cm standing water during tillering. Apply zinc sulfate 25 kg/ha as basal dose. Watch for blast disease in humid conditions. 🌾',
  maize:       'Maize sowing: June–July for Kharif. Spacing 60×20 cm. Apply 120:60:40 kg/ha NPK. Earthing up at 30 days prevents lodging. 🌽',
  aphid:       'For aphid control: spray neem oil (5 ml/L) + soap solution early morning. Chemical: Imidacloprid 0.3 ml/L. Repeat after 7 days. Avoid spraying when bees are active. 🌿',
  pest:        'For general pest management: use IPM approach — sticky traps, neem-based sprays first, then chemicals only if needed. Always spray at recommended doses. 🐛',
  fertilizer:  'Use soil test–based fertilizer application. Generally: Urea for nitrogen, SSP for phosphorus, MOP for potassium. Split nitrogen into 3 doses for best results. 🌱',
  organic:     'For organic farming: use compost (5 t/ha), vermicompost, green manure. Bio-fertilizers like Rhizobium and Azospirillum improve soil health significantly. 🌿',
  soil:        'Soil health tip: maintain pH 6.0–7.5 for most crops. Add lime if acidic, gypsum if alkaline. Organic matter >1.5% is ideal. Test soil every 3 years. 🌍',
  weather:     'Monitor weather alerts on the Khet2City dashboard daily. Avoid pesticide spray when rain is forecast within 24 hours. Use drip irrigation during dry spells. ☁️',
  irrigation:  'Drip irrigation saves 40–50% water vs flood. Use tensiometer to judge moisture needs. Irrigate early morning to reduce evaporation losses. 💧',
  'pm-kisan':  'PM-KISAN: ₹6,000/year in 3 instalments for all small/marginal farmers. Apply at pmkisan.gov.in or CSC with Aadhaar + land records. eKYC is mandatory. 🏛️',
  scheme:      'Key farmer schemes: PM-KISAN (₹6000/yr), PM Fasal Bima Yojana (crop insurance), Kisan Credit Card (low interest loans), eNAM (online mandi trading). 🏛️',
  price:       'Check today\'s live mandi prices on the Prices tab. Sell directly on Khet2City marketplace to get 10–15% more than mandi rates by removing middlemen. 📊',
  milk:        'Buffalo milk yield improvement: feed balanced TMR diet, ensure 12–14 hrs rest, clean milking 2x/day. Vaccinate for FMD and HS regularly. 🥛',
  default:     'Great question! I\'m checking the latest advisory from ICAR and state agriculture departments. For precise guidance, also consult your local Krishi Vigyan Kendra (KVK). You can also browse the Advisory section for detailed tips. 🌾',
};

// POST /api/chat
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const lower = message.toLowerCase();
    const key   = Object.keys(RESPONSES).find(k => lower.includes(k)) || 'default';

    // Simulate slight thinking delay
    res.json({
      success:  true,
      message:  RESPONSES[key],
      matchedKeyword: key !== 'default' ? key : null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
