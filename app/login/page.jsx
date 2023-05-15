"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../components/context/Context";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  if (user && user._id) return redirect("/");

  return (
    <div className="h-screen flex items-center justify-center text-black">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center justify-center bg-slate-300 py-5 px-7 rounded-md shadow-sm h-[350px] space-y-5"
      >
        <h1 className="text-2xl font-bold mb-7">Login Your Account</h1>
        <input
          className="outline-none p-3 rounded w-[270px]"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          className="outline-none p-3 rounded w-[270px]"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          className="bg-green-500 transition py-2 px-4 rounded font-semibold hover:bg-green-400"
          type="submit"
        >
          Login
        </button>
        <p>
          dont have an Account?{" "}
          <Link
            className="underline decoration-blue-800 text-blue-500"
            href={"/register"}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export const metadata = {
  title: "Login Page",
  description: "This is the Todo app and create by Taifur",
};

export default Page;
