import { ILink } from "../types";

export default function Links({ data }: { data: ILink[] }) {
  return (
    <div className="bdr3 flex flex-col gap-6">
      {data?.map((link) => (
        <div
          key={link._id}
          className="flex items-center rounded bg-white p-4 shadow-md "
        >
          <div>
            <h2 className="mb-2 text-lg font-bold">
              <a href={link.content} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                {link.content}
              </a>
            </h2>
            <p>
              <strong>Email:</strong> {link.ipAddress}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {JSON.stringify(link?.createdOn)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
