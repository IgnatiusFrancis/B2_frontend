"use client";
import { useMemo, useState } from "react";
import PostContent from "./PostContent";
import NoContentAvailable from "./NoAvailableContent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import User from "./User";

function AllUsers({ users = [] }) {
  const dataPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / dataPerPage);

  const currentusers = useMemo(() => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    return users.slice(indexOfFirstData, indexOfLastData);
  }, [currentPage, users]);

  if (!users || users.length === 0) {
    return (
      <NoContentAvailable
        title="No users Found"
        message="It seems there are no users available at the moment. Please check back later."
      />
    );
  }

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-gray-100">
        {currentusers.map((user) => (
          <User
            key={user.id}
            id={user.id}
            userName={user.userName}
            email={user.email}
            url={user.url}
            role={user.role}
            bio={user.bio}
            createdAt={user.createdAt}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 p-4">
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default AllUsers;
