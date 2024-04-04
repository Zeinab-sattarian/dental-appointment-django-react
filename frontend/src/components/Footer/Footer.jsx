import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AiOutlineInstagram, AiFillLinkedin } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.instagram.com/dr.nazariani?igsh=MXhxa3B4NnNqcHc0MQ==",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/in/nazariani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: <AiFillLinkedin className="group-hover:text-white w-4 h-5" />,
  },
];
const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];
const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  
];
const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/find-a-doctor",
    display: "Contact Us",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400] text-textColor">
              {year} developed by Zeinab Sattarian
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  kry={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] ">Quick Links </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] ">I want to </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-[20px] leading-[30px] ">Support</h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li className="mb-4">
                  <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor">{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
