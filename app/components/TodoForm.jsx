"use client";

import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

import { Context } from "./context/Context";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const { user } = useContext(Context);

  const handleTodos = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
        }),
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDesc("");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <div>
      <form
        onSubmit={handleTodos}
        className="flex flex-col items-center  space-y-5 bg-gray-800 py-7 rounded px-4 w-[500px] m-auto"
      >
        <h1 className="text-2xl font-bold mb-2">Add Your Todos</h1>
        <input
          className="outline-none p-3 rounded w-[400px] text-black"
          type="text"
          name="title"
          placeholder="Todo Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="outline-none p-3 rounded w-[400px] text-black"
          type="text"
          name="desc"
          placeholder="Todo Description"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className="bg-green-500 transition py-2 px-4 rounded font-semibold hover:bg-green-400 w-[400px]"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
