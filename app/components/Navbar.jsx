"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Context } from "./context/Context";

const Navbar = () => {
  const activeSegment = useSelectedLayoutSegment();
  const { user, setUser } = useContext(Context);

  const linkData = [
    {
      lable: "Home",
      path: "/",
      targetSegment: null,
    },
    {
      lable: "Profile",
      path: "/profile",
      targetSegment: "profile",
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("api/auth/logout");
      const data = await res.json();
      console.log(data);
      if (!data.success) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-700 text-white flex justify-between fixed w-[60%] left-0 right-0 m-auto top-5 px-10 py-4 rounded shadow-md">
      <h1 className="">Todo</h1>
      <div className="space-x-10">
        {linkData.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.path}
              className={`${
                activeSegment === link.targetSegment ? "underline" : ""
              }`}
            >
              {link.lable}
            </Link>
          );
        })}
        {user && user._id ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
