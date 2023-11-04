import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkFormSchema, addLinkFormSchemaType } from "../lib/formSchema";

interface IProps {
  refresh: () => void;
}

export default function AddLinkInput({ refresh }: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<addLinkFormSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(addLinkFormSchema),
  });

  const onSubmit: SubmitHandler<addLinkFormSchemaType> = (data) => {
    console.log(data);
  };

  const isError = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ${
          isError
            ? "ring-red-300 placeholder:text-red-300 focus:ring-red-500"
            : "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        } outline-none focus:ring-2 sm:text-sm sm:leading-6`}
        type="text"
        placeholder="Add your link ..."
        {...register("content")}
      />
    </form>
  );
}
