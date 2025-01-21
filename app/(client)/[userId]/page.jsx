"use client";
import axios from "axios";
import Button from "@/components/Button";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import pld from "@/public/pld.jpeg";

function SingleUser({ params }) {
  const [userData, setUserData] = useState(null);
  const userId = params.userId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let token = localStorage.getItem("b2exclusiveuser");

        if (!token) {
          console.error("Bearer token not found");
          return;
        }
        token = token.replace(/^['"](.*)['"]$/, "$1");
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/users/singleUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the retrieved user data into state
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <>
      {/* Render section based on user data */}
      {userData && (
        <section className="w-full">
          {/* Profile details section */}
          <div className="bg-gradient-to-tr from-primarycolor to-orange-600 p-8 md:p-20 flex flex-col items-center relative">
            <div className="w-full md:w-3/6 mx-auto absolute flex justify-between p-2 items-center m:left-10 -bottom-24 md:right-10">
              <div className="flex md:flex-col items-center gap-4">
                <div className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] border-white rounded-full border-4">
                  <Image
                    src={userData?.image || pld}
                    width={1000}
                    height={1000}
                    alt="alb"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className={` font-bold text-md md:text-2xl`}>
                    Profile Details
                  </h1>
                  <p className={`md:text-base text-xs`}>
                    Update your photo and personal details
                  </p>
                </div>
              </div>
              <div>
                <Button title={"Save"} />
              </div>
            </div>
          </div>

          {/* Form section to edit user details */}
          <section className="w-full md:w-3/6 mx-auto p-4 mt-28">
            <form action="">
              {/* Username field */}
              <div className="flex py-4 border-b-gray-200 border-b ">
                <label htmlFor="" className="md:text-base text-sm w-2/6">
                  Username
                </label>
                <div className="flex w-4/6 ">
                  <input
                    type="text"
                    className="p-2 bg-transparent border rounded-lg w-full"
                    placeholder={userData?.userName}
                  />
                </div>
              </div>
              {/* Email field */}
              <div className="flex py-4 border-b-gray-200 border-b ">
                <label htmlFor="" className="md:text-base text-sm w-2/6">
                  Email
                </label>
                <div className="flex w-4/6 ">
                  <input
                    type="text"
                    className="p-2 bg-transparent border rounded-lg w-full"
                    placeholder={userData?.email}
                  />
                </div>
              </div>

              {/* Your Photo section */}
              <div className="flex py-4 border-b-gray-200 border-b ">
                <label htmlFor="" className="md:text-base text-sm w-2/6">
                  Photo
                </label>
                <div className="flex w-4/6 justify-between ">
                  <div className="w-[60px] h-[60px] rounded-full">
                    <Image
                      src="/alb.jpeg"
                      width={1000}
                      height={1000}
                      alt="alb"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="md:flex items-center">
                    <input type="file" className="mb-2" />
                    <button className="border p-2 rounded-lg">Delete</button>
                    <Button title={"Update"} />
                  </div>
                </div>
              </div>

              {/* Bio textarea */}
              <div className="flex py-4 border-b-gray-200 border-b ">
                <label htmlFor="" className="md:text-base text-sm w-2/6">
                  Bio
                </label>
                <div className="flex w-4/6 ">
                  <textarea
                    name=""
                    id=""
                    placeholder="Write a short bio here"
                    className="p-2 bg-transparent border rounded-lg w-full h-[200px]"
                  ></textarea>
                </div>
              </div>
            </form>
          </section>
        </section>
      )}
    </>
  );
}

export default SingleUser;
