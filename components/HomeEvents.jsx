"use client";
import { usePostData } from "@/hooks/usePostData";
import Event from "./Event";
import CategoriesHeading from "./CategoriesHeading";
import Link from "next/link"; // Ensure Link is imported

function HomeEvents() {
  const url = "https://b2xclusive.onrender.com/api/v1/event/events";
  const { isLoading, isError, data } = usePostData("homeevents", url);
  if (isError)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full py-4">
        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
    );

  return (
    <>
      <div>
        <CategoriesHeading title="Upcoming Events" />
        <div className="w-full flex justify-center flex-col">
          <div className="flex w-full flex-col gap-4 my-4">
            {data?.data?.data?.slice(0, 3).map((event) => (
              <Event key={event.id} {...event} /> // Ensure event.id is unique
            ))}
          </div>
          <Link
            href="/upcomingevents"
            className="text-primarycolor font-bold text-center cursor-pointer"
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomeEvents;
