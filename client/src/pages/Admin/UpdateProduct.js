import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;
const UpdateProduct = () => {
    const nav = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get Single Product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/product/get-product/${params.slug}`
            );

            setName(data.singleProduct.name);
            setId(data.singleProduct._id);
            setDescription(data.singleProduct.description);
            setPrice(data.singleProduct.price);
            setQuantity(data.singleProduct.quantity);
            setShipping(data.singleProduct.shipping);
            setCategory(data.singleProduct.category._id);

            // console.log(data.singleProduct.category.name)

        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);
    //get All Category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/category/all-category')
            if (data?.success) {
                setCategories(data?.catogories)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting categories')

        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    //update product
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = axios.put(`/api/product/update/${id}`, productData)
            if (data?.success) {
                toast.error(data?.message)
            }
            else {
                toast.success('product created successfully')
                nav('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    const handleDelete = async () =>{
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const {data} =await axios.delete(`/api/product/delete/${id}`)
            toast.success('product deleted successfully')
            nav('/dashboard/admin/products')
        } catch (error) {
            console.log(error)
            toast.error('something wnet wrong')
        }
    }
return (
        <Layout title={'update Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1> Update Product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false}
                                placeholder="select a category" size='large' showSearch className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) :
                                    (
                                        <div className="text-center">
                                            <img
                                                src={`/api/product/product-photo/${id}`}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                            </div>
                            <div className='mb-3'>
                                <input type="text" value={name}
                                    placeholder='Write a name' className='form-control'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea type="text" value={description}
                                    placeholder='Write a description' className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type="number" value={price}
                                    placeholder='Write a price' className='form-control'
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type="number" value={quantity}
                                    placeholder='Write a quantity' className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? 'yes' : 'no'}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary ' onClick={handleUpdate} >
                                    update Product
                                </button>
                                <button className='btn btn-danger m-5' onClick={handleDelete} >
                                    delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
    }

    export default UpdateProduct