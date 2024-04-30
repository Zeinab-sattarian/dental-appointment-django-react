
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, role }) => {
  
    const navigate = useNavigate();
    const {isLogedin, user} = useAuth()

    useEffect(() => {
      if(!isLogedin){
        navigate('/login')
      }
    }, [isLogedin])

    useEffect(() => {
      if(user?.user_type !== role){
        navigate('/')
      }
    }, [user])

    return (
        <React.Fragment>
            {
                // eslint-disable-next-line react/prop-types
                isLogedin ? children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;