import React, { useState } from 'react'
import { useNavigate, useLocation ,Link } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [auth, setAuth] = useAuth();

    const nav = useNavigate();
    const location = useLocation()

    const submitHandeler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                nav(location.state || "/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={'Log Ecommerce'}>
            <div className='register'>
                <h1>
                    LogIn Form</h1>
                <form onSubmit={submitHandeler}>
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
                    <div className='mb-3'>
                    <button type="submit" className="btn btn-primary" style={{ width: "300px" }} >Log In</button>
                   </div>
                        <Link onClick={() => { nav('/forgot-password') }}
                            type="submit" className="btn btn-primary" style={{ width: "300px" }} >Forgot Password</Link>

                </form>

            </div>
        </Layout>
    )
}

export default Login

