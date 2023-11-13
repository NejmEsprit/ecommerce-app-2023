import { configDotenv } from "dotenv"
import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const CreateCategoryCtrl = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'name is required' })
        }
        const existCategory = await categoryModel.findOne({ name })
        if (existCategory) {
            return res.status(200).send({
                success: true,
                message: 'category Already Exists'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category created',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
}
//update category Controller
export const updateCategoryCtrl = async (req, res) => {
    try {
        const { name } = req.body
        //  const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(req.params.id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'categoru updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'
        })

    }
}

//gel all Categorty Controller
export const getAllCategory = async (req, res) => {
    try {
        const catogories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'all categories List',
            catogories
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, error,
            message: 'Error while getting all categotry'
        })
    }
}

//get single Category

export const getSingleCategory = async (req, res) => {
    try {
        const singleCategory = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: 'get single category successfully',
            singleCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting Category'
        })
    }
}
// delete Category 
export const deleteCategory = async (req, res) => {
    try {
        const deleteCate = await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:'categorty deleted successfully',
            deleteCate
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting category',
        })
    }
}