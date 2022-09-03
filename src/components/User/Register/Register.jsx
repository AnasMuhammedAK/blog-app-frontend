import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import OtpForm from "../../otpInput/OtpInput";
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";

//Form Schema 
const nameRegex = /^[a-zA-Z ]*$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const formSchema = Yup.object({
  fullName: Yup.string().matches(nameRegex, 'Only alphabetic characters are allowed').max(15, 'Must be 15 characters or less').required('Full name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Must be at least 10 characters').max(10, 'Maximum 10 characters allowed').required('Mobile number is required'),
  password: Yup.string().min(6, 'Password must be atleast 6 characters long').required('Password is required'),
})

//-------------------------------
//Register
//-------------------------------
const Register = () => {
  const [open, setOpen] = useState(false)

  //dispatch
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: values => {
      console.log(values);
      //dispath the action
      setOpen(true)
      dispatch(registerUserAction(values));

    },
    validationSchema: formSchema,
  });
  //select state from store
  const storeData = useSelector(store => store.users)
  const { loading, appErr, serverErr, userAuth } = storeData

  useEffect(() => {

    //redired when registered
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo){
     // toast("successfully registered")
     navigate('/home')
   }
  }, [])

  //handle register with google
//   const googleSuccess = ( res ) => {
// console.log(res);
//   }
//   const googleFailure = ( ) => {
//     console.log('google registration failed ,  try again later')
//   }
// const loginWithGoogle = useGoogleLogin({
//   onSuccess: tokenResponse => console.log(tokenResponse),
// });
const createOrGetUser = async(response) => {
  const decoded = jwtDecode(response.credential)
  const userData = {
      fullName: decoded.name,
      email: decoded.email,
      password: decoded.sub,
  }
  dispatch(registerUserAction(userData))
  console.log(userData)
  }

  return (
    <section style={{ height: '100vh%' }} className="relative py-20 2xl:py-40 bg-slate-100 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <span className="text-lg ml-2 text-blue-500 font-bold">
                  Register Account
                </span>
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-black">
                  Create an account and start pending down your ideas
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-8 lg:py-12 bg-[#DEF7E5] rounded-2xl">
                <form onSubmit={formik.handleSubmit}>
                  <h3 className="mb-5 text-2xl text-center text-black font-bold font-heading">
                    Register Account
                    
                  </h3>
                  <h1 className="mb-5 text-center">
                    {/* display error message */}
                    {appErr || serverErr ? <div className="text-red-400">
                      {serverErr} - {appErr}
                    </div> : null}
                  </h1>

                  {/* Full name */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-200">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.fullName}
                      onChange={formik.handleChange("fullName")}
                      onBlur={formik.handleBlur("fullName")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="fullName"
                      placeholder="Full Name"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.fullName && formik.errors.fullName}
                  </div>
                  {/* Email */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-200">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  {/* Mobile */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-200">
                      <svg
                        className="w-5 h-5"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                          fill="black"
                        ></path>
                        <path
                          d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                          fill="black"
                        ></path>
                        <rect
                          x="15"OR
                          y="15"
                          width="5"
                          height="1"
                          rx="0.5"
                          fill="black"
                        ></rect>
                        <rect
                          x="17"
                          y="18"
                          width="5"
                          height="1"
                          rx="0.5"
                          transform="rotate(-90 17 18)"
                          fill="black"
                        ></rect>
                      </svg>
                    </span>
                    <input
                      value={formik.values.phone}
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none"
                      type="fullName"
                      placeholder="Mobile"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full ">
                    <span className="inline-block pr-3 py-2 border-r border-gray-200">
                      <svg
                        className="w-5 h-5"
                        width="17"
                        height="21"
                        viewBox="0 0 17 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z"
                          fill="black"
                        ></path>
                        <path
                          d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9906 8.74572 15.1907 8.49957 15.1907C8.25342 15.1907 8.05278 14.9906 8.05278 14.7439V12.7088C8.05278 12.5502 7.96833 12.4032 7.83072 12.3228C7.41026 12.078 7.1592 11.6468 7.1592 11.1696C7.1592 10.4307 7.76062 9.82925 8.49957 9.82925C9.2381 9.82925 9.83994 10.4307 9.83994 11.1696C9.83994 11.6468 9.58881 12.078 9.16793 12.3228Z"
                          fill="black"
                        ></path>
                      </svg>
                    </span>
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-300 rounded-r-full focus:outline-none "
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  {/* Err msg*/}
                  <div className="text-red-400 mb-2">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div className="inline-flex mb-10"></div>

                  {loading ? <button
                    disabled
                    className="py-4 w-full bg-gray-500  text-white font-bold rounded-full transition duration-200"
                  >
                    Loading...
                  </button> : <button
                    type="submit"
                    className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                  >
                    Register
                  </button>}
                 
                  <div>
                    <div className=" space-y-2">
                      {/* <GoogleLogin
                        clientId="jfdsjfdjfdfd"
                        render={(renderProps) => {
                          (
                            <button
                            onClick={renderProps.onClick}
                            disabled = {renderProps.disabled}
                              aria-label="Login with Google"
                              type="button"
                              className="flex items-center justify-center w-full py-4 space-x-4 border rounded-full focus:ring-2  border-gray-400 focus:ring-blue-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                              >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                              </svg>
                              <p>Register with Google</p>
                            </button>
                          )
                        }}
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailure}
                        cookiePolicy = "single_host_origin"
                      /> */}
                     
                       
                      {/* <button
                      onClick={loginWithGoogle}
                        aria-label="Login with Google"
                        type="button"
                        className="flex items-center justify-center w-full py-4 space-x-4 border rounded-full focus:ring-2  border-gray-400 focus:ring-blue-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-5 h-5 fill-current"
                        >
                          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Register with Google</p>
                      </button> */}
                      {/* <button
                            aria-label="Login with Facebook"
                            role="button"
                            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50" height="50"
                                viewBox="0 0 50 50"
                                className='w-5 h-5 fill-current'>
                                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                            </svg>
                            <p>Login with Facebook</p>
                        </button> */}
                    </div>
                  </div>

                </form>
                 {/* login with google */}
                 <h1 className="text-center mt-3"> OR </h1>
                  <div className="w-full mt-3 flex items-center justify-center">
                  <GoogleLogin
                  size= "large"
                  theme= ""
                  text= "signup_with"
                      onSuccess={(response) => {
                        createOrGetUser(response)
                      }}
                      onError = {() => {
                        console.log('Error with google login');
                        toast('Error with google Signup');
                      }}
                       />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtpForm open={open} setOpen={setOpen} />
    </section>
  );
};

export default Register;
