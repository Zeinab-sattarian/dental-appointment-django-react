import { useContext, createContext, useState, useEffect } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const localUser = localStorage.getItem('user');
  const [isLogedin, setIsLogedin] = useState(localUser && JSON.parse(localUser)?.userId ? true : false);
  const [user, setUser] = useState(JSON.parse(localUser));

  useEffect(() => {
    if(localUser && JSON.parse(localUser)?.userId){
      setUser(JSON.parse(localUser))
      setIsLogedin(true)
    }
  }, [localUser])


  return (
    <AuthContext.Provider value={{ isLogedin, setIsLogedin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};