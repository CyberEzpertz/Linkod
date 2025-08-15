import { CedulaClearanceForm } from "./_components/cedula-clearance-form";
import BackNavBar from "@/components/back-nav-bar";

export default function CedulaClearancePage() {
  return (
    <div className="h-screen w-screen">
      <BackNavBar title="Community Tax Certificate (Cedula)" />
      <div className="h-[calc(100vh-4rem)]">
        <CedulaClearanceForm />
      </div>
    </div>
  );
}