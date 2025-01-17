"use client";
import Image from "next/image";
import pld from "@/public/pld.jpeg";

function User({ id, userName, email, url, role, bio, createdAt }) {
  const imageUrl = url ? url : pld;

  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors">
      <div className="col-span-6 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={imageUrl} alt={userName} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium truncate">{userName}</h3>
          <p className="text-xs text-gray-500 truncate">
            {bio?.split(" ").slice(0, 6).join(" ")}
          </p>
        </div>
      </div>

      <div className="col-span-1 flex justify-center">
        <span className="text-sm text-gray-600">{email}</span>
      </div>

      <div className="col-span-2 flex justify-center items-center gap-2">
        <span className="text-sm text-gray-600">{role}</span>
      </div>

      <div className="col-span-2 text-center">
        <span className="text-sm text-gray-600">
          {new Date(createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default User;
