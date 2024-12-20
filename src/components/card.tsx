// "use client";
// import React from "react";
// import { deleteTodo, editTodo } from "@/service/mutation/todo-mutation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { EditDataReducer } from "@/store/reducers/reducer";

// export const Card = ({
//   title,
//   description,
//   id,
// }: {
//   title: string;
//   description: string;
//   id: number;
// }) => {
//   const [isloading, setLoading] = React.useTransition();
//   console.log(isloading);
//   const dispatch = useDispatch();
//   const { description: DES, title: TITLE } = useSelector(
//     (state: RootState) => state.myreducer
//   );
//   const deleteData = () => {
//     setLoading(async () => {
//       try {
//         const res = await deleteTodo(id);
//         console.log(res);
//       } catch (error) {}
//     });
//   };

//   const EditData = () => {
//     const { title, description } = useSelector(
//       (state: RootState) => state.myreducer
//     );
//     const EditTitle = prompt("Enter Title", title);
//     const EditDes = prompt("Enter Description", description);
//     if (EditTitle && EditDes && id) {
//       dispatch(EditDataReducer({ title: EditTitle, description: EditDes }));
//       editTodo({ id, data: { title: EditTitle, description: EditDes } })
//         .then((updatedData) => {
//           console.log("Data updated:", updatedData);
//         })
//         .catch((error) => {
//           console.error("Error updating data:", error);
//         });
//     }
//   };
//   return (
//     <div className=" border border-[7px solid  black] my-[10px] p-[20px] rounded">
//       <h1 className="text-4xl text-blue-400">{title}</h1>
//       <p className="mb-[10px]">{description}</p>
//       <div className="flex gap-[10px]">
//         <button
//           disabled={isloading}
//           onClick={deleteData}
//           className="p-[10px] bg-red-500 rounded-[10px] text-white  "
//         >
//           {isloading ? "Loading..." : "delete"}
//         </button>
//         <button
//           onClick={EditData}
//           className="p-[10px] bg-yellow-500 rounded-[10px] text-white"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

//
"use client";
import React, { useState } from "react";
import { deleteTodo, editTodo } from "@/service/mutation/todo-mutation";
import { useDispatch } from "react-redux";
import { EditDataReducer } from "@/store/reducers/reducer";

export const Card = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: number;
}) => {
  const [isLoading, setLoading] = useState(false); // For managing loading state
  const dispatch = useDispatch();

  const deleteData = async () => {
    setLoading(true);
    try {
      const res = await deleteTodo(id);
      console.log(res);
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const EditData = () => {
    // You don't need to use `useSelector` here as title and description are already passed as props
    const EditTitle = prompt("Enter Title", title);
    const EditDes = prompt("Enter Description", description);
    if (EditTitle && EditDes && id) {
      // Update Redux state
      dispatch(EditDataReducer({ title: EditTitle, description: EditDes }));

      // Persist the changes to the backend
      editTodo({ id, data: { title: EditTitle, description: EditDes } })
        .then((updatedData) => {
          console.log("Data updated:", updatedData);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  return (
    <div className="border border-[7px solid black] my-[10px] p-[20px] rounded">
      <h1 className="text-4xl text-blue-400">{title}</h1>
      <p className="mb-[10px]">{description}</p>
      <div className="flex gap-[10px]">
        <button
          disabled={isLoading}
          onClick={deleteData}
          className="p-[10px] bg-red-500 rounded-[10px] text-white"
        >
          {isLoading ? "Loading..." : "Delete"}
        </button>
        <button
          onClick={EditData}
          className="p-[10px] bg-yellow-500 rounded-[10px] text-white"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
