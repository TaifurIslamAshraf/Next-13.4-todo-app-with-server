"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const TodoBtn = ({ id, completed }) => {
  const router = useRouter();

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        className="w-5 h-5"
        type="checkbox"
        checked={completed}
        onChange={() => updateHandler(id)}
      />
      <button
        onClick={() => deleteHandler(id)}
        className="px-1 rounded-sm hover:bg-red-700 transition bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};
