import DoctorCard from "./DoctorCard";
import { useQuery } from 'react-query';


const DoctorList = () => {
  const getDoctors = useQuery(
    ['doctors'], 
    () => {
      return fetch('http://127.0.0.1:8000/main/api/doctors/', {
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {getDoctors.data && getDoctors.data.length ? getDoctors?.data?.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={{...doctor, specialization: "Dentist"}} />
      )) : null}
    </div>
  );
};

export default DoctorList;
