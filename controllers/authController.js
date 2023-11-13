import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
export const registerAuthCtrl = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validation 
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Passowrd is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ message: 'Adress is Required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is Required' })
        }
        //exisiting user
        const userExisting = await userModel.findOne({ email })
        if (userExisting) {
            return res.status(200).send({
                success: false,
                message: 'Error in Registeration',
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        // save 
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()
        res.status(201).send({
            success: true,
            message: "user Register Successfuly",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registreration',
            error
        })
    }
}
//Login 
export const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not register'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token 
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'login successfuly',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}
export const forgotPasswordCtrl = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'newPassword is required' })
        }
        //check 
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findOneAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Somthing went wrong',
            error
        })
    }
}
// test controller
export const testCtrl = (req, res) => {
    try {
        res.send('protected Routes')
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}
//update Profile
export const updateProfileCtrl = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while update profile',
            error
        })
    }
}
export const getOrderCtrl = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate('buyer', "name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while geting orders',
            error
        })
    }
}
export const getAllOrdersCtrl = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .populate('products', '-photo')
            .populate('buyer', 'name')
            .sort({ createAt: '-1' })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while geting All orders',
            error
        })
    }
}
export const orderStatusCtrl = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updateing orders',
            error
        })
    }
}