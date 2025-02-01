"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CreatePostLinks({ href, title }) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={href}
        className={`${
          pathname === href ? "   border-primarycolor border-b-4" : ""
        } hover:bg-gray-50 p-2 text-center text-base`}
      >
        {title}
      </Link>
    </>
  );
}

export default CreatePostLinks;
