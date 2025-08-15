"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const AppointmentPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-8">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          My Appointments
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="font-medium">August 17, 2025</div>
                <div className="text-gray-500">12:00 PM</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild className="w-full max-w-md">
              <Link href="/appointment/book">
                Book New Appointment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentPage;