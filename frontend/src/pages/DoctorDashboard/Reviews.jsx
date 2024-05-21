import { useQuery } from 'react-query';
import { useAuth } from "../../context/AuthProvider";
import { formatDate } from "../../utils/formatDate";
import avatar from "../../assets/images/patient-avatar-m.png";




const Reviews = () => {
  const { token } = useAuth()

  const getReviews = useQuery(
    ['reviews'], 
    () => {
      return fetch(`http://127.0.0.1:8000/main/api/doctors/dashboard/reviews/`, {
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
            Your <span className="text-primaryColor">Reviews</span>
            </h3>
              {getReviews.data && getReviews.data.length ? getReviews.data?.map(review => (
                <div key={review.id} className="flex gap-3">
                  <figure className="w-10 h-10 rounded-full">
                    <img className="w-full rounded-full object-cover" src={avatar} alt="" />
                  </figure>
                  <div>
                    <p className="text-[14px] leading-6 text-textColor">
                      {formatDate(review?.created_at)}
                    </p>
                    <p className="text__para mt-3 font-medium text-[15px]">
                      {review?.text}
                    </p>
                  </div>
                </div>
              )) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
