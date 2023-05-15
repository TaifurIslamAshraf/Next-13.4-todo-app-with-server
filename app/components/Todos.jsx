import { cookies } from "next/headers";
import TodoItem from "./TodoItem";

const fetchTodo = async (token) => {
  const res = await fetch(`${process.env.baseUrl}/api/mytask`, {
    cache: "no-cache",
    headers: {
      cookie: `token=${token}`,
    },
  });
  const data = await res.json();
  if (!data.success) return [];

  return data.myTasks;
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);

  return (
    <div className="space-y-4">
      {tasks?.map((item) => {
        return (
          <TodoItem
            key={item._id}
            title={item.title}
            desc={item.desc}
            id={item._id}
            completed={item.isCompleted}
          />
        );
      })}
    </div>
  );
};

export default Todos;
