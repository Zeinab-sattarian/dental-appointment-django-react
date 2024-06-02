import DoctorCard from "./../../components/Doctors/DoctorCard";
import { useQuery } from 'react-query';
import Testimonials from "../../components/Testimonials/Testimonials";
import { useAuth } from "../../context/AuthProvider";

const Doctors = () => {
  const { token } = useAuth()

  const getDoctors = useQuery(
    ['doctors'], 
    () => {
      return fetch('http://127.0.0.1:8000/main/api/doctors/', {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : undefined,
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {getDoctors.data && getDoctors.data.length ? getDoctors?.data?.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={{...doctor, specialization: "Dentist"}} />
            )) : null}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Our Patients Experience With Us
            </h2>
            <p className="text__para text-center">
              World class free of charge care for underpriviledged children
            </p>
          </div>
          <Testimonials />
        </div>
      </section>
      
    </>
  );
};

export default Doctors;
