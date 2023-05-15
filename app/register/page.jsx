"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../components/context/Context";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (user && user._id) return redirect("/");

  return (
    <div className="h-screen flex items-center justify-center text-black">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center bg-slate-300 py-5 px-7 rounded-md shadow-sm h-[400px] space-y-5"
      >
        <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>
        <input
          className="outline-none p-3 rounded w-[270px]"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="outline-none p-3 rounded w-[270px]"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="outline-none p-3 rounded w-[270px]"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="bg-green-500 transition py-2 px-4 rounded font-semibold hover:bg-green-400"
          type="submit"
        >
          Sign Up
        </button>
        <p>
          Alredy have an Account?{" "}
          <Link
            className="underline decoration-blue-800 text-blue-500"
            href={"/login"}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
