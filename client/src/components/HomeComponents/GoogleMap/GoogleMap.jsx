import Container from "../../ui/Container";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const GoogleMap = () => {
  return (
    <div className="mb-56 sm:mb-60 md:mb-72 lg:mb-96">
      <Container>
        <div className="lg:flex relative">
          {/* first part */}
          <div className="lg:w-3/5 md:p-10">
            <div className="font-serif uppercase font-medium mb-4 md:mb-8 text-center md:text-start">
              <p className="text-xs md:text-sm text-primary mb-1 md:mb-2">
                visit the property
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl">
                Request a visit
              </h2>
            </div>

            <div className="lg:flex gap-8 ">
              <div className="md:flex items-center gap-5">
                <div className="flex justify-center md:justify-start">
                  <img
                    src="https://i.ibb.co.com/zfsQf7P/Kevin-Smith.png"
                    alt="image"
                    className="border-2 border-primary p-1.5 rounded-full  object-cover"
                  />
                </div>
                <div className="text-center md:text-start">
                  <h4 className="text-2xl md:text-3xl font-thin italic">
                    Kevin Smith
                  </h4>
                  <p className="text-xs font-serif uppercase mt-1 md:ml-8">
                    Certified agent
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 mt-1.5 md:mt-3 text-center md:text-start">
                <p className="text-[#6E7070] text-base leading-7 md:text-lg md:leading-9">
                  Contact Kevin Smith, Certified Agent, to schedule your
                  property visit and explore available options.
                </p>
              </div>
            </div>

            <div className="flex items-center mt-5">
              <div className="md:flex items-center gap-3 w-full">
                <div className="flex justify-center md:justify-start mb-2 md:mb-0">
                  <p className="bg-primary/10 p-4 md:p-5">
                    <FaPhoneAlt className="text-primary" />
                  </p>
                </div>
                <div className="font-medium text-center md:text-start">
                  <p className="mb-0.5 text-[#6E7070] text-xs sm:text-sm md:text-base">
                    Have any question?
                  </p>
                  <h5 className="text-xs sm:text-sm md:text-lg">
                    Free +72 (8800) - 8870
                  </h5>
                </div>
              </div>
              <div className="md:flex items-center gap-3 w-full">
                <div className="flex justify-center md:justify-start mb-2 md:mb-0">
                  <p className="bg-primary/10 p-4 md:p-5">
                    <MdEmail className="text-primary" />
                  </p>
                </div>
                <div className="font-medium text-center md:text-start">
                  <p className="mb-0.5 text-[#6E7070] text-xs sm:text-sm md:text-base">
                    Write email
                  </p>
                  <h5 className="text-xs sm:text-sm md:text-lg">
                    needhelp@company.com
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* second part */}
          <div className="lg:w-2/5 bg-[url(https://pixydrops.com/alipes/main-html/assets/images/backgrounds/contact-form-bg-img-1.jpg)] mt-5 md:mt-0">
            <div className="w-full mx-auto overflow-hidden bg-primary bg-opacity-80 h-full">
              <div className="p-10 sm:p-12 md:p-14 lg:p-16">
                <div className="uppercase text-white mb-8 font-mono">
                  <p className=" text-sm font-medium mb-1">contact with me</p>
                  <h3 className="text-3xl font-bold">write to agent</h3>
                </div>

                <form>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2.5 mt-2 text-white placeholder:text-white outline-none border border-white bg-primary bg-opacity-60"
                      type="name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2.5 mt-2 text-white placeholder:text-white outline-none border border-white bg-primary bg-opacity-70"
                      type="email"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <input
                      className="block w-full px-4 py-2.5 mt-2 text-white placeholder:text-white outline-none border border-white bg-primary bg-opacity-70"
                      type="number"
                      placeholder="Your Number"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <textarea
                      className="block w-full px-4 py-2.5 mt-2 text-white placeholder:text-white outline-none border border-white bg-primary bg-opacity-70"
                      name="message"
                      placeholder="Write a Message"
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      disabled
                      className="px-10 py-3 text-sm font-medium text-white bg-primary rounded-lg"
                    >
                      Send a Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* map */}
      <div className="bg-slate-600/30 w-full absolute -mt-48 -z-50 grayscale ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.757286497821!2d-90.08680172509972!3d29.928888924037736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a5cd594cf40b%3A0x6bb2c38c427551bf!2s1403%20Washington%20Ave%2C%20New%20Orleans%2C%20LA%2070115%2C%20USA!5e0!3m2!1sen!2sbd!4v1725978534923!5m2!1sen!2sbd"
          width="100%"
          // height="500"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-96 md:h-[450px] lg:h-[500px]"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
