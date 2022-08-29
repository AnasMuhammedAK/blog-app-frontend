import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navigation/Navbar';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';

function App() {
  return (
    <GoogleOAuthProvider clientId ={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} />
          <Route path='/add-category' element={<AddNewCategory />} />
          <Route path='/category-list' element={<CategoryList />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
