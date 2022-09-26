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
import UpdateCategory from './components/Categories/UpdateCategory';
import ProtectRouter from './components/Protect/ProtectRouter';
import Posts from './components/Posts/Posts';
import Unauthorized from './components/UnAuth/UnAuthorized';
import CreatePost from './components/Posts/CreatePost';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';



const ROLES = {
  Admin: "Admin",
  Blogger: "Blogger",
  Guest: "Guest",
}


function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          {/* Can Access Admin, Blogger and Guest*/}
          <Route index path='/home' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='posts' element={<Posts />} />
          <Route path='posts/:id' element={<PostDetails />} />

          {/* Can Access Admin only */}
          <Route path="/" element={<ProtectRouter allowedRoles={[ROLES.Admin]} />} >
            <Route path='add-category' element={<AddNewCategory />} />
            <Route path='category-list' element={<CategoryList />} />
            <Route path='update-category/:id' element={<UpdateCategory />} />
          </Route>

          {/* Can Access Admin and Blogger */}
          <Route path="/" element={<ProtectRouter allowedRoles={[ROLES.Blogger, ROLES.Admin]} />} >
            <Route path='create-post' element={<CreatePost />} />
            <Route path='update-post/:id' element={<UpdatePost />} />
          </Route>

        </Routes>
      </Router>
    </GoogleOAuthProvider >
  );
}

export default App;
