interface IProps {
  classId: string;
  setClassId: React.Dispatch<React.SetStateAction<string>>;
}
export default function ClassIdInput({ classId, setClassId }: IProps) {
  const isError = true;

  return (
    <form>
      ClassIdInput
      <input
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ${
          isError
            ? "ring-red-300 placeholder:text-red-300 focus:ring-red-500"
            : "ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
        } outline-none focus:ring-2 sm:text-sm sm:leading-6`}
        type="text"
        value={classId}
        placeholder="Class Id..."
      />
    </form>
  );
}
