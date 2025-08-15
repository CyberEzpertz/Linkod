import BackNavBar from "@/components/back-nav-bar";
import { IndividualClearanceForm } from "./_components/individual-clearance-form";

export default function ServicesPage() {
  return (
    <div>
      <BackNavBar title="Individual Clearance" />
      <div className="p-4">
        <IndividualClearanceForm />
      </div>
    </div>
  );
}
