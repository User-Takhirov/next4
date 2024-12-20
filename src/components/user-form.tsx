"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { postTodo } from "@/service/mutation/todo-mutation";

export const UserForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const submit = async (data: any) => {
    try {
      const res = await postTodo(data);
      console.log(res);
      reset();
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <form className="w-[400px] border mx-auto" onSubmit={handleSubmit(submit)}>
      <div className="mt-[10px]">
        <input
          className="p-[20px] w-[100%] bg-green-300 text-black placeholder:text-white rounded"
          type="text"
          placeholder="Title"
          {...register("title")}
        />
      </div>
      <div className="mt-[10px]">
        <input
          className="p-[20px] w-[100%] bg-red-300 text-black placeholder:text-white rounded"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
      </div>
      <div className="text-right mt-[10px]">
        <button className="bg-green-500 p-[10px] rounded" type="submit">
          Send
        </button>
      </div>
    </form>
  );
};
