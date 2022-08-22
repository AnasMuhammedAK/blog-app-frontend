
import axios from 'axios'
import React, { useState } from 'react'
import { baseURL } from '../../utils/baseURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notify = (alert) => toast(alert)

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${baseURL}/api/users/forgotPassword`, { email })
            console.log(data.message)
            setMsg(data.message)
            setError("")
            notify(data.message)
        } catch (error) {
           
            console.log(error.response.data.error)
            if (error.response) {
                setError(error.response.data.error)
                setMsg('')
                toast(error.response.data.error)
            }
        }

    }

    return (
        <div className='flex items-center justify-center  h-screen w-full '>

            <div className=' w-96 bg-white p-6 rounded-md shadow-sm'>
                <form action="" onSubmit={handleSubmit}>
                    <h2 className="text-center text-2xl py-4">Forgot Password</h2>
                    {/* <h2 className="text-center text-red-600 text-lg py-2">{msg}</h2> */}
                    <label htmlFor="" className='text-gray-700 text-md mx-1 '> Email </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='  Enter your registered email' className='border border-gray-300 hover:border-gray-500 focus:border-gray-500 rounded-md w-full mt-1 py-3 bg-gray-100 text-gray-500 px-1 outline-none mb-4' />
                    <button type='submit' className="bg-blue-500 mb-5 w-full text-white rounded-md hover:bg-blue-600 mt-2 transition-colors py-3">
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword