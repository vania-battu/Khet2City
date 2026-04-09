const router = require('express').Router();
const {
  getAllProducts, getMyProducts, getProduct,
  addProduct, updateProduct, deleteProduct, toggleAvailability,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/',                 getAllProducts);
router.get('/my',               protect, authorize('farmer'),         getMyProducts);
router.get('/:id',              getProduct);
router.post('/',                protect, authorize('farmer'),         upload.single('image'), addProduct);
router.put('/:id',              protect, authorize('farmer'),         upload.single('image'), updateProduct);
router.delete('/:id',           protect, authorize('farmer','admin'), deleteProduct);
router.patch('/:id/toggle',     protect, authorize('farmer'),         toggleAvailability);

module.exports = router;