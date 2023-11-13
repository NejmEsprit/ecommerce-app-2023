import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    //initalp details
    useEffect(() => {
        if (params?.slug) getProductDetails()
    }, [params?.slug])
    //getProduct
    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`/api/product/get-product/${params.slug}`)
            setProduct(data?.singleProduct)
            getSimilarProduct(data?.singleProduct._id, data?.singleProduct.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title={'Product Details'}>
            <div className='row container mt-2'>
                <div className='col-md-6'>
                    <img src={`/api/product/product-photo/${product._id}`} className="card-img-top"
                        alt={product.name} height='300' width={'400px'} />
                </div>
                <div className='col-md-6 '>
                    <h1 className='text-center'> Product Details</h1>
                    <h5>Name : {product.name}</h5>
                    <h5>Description : {product.description}</h5>
                    <h5>Price : {product.price}</h5>
                    <h5>Category : {product?.category?.name}</h5>
                    <h5>Shipping : {product.shipping}</h5>
                    <button className='btn btn-secondary ms-1' > ADD TO CART</button>
                </div>
                <hr />
            </div>
            <div className='row container'>
                <h4>Similar product</h4>
                {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
                <div className='d-flex flex-wrap'>
                    {relatedProducts?.map(p => (
                        <div className="card m-2" style={{ width: '17rem', height: '30rem' }} key={p._id}>
                            <img src={`/api/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                                height='300' width={'400px'} />
                            <div className="card-body">
                                <h5 className="card-title">{p?.name}.</h5>
                                <p className="card-text"> {p?.description.substring(0, 30)}</p>
                                <p className="card-text"> {p?.price} DTN.</p>
                                <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}> More details</button>
                                <button className='btn btn-secondary ms-1'> Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout >
    )
}

export default ProductDetails