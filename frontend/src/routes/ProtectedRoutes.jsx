
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, role }) => {
  
    const navigate = useNavigate();
    const {token, userType} = useAuth()

    useEffect(() => {
      if(!token){
        navigate('/login')
      }
    }, [token])

    useEffect(() => {
      if(userType !== role){
        navigate('/')
      }
    }, [userType, role])

    return (
        <React.Fragment>
            {
                // eslint-disable-next-line react/prop-types
                token ? children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;