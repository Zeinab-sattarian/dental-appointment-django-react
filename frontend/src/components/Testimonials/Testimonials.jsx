import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar_m from "../../assets/images/patient-avatar-m.png";
import { useQuery } from 'react-query';


const Testimonials = () => {
  const getReviews = useQuery(
    ['all-reviews'], 
    () => {
      return fetch(`http://127.0.0.1:8000/main/api/doctors/reviews/`, {
      }).then(response => response.json());
    },
    {
      enabled: true,
    }
  );

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {getReviews.data && getReviews.data.length ? getReviews.data?.map(review => (
          <SwiperSlide key={review.id}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img src={patientAvatar_m} alt="" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {review?.user?.name ? review?.user?.name : 'Patient'}
                  </h4>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {'"'+ review.text + '"'}
              </p>
            </div>
          </SwiperSlide>
        )) : null}
      </Swiper>
    </div>
  );
};

export default Testimonials;
