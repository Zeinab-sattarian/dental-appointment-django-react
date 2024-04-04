import React from "react";
import { formatDate } from "../../utils/formatDate";

const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            Ahmad Ahmadi
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sem
          integer vitae justo eget magna fermentum iaculis. Diam vulputate ut
          pharetra sit. Eget nullam non nisi est sit amet facilisis magna. Leo a
          diam sollicitudin tempor id eu nisl nunc. Imperdiet proin fermentum
          leo vel orci porta. Vel pharetra vel turpis nunc eget. Fringilla ut
          morbi tincidunt augue interdum velit. Volutpat sed cras ornare arcu
          dui vivamus. Dictum at tempor commodo ullamcorper a lacus. Quam
          elementum pulvinar etiam non quam lacus suspendisse faucibus interdum.
          Sit amet facilisis magna etiam.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formatDate("12-04-2010")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                Dental Surgeon
              </p>
            </div>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              insert city or clinic
            </p>
          </li>
          
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formatDate("07-04-2010")} - {formatDate("08-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              insert clinic and city
            </p>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
