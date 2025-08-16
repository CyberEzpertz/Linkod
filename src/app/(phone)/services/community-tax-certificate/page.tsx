import BackNavBar from "@/components/back-nav-bar";
import { CedulaClearanceForm } from "./_components/cedula-clearance-form";

export default function ServicesPage() {
  return (
    <div>
      <BackNavBar title="Cedula Clearance" />
      <div className="p-4">
        <CedulaClearanceForm />
      </div>
    </div>
  );
}
