import { useNavigate } from "react-router-dom"

const DoctorDashboard = () => {
  const navigate = useNavigate()

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[500px] mx-auto">
        <div className='grid grid-cols-3 gap-32'>
          <div onClick={() => navigate('/profile')} className='cursor-pointer w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center'>
            <span className="text-primaryColor">Profile</span>
          </div>
          <div onClick={() => navigate('/time/create')} className='w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center cursor-pointer'>
            <span className="text-primaryColor">Create Time</span>
          </div>
          <div onClick={() => navigate('/time/booked')} className='w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center cursor-pointer'>
            <span className="text-primaryColor">Booked Times</span>
          </div>
          <div onClick={() => navigate('/time/available')} className='w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center cursor-pointer'>
            <span className="text-primaryColor">Available Times</span>
          </div>
          <div onClick={() => navigate('/time/all')} className='w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center cursor-pointer'>
            <span className="text-primaryColor">All Times</span>
          </div>
          <div onClick={() => navigate('/review/all')} className='w-40 h-36 rounded-xl border-4 border-primaryColor flex justify-center items-center cursor-pointer'>
            <span className="text-primaryColor">All Reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorDashboard
