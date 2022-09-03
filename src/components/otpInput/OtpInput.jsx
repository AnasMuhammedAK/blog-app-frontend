
import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import publicAxios from '../../utils/publicAxios';




const OtpForm = ({ open, setOpen }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const [state, setState] = useState({ otp: "" });
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    const handleChange = (otp) => setState({ otp });
    const notify =async (alert) =>await toast(alert)
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(state.otp, 'otp', user.phone);
        setOpen(false)

        try {
            const { data } = await publicAxios.post(`/api/users/verifyotp`, { otp: state.otp, id: user._id, phone: user.phone })
            console.log(data.message)
            toast(data.message)
            //alert(data.message)
            if(data.status){
                setStatus(true)
                
            }else{
                setState({ otp:'' })
                setOpen(true)
            }
           
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error)
                notify(error.response.data.error)
            }
        }
    }
    useEffect(() => {

        //redired when registered
        if (status) {
            navigate('/home')
        }
    }, [status])
    return (
        <>

            {open ? (
                <>
                   
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="  w-1/4 my-6 mx-auto max-w-7xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font-semibold text-center"> Enter Your OTP </h3>

                                </div>
                                <div className='flex justify-center'>
                                    <OtpInput className='flex ' inputStyle={{
                                        width: "2rem",
                                        height: "2rem",
                                        margin: "20px 0.25rem",
                                        fontSize: "2rem",
                                        borderRadius: 4,
                                        border: "1px solid #051b34",
                                    }}
                                        value={state.otp}
                                        onChange={handleChange}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    />
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white bg-rose-700 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-rose-700 active:bg-rose-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </>
            ) : null}
        </>
    );
};

export default OtpForm;