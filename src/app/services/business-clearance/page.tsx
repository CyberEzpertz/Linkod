import BackNavBar from "@/components/back-nav-bar";
import { BusinessClearanceForm } from "./_components/business-clearance-form";

export default function ServicesPage() {
  return (
    <div>
      <BackNavBar title="Business Clearance" />
      <div className="p-4">
        <BusinessClearanceForm />
      </div>
    </div>
  );
}
