import React from "react";
import { Route, Navigate,Outlet } from "react-router-dom";
import API from "./API";

function ProtectedRoute() {
	return(
				API.isAuth() && !API.checkTokenExp()? 
				<Outlet  /> :
				<Navigate to='/signin' />
				);
}


export default ProtectedRoute;

