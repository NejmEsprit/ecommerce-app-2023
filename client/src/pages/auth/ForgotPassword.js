import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const nav = useNavigate();

    const submitHandeler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/auth/forgot-password", {
                email,
                newPassword,
                answer,
            })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                nav("/login")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={'forgot Password'}>
            <div className='register'>
                <h1>
                    Reset Password</h1>
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
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='Enter Your favorite Sport Name'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "300px" }} >Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword