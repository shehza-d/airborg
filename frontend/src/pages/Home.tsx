import AddLinkInput from "../components/AddLinkInput";
import ClassIdInput from "../components/ClassIdInput";
import DeleteAllButton from "../components/DeleteAllButton";
import Links from "../components/Links";
import RefreshButton from "../components/RefreshButton";
import useFetchData from "../hooks/useFetchData";

export default function Home() {
  const { data, isLoading, refresh, classId, setClassId } = useFetchData();

  return (
    <div className="container mx-auto">
      {isLoading && (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      )}
      <h1 className="gradient my-4 text-2xl font-bold">
        Book your appointment with your Doctor now!
      </h1>
      <DeleteAllButton />
      <RefreshButton />
      <ClassIdInput classId={classId} setClassId={setClassId} />
      <AddLinkInput refresh={refresh} />
      <Links data={data} />
    </div>
  );
}
