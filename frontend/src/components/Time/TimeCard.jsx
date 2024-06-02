import { useState } from "react";
import { useMutation } from 'react-query';
import { useAuth } from "../../context/AuthProvider";


const TimeCard = ({ time, refetch }) => {
  const { token, userType } = useAuth()

  const [formData] = useState({
    time_id: time.id,
  });

  const mutateTime = useMutation(
    ['approve-time'],
    (ApproveTime) => {
      return fetch(`http://127.0.0.1:8000/main/api/times/approve/`, {
        method: 'PATCH',
        body: JSON.stringify(ApproveTime),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => response.json())
    }
  )

  const handleApprove = async () => {
    try {
      await mutateTime.mutateAsync(formData)
      await refetch()
    } catch(e){
      console.log(e.message)
    }
  }

  return (
    <div className='rounded-lg border border-gray-500 border-solid py-5 px-5 flex justify-between items-center'>
      <h1 className='text-lg font-bold'>{time?.dateTime?.split('T')[0]}</h1>
      <h1 className='text-lg font-bold'>{time?.hour}</h1>
      {time?.phone_number && <h1 className='text-lg font-bold'>{time?.phone_number}</h1>}
      <h1 className={`${time?.available ? 'text-primaryColor' : 'text-blue-500'} text-lg font-bold`}>{time?.available ? 'Available' : 'Booked'}</h1>
      {!time?.approved && !time?.available ? <h1 className='text-orange-500 text-lg font-bold'>{'Pending'}</h1> : null}
      {time?.approved && !time?.available ? <h1 className='text-primaryColor text-lg font-bold'>{'Approved'}</h1> : null}

      {token && userType === 'doctor' && (!time?.approved && !time?.available) ? <h1 onClick={handleApprove} className='text-lg font-bold text-blue-500 underline cursor-pointer'>Approve</h1> : null}
    </div>
  )
}

export default TimeCard
