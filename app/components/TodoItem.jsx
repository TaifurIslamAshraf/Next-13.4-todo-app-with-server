import { TodoBtn } from "./Client";

const TodoItem = ({ title, desc, id, completed }) => {
  return (
    <div className="w-[500px] bg-gray-700 flex justify-between items-center m-auto p-2 rounded-sm">
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{desc}</p>
      </div>
      <TodoBtn id={id} completed={completed} />
    </div>
  );
};

export default TodoItem;
