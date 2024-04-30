import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useAuth } from "../context/AuthProvider";


const Login = () => {
  const navigate = useNavigate()
  const { setIsLogedin, setUser } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutateLogin = useMutation(
    ['posts'],
    (loginUser) => {
      return fetch('http://127.0.0.1:8000/main/api/login/', {
        method: 'POST',
        body: JSON.stringify(loginUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    }
  )

  const submitHandler = async event =>{
    event.preventDefault()
    try {
      const res = await mutateLogin.mutateAsync(formData)
      localStorage.setItem('user', JSON.stringify(res?.user));
      setIsLogedin(true)
      setUser(res?.user)
      navigate('/')
    } catch(e){
      console.log(e.message)
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome </span>Back
        </h3>

        <form onSubmit={submitHandler} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter Your username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid 
              border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor cursor-pointer "
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid 
              border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor  cursor-pointer "
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className={`w-full ${mutateLogin.isLoading ? 'bg-gray-500' : 'bg-primaryColor'} text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}
            >
              Login
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t Have an Account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
