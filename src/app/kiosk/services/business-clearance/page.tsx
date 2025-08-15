import { BusinessClearanceForm } from "./_components/business-clearance-form";
import BackNavBar from "@/components/back-nav-bar";

export default function BusinessClearancePage() {
  return (
    <div className="h-screen w-screen">
      <BackNavBar title="Business Clearance" />
      <div className="h-[calc(100vh-4rem)]">
        <BusinessClearanceForm />
      </div>
    </div>
  );
}