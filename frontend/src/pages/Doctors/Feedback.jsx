import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import avatar from "../../assets/images/patient-avatar-m.png";
import FeedbackForm from "./FeedbackForm";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const params = useParams()

  const getReviews = useQuery(
    ['reviews'], 
    () => {
      return fetch(`http://127.0.0.1:8000/main/api/doctors/${params.id}/reviews/`, {
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] mb-[30px]">All reviews {getReviews.data && getReviews.data.length ? `(${getReviews.data.length})` : '(0)'}</h4>
        <div className="flex flex-col gap-10 mb-[30px]">
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

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm refetch={getReviews.refetch} />}
    </div>
  );
};

export default Feedback;
