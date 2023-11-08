// import { useForm, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { addLinkFormSchema, addLinkFormSchemaType } from "../lib/formSchema";

// interface IProps {
//   refresh: () => void;
// }

// export default function AddLinkInput({ refresh }: IProps) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<addLinkFormSchemaType>({
//     mode: "onTouched",
//     resolver: zodResolver(addLinkFormSchema),
//   });

//   const onSubmit: SubmitHandler<addLinkFormSchemaType> = (data) => {
//     console.log(data);
//   };

//   const isError = false;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ${
//           isError
//             ? "ring-red-300 placeholder:text-red-300 focus:ring-red-500"
//             : "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
//         } outline-none focus:ring-2 sm:text-sm sm:leading-6`}
//         type="text"
//         placeholder="Add your link ..."
//         {...register("content")}
//       />
//     </form>
//   );
// }
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addLinkFormSchema, addLinkFormSchemaType } from '../lib/formSchema';
import { getUrl } from "../helpers";
import { useEffect, useState } from "react";
// Assuming IProps is an interface for component props
interface IProps {
  refresh: () => void;
}

export default function AddLinkInput({ refresh }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addLinkFormSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(addLinkFormSchema),
  });
  const [classId, setClassId] = useState("b9");
  const onSubmit: SubmitHandler<addLinkFormSchemaType> = async (data) => {
    try {
      // Send a POST request to your backend endpoint
      const response = await fetch(`${getUrl()}/api/v1/link/${classId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Link added successfully
        console.log('Link added successfully');
        // You can also refresh the UI or take other actions here
        refresh();
      } else {
        // Handle any potential errors or display error messages
        const responseData = await response.json();
        console.error(responseData.message);
        // You can set an error state and display it to the user if needed
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle and display the error to the user as needed
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ${
          errors.content
            ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            : 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
        } outline-none focus:ring-2 sm:text-sm sm:leading-6`}
        type="text"
        placeholder="Add your link ..."
        {...register('content')}
      />
      {/* You can display an error message for 'content' here if needed */}
      <button type="submit">Add Link</button>
    </form>
  );
}
