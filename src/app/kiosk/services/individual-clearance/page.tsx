import { IndividualClearanceForm } from "./_components/individual-clearance-form";
import BackNavBar from "@/components/back-nav-bar";

export default function IndividualClearancePage() {
  return (
    <div className="min-h-screen w-screen bg-background">
      <BackNavBar title="Individual Clearance" />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8">
        <div className="w-full max-w-[1400px]">
          <IndividualClearanceForm />
        </div>
      </div>
    </div>
  );
}