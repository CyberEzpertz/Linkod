import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const applications = [
  {
    id: 1,
    type: "Community Tax Certificate",
    status: "Completed",
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
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center justify-between">
        <h2 className="font-bold">Application History</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {applications.map((app) => (
          <Card
            key={app.id}
            className="flex cursor-pointer flex-row items-center gap-1 rounded-xl border p-4"
            onClick={() => router.push(`/applications/${app.id}`)}
          >
            <div className="flex flex-col gap-1">
              <div className="font-semibold">{app.type}</div>
              <div className="inline-flex items-center gap-2">
                <Badge
                  variant={
                    app.status === "Completed"
                      ? "default"
                      : app.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                  }
                  className="items-center"
                >
                  {app.status}
                </Badge>
                <span className="text-muted-foreground">{"•"}</span>
                <div className="text-sm text-gray-500">{app.date}</div>
              </div>
            </div>
            <div className="text-secondary-foreground bg-secondary ml-auto rounded-full p-2">
              <ChevronRight className="size-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationHistory;
