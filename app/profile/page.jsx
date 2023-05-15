"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import { Context } from "../components/context/Context";

const Page = () => {
  const { user } = useContext(Context);
  if (!user._id) return redirect("/login");

  return (
    <div
      className="
  h-screen
  flex
  justify-center
  flex-col
  items-center
  w-full
  "
    >
      <h1 className="font-bold text-3xl">{user.name}</h1>

      <p className="font-semibold">{user.email}</p>
    </div>
  );
};

export default Page;
