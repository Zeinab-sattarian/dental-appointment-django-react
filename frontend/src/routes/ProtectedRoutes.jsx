
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
      }else if(token && userType && userType !== role){
        navigate('/')
      }else{
        navigate('/login')
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