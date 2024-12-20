"use server";
const url = process.env.BACKEND_URL;
import { revalidateTag } from "next/cache";

export const deleteTodo = async (id: number | string) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error");
  }
  revalidateTag("todo-data");

  const data = await res.json();

  return data;
};

export const postTodo = async (data: any) => {
  const res = await fetch(`${url}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error");
  }
  revalidateTag("todo-data");
  const Postdata = await res.json();
  return Postdata;
};

export const editTodo = async ({
  id,
  data,
}: {
  id: string | number;
  data: { title: string; description: string };
}) => {
  const res = await fetch(`${url}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating data");
  }
  revalidateTag("todo-data");

  const updatedData = await res.json();
  return updatedData;
};
