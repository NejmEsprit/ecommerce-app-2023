import express from "express";
import { forgotPasswordCtrl, getAllOrdersCtrl, getOrderCtrl, loginCtrl, orderStatusCtrl, registerAuthCtrl, testCtrl, updateProfileCtrl } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object 
const router = express.Router()

//routing 
// Register || method :POST
router.post('/register', registerAuthCtrl)
// Login || Post 
router.post('/login', loginCtrl)
//Forgot Password || Post

router.post('/forgot-password', forgotPasswordCtrl)
//test routes
router.get('/test', requireSignIn, isAdmin, testCtrl)
//protected User Route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//protected Admin Route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true,
        message: 'your admin'
    })
})
//Update Profile
router.put('/profile', requireSignIn, updateProfileCtrl)
router.get('/orders', requireSignIn, getOrderCtrl)
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersCtrl)
//order status update 
router.put('/order-status/:orderId' ,requireSignIn,isAdmin,orderStatusCtrl)
export default router