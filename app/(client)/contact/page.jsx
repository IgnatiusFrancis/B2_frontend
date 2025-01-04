"use client";

import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import SectionHeader from "@/components/SectionHeader";
import { useContext, useState } from "react";
import { FaEnvelope, FaMap, FaPhone } from "react-icons/fa";

function Contact() {
  const [uploadingPost, setuploadingPost] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const onSubmitContact = async (e) => {
    e.preventDefault();
    try {
      setuploadingPost(true);
      const formData = new FormData();
      formData.append("firstName", contactData.name);
      formData.append("message", contactData.message);
      formData.append("email", contactData.email);
      formData.append("phoneNumber", contactData.number);
      console.log("Submitting with data:", contactData);
      const postresponse = await axios.post(
        "https://b2xclusive.onrender.com/api/v1/contactUs/message",
        formData,
      );

      console.log(postresponse.data);
      toast.success(postresponse.data.message, {
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to upload post", error.message);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.errorResponse?.message,
        {
          position: "top-center",
        },
      );
    } finally {
      setuploadingPost(false); // Reset uploadingPost state
    }
  };
  return (
    <>
      <section>
        <SectionHeader
          title={"Contact us"}
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quide cum repudiandae praesentium. Molestias, voluptatum eaque debitis culpa exercitationem rerum"
          }
        />

        <section className="w-full p-2 md:w-5/6 md:mx-auto">
          <div className="w-full h-[700px] p-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126844.06348606381!2d3.3488896!3d6.537216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1710857933472!5m2!1sen!2sng"
              width="1000"
              height="1000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            ></iframe>
          </div>

          <div className="md:flex md:gap-4 ">
            <div className="w-full md:w-2/4">
              <h1 className={` font-bold text-4xl`}>Get In Touch</h1>
              <form className="p-4" onSubmit={onSubmitContact}>
                <div className=" md:flex w-full gap-4 my-2">
                  <input
                    value={contactData.name}
                    onChange={(e) =>
                      setContactData({ ...contactData, name: e.target.value })
                    }
                    type="text"
                    className={`my-2 md:my-0 p-4  w-full`}
                    placeholder="name"
                  />
                  <input
                    type="phone"
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactData({ ...contactData, number: e.target.value })
                    }
                    className={`my-2 md:my-0 p-4  w-full`}
                    placeholder="phonenumber"
                  />
                </div>
                <div className="md:flex w-full gap-4 my-2">
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                    className={`my-2 md:my-0 p-4  w-full`}
                    placeholder="Email Address"
                  />
                </div>

                <textarea
                  name=""
                  id=""
                  value={contactData.message}
                  onChange={(e) =>
                    setContactData({ ...contactData, message: e.target.value })
                  }
                  cols="30"
                  rows="10"
                  className={`  w-full h-[300px] my-2 p-4 bg-white`}
                  placeholder="Type your comments"
                ></textarea>

                <button
                  type="submit" // Use handlePost instead of handleingPost
                  className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
                >
                  {uploadingPost ? (
                    <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            <div className={` flex flex-col gap-4 w-full md:w-2/4`}>
              <h1 className={`  font-bold text-4xl`}>Contact Us</h1>
              <p className={``}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sagittis lacinia tellus. Nullam venenatis a sem non dictum.
                Aliquam orci ipsum, malesuada lacinia faucibus nec, bibendum a
                enim...
              </p>

              <div className={`flex gap-2 items-center `}>
                <FaPhone className={``} />
                <p className={``}>+234 123 456 7890</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaEnvelope className={``} />
                <p className={``}>example@b2exclusive.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaMap className={``} />
                <p className={``}>90, Downtown St, USA</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Contact;
