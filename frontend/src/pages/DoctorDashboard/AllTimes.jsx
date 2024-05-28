import { useQuery } from 'react-query';
import { useAuth } from "../../context/AuthProvider";
import TimeCard from '../../components/Time/TimeCard';


const AllTimes = () => {
  const { token } = useAuth()

  const getTimes = useQuery(
    ['times'], 
    () => {
      return fetch('http://127.0.0.1:8000/main/api/doctors/times/all/', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );


  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="rounded-l-lg lg:pl-16 py-10 flex flex-col gap-5">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-5">
              All <span className="text-primaryColor">Times</span>
            </h3>
            {
              getTimes?.data && getTimes?.data?.length ? getTimes?.data?.map(time => (
                <TimeCard key={time?.id} time={time} />
              )) : null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllTimes
