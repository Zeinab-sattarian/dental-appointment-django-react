import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const tokenLocal = localStorage.getItem('token');
  const userTypeLocal = localStorage.getItem('userType');

  const [token, setToken] = useState(tokenLocal);
  const [userType, setUserType] = useState(userTypeLocal);

  useEffect(() => {
    if(tokenLocal && userTypeLocal){
      setUserType(userTypeLocal)
      setToken(tokenLocal)
    }
  }, [tokenLocal, userTypeLocal])


  return (
    <AuthContext.Provider value={{ token, setToken, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};