import { ILink } from "../types";

export default function Links({ data }: { data: ILink[] }) {
  return (
    <div className="bdr3 flex flex-col gap-6">
      {data?.map((doctor) => (
        <div
          key={doctor._id}
          className="flex items-center rounded bg-white p-4 shadow-md "
        >
          <div>
            <h2 className="mb-2 text-lg font-bold">{doctor.content}</h2>
            <p>
              <strong>Email:</strong> {doctor.ipAddress}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {JSON.stringify(doctor?.createdOn)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
