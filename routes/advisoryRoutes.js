const router = require('express').Router();
const { getAdvisories, getAdvisory, createAdvisory, deleteAdvisory } = require('../controllers/advisoryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/',      getAdvisories);
router.get('/:id',   getAdvisory);
router.post('/',     protect, authorize('admin'), createAdvisory);
router.delete('/:id',protect, authorize('admin'), deleteAdvisory);

module.exports = router;