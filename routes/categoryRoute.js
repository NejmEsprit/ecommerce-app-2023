import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CreateCategoryCtrl, deleteCategory, getAllCategory, getSingleCategory, updateCategoryCtrl } from "../controllers/categoryController.js";

const router = express.Router()

//routes
// Create Categry | Post
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryCtrl)

//Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryCtrl)

// get All Category
router.get('/all-category',getAllCategory) 

//get singel categorie
router.get('/get-single/:slug', requireSignIn,isAdmin,getSingleCategory)

router.delete('/delete/:id',requireSignIn,isAdmin,deleteCategory)
export default router