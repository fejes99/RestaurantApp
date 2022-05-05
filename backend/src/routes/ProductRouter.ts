import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsExtended,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/extended').get(getAllProductsExtended);
router.route('/:id').get(getProduct);
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;
