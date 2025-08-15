import { IndividualClearanceForm } from "./_components/individual-clearance-form";
import BackNavBar from "@/components/back-nav-bar";

export default function IndividualClearancePage() {
  return (
    <div className="h-screen w-screen">
      <BackNavBar title="Individual Clearance" />
      <div className="h-[calc(100vh-4rem)]">
        <IndividualClearanceForm />
      </div>
    </div>
  );
}