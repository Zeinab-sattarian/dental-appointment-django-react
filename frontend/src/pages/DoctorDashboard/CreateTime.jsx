import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useAuth } from "../../context/AuthProvider";


const CreateTime = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    hour: "",
    dateTime: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutateTime = useMutation(
    ['create-time'],
    (newTime) => {
      return fetch('http://127.0.0.1:8000/main/api/times/create/', {
        method: 'POST',
        body: JSON.stringify(newTime),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => response.json())
    }
  )

  const submitHandler = async event =>{
    event.preventDefault()
    try {
      await mutateTime.mutateAsync(formData)
      navigate('/time/all')
    } catch(e){
      console.log(e.message)
    }
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-1">
          {/* ============sign up form ============ */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create a <span className="text-primaryColor">Time</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="date"
                  name="dateTime"
                  value={formData.dateTime}
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
                  placeholder="Enter the Hour Range"
                  name="hour"
                  value={formData.hour}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid 
              border-[#4CCD99] focus:outline-none 
              focus:border-b-primaryColor text-[16px] 
              leading-7 text-headingColor 
              placeholder:text-textColor  cursor-pointer "
                  required
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className={`w-full ${mutateTime.isLoading ? 'bg-gray-500' : 'bg-primaryColor'} text-white text-[18px] leading-[30px] rounded-lg px-4 py-3`}
                >
                  Create Time
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateTime
