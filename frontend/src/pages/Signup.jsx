import { useEffect, useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useAuth } from "../context/AuthProvider";


const Signup = () => {
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    user_type: "regular",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutateUser = useMutation(
    ['posts'],
    (newUser) => {
      return fetch('http://127.0.0.1:8000/main/api/signup/', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    }
  )

  const submitHandler = async event =>{
    event.preventDefault()
    try {
      await mutateUser.mutateAsync(formData)
      navigate('/login')
    } catch(e){
      console.log(e.message)
    }
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ===========img box =============== */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>


          {/* ============sign up form ============ */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid 
              border-[#4CCD99] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor  cursor-pointer "
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your user name"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid 
              border-[#4CCD99] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor  cursor-pointer "
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
                  className="w-full pr-4 py-3 border-b border-solid 
              border-[#4CCD99] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor  cursor-pointer "
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are You a:
                  <select
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] 
                    leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="regular">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className={`w-full ${mutateUser.isLoading ? 'bg-gray-500' : 'bg-primaryColor'} text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already Have an Account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
