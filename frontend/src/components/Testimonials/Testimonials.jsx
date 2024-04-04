import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar_m from "../../assets/images/patient-avatar-m.png";
import patientAvatar_f from "../../assets/images/patient-avatar-f.png";
import { HiStar } from "react-icons/hi";

const Testimonials = () => {
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
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar_f} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Sara Mohammadi
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "Finding a compassionate dentist who volunteers their time for a
              good cause has never been easier. The booking process was
              straightforward, and the care I received was exceptional. Highly
              recommend this service to anyone in need of dental care but cannot
              afford it"
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar_m} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Arad Haji Ali Afzali
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "The website’s interface is clean and user-friendly. I was able to
              book an appointment for my son without any hassle. The dentist we
              met was kind and patient with him, making the whole experience
              less daunting for a child."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar_f} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Roya Amini
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "As a volunteer dentist, the experience has been incredibly
              rewarding. The platform made it easy to manage my appointments and
              connect with patients. The feedback feature has been invaluable in
              improving the care I provide."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar_m} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Mehrad Shoajee
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "I’m truly impressed by the feedback system. It allowed me to
              express my gratitude for the amazing service provided by the
              volunteer dentist. This initiative is making a real difference in
              our community."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-3">
            <div className="flex items-center gap-[13px]">
              <img src={patientAvatar_f} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Afsane YazdiZadeh
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "The personal profile feature is a great addition. It’s very
              helpful to have all my appointment reports in one place. The
              website is also quite accessible, which I appreciate as a person
              with limited mobility."
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
