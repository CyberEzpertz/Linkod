"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TimeSlot {
  time: string;
  booked: number;
}

const DEFAULT_TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function BookAppointmentPage() {
  const router = useRouter();

  // Generate unavailable dates using a seeded approach
  const [unavailableDates] = useState<Date[]>(() => {
    const dates: Date[] = [];
    const currentDate = new Date();
    const startYear = currentDate.getFullYear();
    const startMonth = currentDate.getMonth();

    // Generate unavailable dates for next 6 months using date itself as seed
    for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
      const targetMonth = (startMonth + monthOffset) % 12;
      const targetYear =
        startYear + Math.floor((startMonth + monthOffset) / 12);
      const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        // Skip August 17th
        if (targetMonth === 7 && day === 17) continue;

        // Use the date itself to determine if it should be unavailable
        // This ensures consistent results between server and client
        const dateNum = day + targetMonth + targetYear;
        if (dateNum % 3 === 0) {
          // Make every third date unavailable
          dates.push(new Date(targetYear, targetMonth, day));
        }
      }
    }
    return dates;
  });

  // Set booked date (August 17, 2025)
  const bookedDate = new Date(2025, 7, 17); // Month is 0-based
  const bookedTime = "12:00 PM";

  // Initialize with booked date and time
  const [date, setDate] = useState<Date | undefined>(bookedDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(bookedTime);
  const [purpose, setPurpose] = useState<string>("documents");

  // Generate time slots for the selected date
  const timeSlots = date
    ? DEFAULT_TIME_SLOTS.map((time) => {
        // Special case for August 17th
        if (date.getMonth() === 7 && date.getDate() === 17) {
          if (time === "12:00 PM") {
            return { time, booked: 1 };
          }
          // Generate deterministic random bookings for other slots
          const timeIndex = DEFAULT_TIME_SLOTS.indexOf(time);
          const booked = (timeIndex * 17) % 4; // Will give 0-3 bookings based on time slot
          return { time, booked };
        }

        // For unavailable dates
        const isUnavailable = unavailableDates.some(
          (unavailableDate) =>
            unavailableDate.getDate() === date.getDate() &&
            unavailableDate.getMonth() === date.getMonth() &&
            unavailableDate.getFullYear() === date.getFullYear()
        );

        if (isUnavailable) {
          return { time, booked: 5 };
        }

        // For available dates, use the time and date to generate a consistent booking number
        const timeNum = DEFAULT_TIME_SLOTS.indexOf(time);
        const dateNum =
          date.getDate() + date.getMonth() + date.getFullYear() + timeNum;
        const booked = dateNum % 6; // 0-4 bookings
        return { time, booked };
      })
    : [];

  const availableSlots = timeSlots.filter((slot) => slot.booked < 5);
  const unavailableSlots = timeSlots.filter((slot) => slot.booked === 5);

  const isBookedDateSelected =
    date &&
    date.getDate() === bookedDate.getDate() &&
    date.getMonth() === bookedDate.getMonth() &&
    date.getFullYear() === bookedDate.getFullYear();

  const isBookedTimeSelected = selectedTime === bookedTime;

  const getButtonText = () => {
    if (isBookedDateSelected && isBookedTimeSelected) {
      return "Clear Appointment";
    }
    if (date && selectedTime) {
      return "Change Appointment";
    }
    return "Book Appointment";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-black">
          Book Appointment/Meeting
        </h1>

        <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={unavailableDates}
            className="rounded-md"
            classNames={{
              day_selected: "bg-black text-white hover:bg-black",
              day_today: "bg-gray-100 text-black",
              day_outside: "text-gray-300",
              day: "hover:bg-gray-50",
              day_disabled:
                "text-red-500 line-through cursor-not-allowed hover:bg-transparent",
            }}
          />
        </div>

        <div className="flex w-full flex-col space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-black">
              Purpose of the Appointment
            </h2>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger className="w-full py-6 text-lg">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="complaints">Complaints</SelectItem>
                <SelectItem value="community-services">
                  Community Services
                </SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {availableSlots.length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-black">
                Available Time Slots
              </h2>
              <div className="flex flex-col space-y-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant="outline"
                    className={`flex h-16 items-center justify-between px-6 py-6 text-lg ${
                      selectedTime === slot.time
                        ? "border-black bg-gray-50"
                        : ""
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    <span className="text-lg">{slot.time}</span>
                    <span className="text-gray-500">{slot.booked}/5</span>
                  </Button>
                ))}
              </div>
            </>
          )}

          {unavailableSlots.length > 0 && (
            <>
              <h2 className="mt-6 text-lg font-semibold text-black">
                Unavailable Time Slots
              </h2>
              <div className="flex flex-col space-y-2">
                {unavailableSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant="outline"
                    className="flex h-16 cursor-not-allowed items-center justify-between border-red-500 px-6 py-6 text-lg text-gray-500"
                    disabled
                  >
                    <span className="text-lg">{slot.time}</span>
                    <span>{slot.booked}/5</span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <Button
            className="w-full bg-black py-8 text-xl font-semibold text-white hover:bg-gray-800"
            disabled={!selectedTime || !purpose}
          >
            {getButtonText()}
          </Button>

          <Button
            variant="outline"
            className="w-full border-2 border-black py-8 text-xl font-semibold hover:bg-gray-50"
            onClick={() => router.push("/appointment")}
          >
            Back
          </Button>
        </div>
      </div>
    </main>
  );
}
