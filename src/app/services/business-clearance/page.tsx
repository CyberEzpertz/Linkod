import BackNavBar from "@/components/back-nav-bar";
import { BusinessClearanceForm } from "./_components/business-clearance-form";

export default function ServicesPage() {
  return (
    <div className="relative">
      <div className="bg-secondary/30 absolute -z-10 h-48 w-full rounded-b-[80%]" />
      <BackNavBar title="Business Clearance" />
      <div className="p-4">
        <BusinessClearanceForm />
      </div>
    </div>
  );
}
