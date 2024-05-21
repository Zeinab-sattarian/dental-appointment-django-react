
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, role }) => {
  
    const navigate = useNavigate();
    const {token, userType} = useAuth()

    useEffect(() => {
      if(!token && !userType){
        navigate('/login')
      } 
      if(token && userType && userType.length && userType !== role){
        navigate('/')
      }
    }, [token, userType, role])

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