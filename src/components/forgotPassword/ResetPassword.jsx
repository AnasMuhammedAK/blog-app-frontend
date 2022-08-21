import axios from 'axios'
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../../utils/baseURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify =async (alert) => await toast(alert)
function ResetPassword() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    const params = useParams()
    const token = params.token


    const handleSubmit = async (e) => {
        e.preventDefault()
       
        try {
            
            const { data } = await axios.post(`${baseURL}/api/users/resetpassword`,{password,token:token})
            console.log(data)
            setMsg(data.message)
            setError("")
            notify(data.message)
     
        } catch (error) {
            
            if (error.response) {
                console.log(error.response.data.error)
                setError(error.response.data.error)
                setMsg('')
                notify(error.response.data.error)
            }
        }

    }
  return (
    <div className='flex items-center justify-center  h-screen w-full '>

    <div className=' w-96 bg-white p-6 rounded-md shadow-sm'>
        <form action="" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl py-4">Reset Your Password</h2>
            <label htmlFor="" className='text-gray-700 text-md mx-1 '> New Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='  Enter new password' className='border border-gray-300 hover:border-gray-500 focus:border-gray-500 rounded-md w-full mt-1 py-3 bg-gray-100 text-gray-500 px-1 outline-none mb-4' />
            <button type='submit' className="bg-blue-500 mb-5 w-full text-white rounded-md hover:bg-blue-600 mt-2 transition-colors py-3">
                Submit
            </button>
        </form>
    </div>
    <ToastContainer />
</div>
  )
}

export default ResetPassword