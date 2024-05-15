import { useQuery } from 'react-query';
import { useNavigate, useParams } from "react-router-dom";

const SidePanel = () => {
  const params = useParams()
  const navigate = useNavigate()

  const getDoctorTimes = useQuery(
    ['times'], 
    () => {
      return fetch(`http://127.0.0.1:8000/main/api/doctors/${params?.id}/times/available/`, {
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3 flex flex-col gap-5">
          {getDoctorTimes.data && getDoctorTimes.data.length ? getDoctorTimes.data?.map((time) => (
            <>
            <li key={time.id} className="flex items-center justify-between mb-2">
              <div className='flex flex-col'>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  Date: {time.dateTime ? time.dateTime?.split("T")[0] : null}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  Time: {time.hour}
                </p>
              </div>
              <button className="btn px-4 w-fit mt-0 rounded-md" onClick={() => navigate(`/appointment/create/${time.id}?time=${time.hour}&date=${time.dateTime ? time.dateTime?.split("T")[0] : null}`)}>Book</button>
            </li>
            <hr />
            </>
          )) : null}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
