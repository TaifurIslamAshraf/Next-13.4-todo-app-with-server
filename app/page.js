import { Suspense } from "react";
import Loader from "./components/Loader";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";

export default async function Home() {
  return (
    <div className="mt-24 space-y-4 mb-5">
      <TodoForm />
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </div>
  );
}
