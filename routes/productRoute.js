import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    braintreePaymentCtrl,
    braintreeTokenCtrl,
    createProductCtrl,
    deleteProductCtrl,
    getProductsCtrl,
    getSingleProductCtrl,
    productCountCtrl,
    productFiltersController,
    productPerPageCtrl,
    productPhotoCtrl,
    productsByCategoryCtrl,
    realtedProductCtrl,
    searchProductCtrl,
    updateProductCtrl,
} from "../controllers/productController.js";
import formidable from 'express-formidable';
const router = express.Router()

// routes
//create Product
router.post('/create', requireSignIn, isAdmin, formidable(), createProductCtrl)
router.put('/update/:pid', requireSignIn, isAdmin, formidable(), updateProductCtrl)
router.get('/get-product', getProductsCtrl)
router.get('/get-product/:slug', getSingleProductCtrl)
router.get('/product-photo/:pid', productPhotoCtrl)

router.delete('/delete/:pid', isAdmin, deleteProductCtrl)
router.post('/product-filtres', productFiltersController)

// product Count 
router.get('/product-count', productCountCtrl)

//product per page
router.get('/product-list/:page', productPerPageCtrl)
router.get('/search/:keyword', searchProductCtrl)

//similar product
router.get('/related-product/:pid/:cid', realtedProductCtrl)

//category wise product
router.get('/product-category/:slug', productsByCategoryCtrl)

//payments routes
//token
router.get("/braintree/token",braintreeTokenCtrl)
//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentCtrl)

export default router