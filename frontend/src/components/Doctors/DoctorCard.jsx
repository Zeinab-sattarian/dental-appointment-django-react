import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import doctorImg from "../../assets/images/dentist-avatar.png";


const DoctorCard = ({ doctor }) => {
  const {
    id,
    user,
    major,
    specialization,
  } = doctor;

  return (
    <div className="p-3 lg:p-5 w-full">
      <div>
        <img src={doctorImg} className="w-full" alt="" />
      </div>

      <h2
        className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 
      text-headingColor font-[700] mt-3 lg:mt-5"
      >
        {user.name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span
          className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 l:py-2 lg:px-6 text-[12px] leading-4 
        lg:text-[16px] lg:leading-7 font-semibold rounded"
        >
          {specialization}
        </span>

        <span
          className="bg-[#ccccf3] text-white py-1 px-2 l:py-2 lg:px-6 text-[12px] leading-4 
        lg:text-[16px] lg:leading-7 font-semibold rounded"
        >
          {user.city}
        </span>
      </div>

      <div className="mt-[18px] w-full h-fit lg:mt-5 flex items-center justify-between">
        <h1 className="font-bold text-lg">{major}</h1>
        <Link to={`/doctors/${user?.id}`}>
          <div className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center hover:bg-primaryColor hover:border-none ">
            <BsArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
