import React from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate()
  //check if user is loggin
  const { userAuth } = useSelector(state => state?.users);
  return (
  <h1>hello</h1>
  );
};

export default AdminRoute;
