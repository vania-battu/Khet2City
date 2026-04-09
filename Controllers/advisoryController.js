const Advisory = require('../models/Advisory');

const SEED = [
  { type: 'Pest',       title: 'Aphid infestation alert in Telangana',  content: 'Heavy aphid populations in chilli and tomato crops. Apply neem-based spray (5ml/L). Repeat every 7 days.',           region: 'Telangana',      author: 'Dr. K. Reddy, ICAR'  },
  { type: 'Fertilizer', title: 'Optimal NPK for Kharif paddy',          content: 'Apply nitrogen 120 kg/ha in 3 splits. Phosphorus 60 kg/ha as basal dose. Reduce potassium by 15% in clay soils.', region: 'Andhra Pradesh', author: 'ANGRAU Advisory'     },
  { type: 'Scheme',     title: 'PM-KISAN 17th instalment due',           content: '₹2,000 instalment to be credited by March 31. Complete eKYC via Aadhaar on pmkisan.gov.in.',                       region: 'All India',      author: 'PM-KISAN Portal'     },
  { type: 'Technology', title: 'Drone spraying pilot — register now',    content: 'Subsidised drone spraying at ₹400/acre. Reduces water by 90%, pesticides by 40%. Open for Rabi 2025.',            region: 'Andhra Pradesh', author: 'AP Agri Dept'        },
  { type: 'Market',     title: 'Tomato prices surge — sell now',         content: 'Tomato modal price up 6.4% this week in Kurnool & Hyderabad mandis. Good time to list your stock.',                region: 'Telangana',      author: 'Khet2City Market AI' },
];

// GET /api/advisory
exports.getAdvisories = async (req, res) => {
  try {
    const { type, region } = req.query;
    const query = { isActive: true };
    if (type)   query.type   = type;
    if (region) query.region = new RegExp(region, 'i');

    let advisories = await Advisory.find(query).sort({ createdAt: -1 }).limit(20);

    // Return seed data if DB is empty
    if (advisories.length === 0) {
      return res.json({ success: true, isSeed: true, advisories: SEED });
    }

    res.json({ success: true, advisories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/advisory/:id
exports.getAdvisory = async (req, res) => {
  try {
    const advisory = await Advisory.findById(req.params.id);
    if (!advisory) return res.status(404).json({ success: false, message: 'Advisory not found.' });
    res.json({ success: true, advisory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/advisory  (admin only)
exports.createAdvisory = async (req, res) => {
  try {
    const advisory = await Advisory.create(req.body);
    res.status(201).json({ success: true, advisory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/advisory/:id  (admin only)
exports.deleteAdvisory = async (req, res) => {
  try {
    await Advisory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Advisory deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
