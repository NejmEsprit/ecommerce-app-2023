import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const nav = useNavigate();
    // form function
    const submitHandeler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/auth/register`,
                { name, email, password, phone, address ,answer })

            if (res && res.data.success) {
                toast.success(res.data.message);
                nav('/login');
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')

        }
    }
    return (
        <Layout title={'Regiter Ecommerce'}>
            <div className='register'>
                <h1>
                    Create a new account</h1>
                <form onSubmit={submitHandeler}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder='Enter Your Name'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder='Enter Your Phone'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAdress"
                            placeholder='Enter Your Adress'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='what is Your Favorite sports'
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:"250px"}}>Sign Up</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register