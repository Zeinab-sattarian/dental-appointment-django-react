import { useState } from "react";
import { useMutation } from 'react-query';
import { useParams } from "react-router-dom";


const FeedbackForm = ({ refetch }) => {
  const params = useParams()
  const [reviewText, setReviewText] = useState("");

  const mutateReview = useMutation(
    ['reviews'],
    (newReview) => {
      return fetch('http://127.0.0.1:8000/main/api/reviews/create/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newReview),
      }).then((response) => response.json())
    }
  )

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if(reviewText && reviewText !== ""){
      try {
        await mutateReview.mutateAsync({ text: reviewText, doctor_id: Number(params.id)})
        refetch()
      } catch(e){
        console.log(e.message)
      } 
    }
  };

  return (
    <form action="" onSubmit={handleSubmitReview()}>
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share Your Feedback or Suggestions?*
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md "
          rows="5"
          placeholder="write your message"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" onClick={handleSubmitReview} className="btn">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
