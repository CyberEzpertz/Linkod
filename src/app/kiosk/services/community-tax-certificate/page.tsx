import { CedulaClearanceForm } from "./_components/cedula-clearance-form";
import BackNavBar from "@/components/back-nav-bar";

export default function CedulaClearancePage() {
  return (
    <div className="bg-background min-h-screen w-screen">
      <BackNavBar title="Community Tax Certificate (Cedula)" />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-8">
        <div className="w-full max-w-[1400px]">
          <CedulaClearanceForm />
        </div>
      </div>
    </div>
  );
}
