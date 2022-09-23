import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {

  //get user from store
  const { userAuth } = useSelector (state => state.users)
  const isAdmin = userAuth?.isAdmin
  return (
    <>
       {isAdmin ? (
        <AdminNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
     
    </>
  );
};

export default Navbar;
