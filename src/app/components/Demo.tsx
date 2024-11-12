"use client";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, fetchTodos } from "../api";
import { useState } from "react";

function Demo() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(search),
    queryKey: ["todos", { search }],
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <input
          className="text-black px-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-gray-100 rounded-lg text-orange-500 font-bold px-2 mx-2"
          onClick={async () => {
            try {
              await addTodoMutation({ title });
              setTitle("");
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Add Todo
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {todos?.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
      )}
      <input
        placeholder="SearchBox"
        className="text-black px-2"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Demo;
