import React from "react";
import { useSelector } from "react-redux";
import EmailVerificationWarning from "../Alerts/EmailVerification";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import { toast } from "react-toastify";
import AccountVerificationSuccessAlert from "../Alerts/AccountVerificationSuccessAlert";
const Navbar = () => {

  //get user from store
  const { userAuth } = useSelector(state => state.users)
  const isAdmin = userAuth?.isAdmin
  //account verification
  const account = useSelector(state => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
      {/* Display alert */}
      {userAuth && !userAuth.isAccountVerified && <EmailVerificationWarning />}
      {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}

    </>
  );
};

export default Navbar;
