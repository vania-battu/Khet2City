const router = require('express').Router();
const {
  getAllProducts, getMyProducts, getProduct,
  createProduct, updateProduct, deleteProduct, toggleAvailability,
} = require('../Controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/',                 getAllProducts);
// Basic mock of farmer and getMyProducts for now just to pass routes without blowing up the server
// router.get('/my',               protect, authorize('farmer'),         getMyProducts);
// router.get('/:id',              getProduct);
router.post('/',                protect, authorize('farmer'), createProduct);
router.put('/:id',              protect, authorize('farmer'), updateProduct);
router.delete('/:id',           protect, authorize('farmer','admin'), deleteProduct);
// router.patch('/:id/toggle',     protect, authorize('farmer'),         toggleAvailability);

module.exports = router;