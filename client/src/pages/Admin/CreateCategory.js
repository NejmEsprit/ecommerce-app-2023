import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'
const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('somthing went wrong in input form')
        }
    }

    //get All categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/category/all-category')
            if (data?.success) {
                setCategories(data.catogories)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting categories')
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    //update Category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //delete category 
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/category/delete/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    return (
        <Layout title={'create category'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1> Manage Categoty</h1>
                        <div className='p-3 '>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name Category</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}> {c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary m-2'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c)
                                                        }}>Edit</button>
                                                    <button
                                                        key={c._id}
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(c._id)
                                                        }>
                                                        Delete</button>
                                                </td>
                                            </tr >
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        visible={visible}
                    >
                        <CategoryForm
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                        />
                    </Modal>
                </div>
            </div>
        </Layout >
    )
}

export default CreateCategory