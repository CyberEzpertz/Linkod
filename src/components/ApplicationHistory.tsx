import { Button } from "./ui/button";

const applications = [
  {
    id: 1,
    type: "Community Tax Certificate",
    status: "Approved",
    date: "2025-08-01",
  },
  {
    id: 2,
    type: "Individual Clearance",
    status: "Pending",
    date: "2025-08-10",
  },
  {
    id: 3,
    type: "Business Clearance",
    status: "Rejected",
    date: "2025-08-12",
  },
];

const ApplicationHistory = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center justify-between">
        <h2 className="font-bold">Application History</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <ul className="space-y-2">
        {applications.map((app) => (
          <li
            key={app.id}
            className="cursor-pointer rounded border p-4 hover:bg-gray-100"
            onClick={() => alert(`Clicked on ${app.type}`)}
          >
            <div className="font-semibold">{app.type}</div>
            <div className="text-sm text-gray-500">{app.date}</div>
            <div
              className={`text-sm ${app.status === "Approved" ? "text-green-500" : app.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}
            >
              {app.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationHistory;
