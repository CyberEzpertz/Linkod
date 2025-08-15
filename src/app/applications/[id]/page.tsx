import BackNavBar from "@/components/back-nav-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, ClipboardCheck, UserCheck } from "lucide-react";

const steps = [
  {
    label: "Submitted by user",
    icon: UserCheck,
  },
  {
    label: "Processed by barangay",
    icon: ClipboardCheck,
  },
  {
    label: "Approved by barangay",
    icon: CheckCircle2,
  },
];

const applications = [
  {
    id: 1,
    type: "Community Tax Certificate",
    status: "Completed",
    date: "2025-08-01",
    stepsCompleted: 3,
    totalSteps: 3,
  },
  {
    id: 2,
    type: "Individual Clearance",
    status: "Pending",
    date: "2025-08-10",
    stepsCompleted: 1,
    totalSteps: 3,
  },
  {
    id: 3,
    type: "Business Clearance",
    status: "Rejected",
    date: "2025-08-12",
    stepsCompleted: 2,
    totalSteps: 3,
  },
];

export default async function ApplicationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const application = applications.find((app) => app.id === Number(id));

  if (!application) {
    return <div>Application not found</div>;
  }

  const progressPercentage =
    (application.stepsCompleted / application.totalSteps) * 100;

  return (
    <div className="space-y-6">
      <BackNavBar title="Application Details" />
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2 text-lg">
            {application.type}
            <Badge
              variant={
                application.status === "Completed"
                  ? "default"
                  : application.status === "Rejected"
                    ? "destructive"
                    : "secondary"
              }
            >
              {application.status}
            </Badge>
          </CardTitle>
          <div className="text-muted-foreground">Date: {application.date}</div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} />
          <div className="mt-4 text-sm">
            <strong>Current Step:</strong> {application.stepsCompleted} /{" "}
            {application.totalSteps}
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <strong>Progress:</strong>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-3",
                    index + 1 <= application.stepsCompleted
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
