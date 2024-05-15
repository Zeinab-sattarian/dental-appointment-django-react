import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
          {/*=========== About img ===========*/}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} className="object-cover rounded-2xl" alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/*=========== About Content ===========*/}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to Have Come So Far</h2>
            <p className="text__para">
              The profound impact of providing accessible dental care to
              children cannot be overstated. For many kids, especially those
              from underserved communities, the opportunity to visit a dentist
              is not just about treating a toothache; it’s about preventing
              long-term oral health issues, instilling confidence, and promoting
              overall well-being. By facilitating free dental services, we’ve
              been able to remove the barriers to quality care, ensuring that
              children can grow up with healthy smiles. This initiative has not
              only eased the immediate discomfort that comes with dental
              problems but has also contributed to the brighter futures of
              countless young individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
