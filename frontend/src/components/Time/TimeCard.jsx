
const TimeCard = ({ time }) => {
  return (
    <div className='rounded-lg border border-gray-500 border-solid py-5 px-5 flex justify-between items-center'>
      <h1 className='text-lg font-bold'>{time?.dateTime?.split('T')[0]}</h1>
      <h1 className='text-lg font-bold'>{time?.hour}</h1>
      {time?.phone_number && <h1 className='text-lg font-bold'>{time?.phone_number}</h1>}
      <h1 className={`${time?.available ? 'text-primaryColor' : 'text-blue-500'} text-lg font-bold`}>{time?.available ? 'Available' : 'Booked'}</h1>
      <button className='text-white bg-red-500 rounded-lg px-4 py-2 border border-white'>Delete</button>
    </div>
  )
}

export default TimeCard
