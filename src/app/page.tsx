"use client";

import Header from "@/components/header";
import HomepageButton from "@/components/homepage-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, IdCard, ScrollText, Signature } from "lucide-react";
import { useRouter } from "next/navigation";
import ApplicationHistory from "../components/application-history";

interface Props {}
export default function HomePage({}: Props) {
  const router = useRouter();
  return (
    <div className="to-secondary/50 relative flex flex-col bg-linear-to-b from-80% to-100% pb-8">
      <div className="bg-secondary/20 absolute -z-10 h-48 w-full rounded-b-[80%]" />
      <Header />
      <div className="flex flex-col gap-2 p-4 py-0">
        <div className="flex flex-row items-center gap-2 p-2 pb-4">
          <Avatar className="size-10">
            <AvatarImage src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS7x5Dp8grYfhk3haCkaxrztqORNTCw0YgGXBT4hP0bfQBLFARu60pLy4nqygLse1p19PW-GyPzha-JtJsD7c0amg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold">Hello, Juan!</p>
            <p className="text-sm">What do you want to do today?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <HomepageButton
            icon={Signature}
            title="Digital Services"
            onClick={() => router.push("/services")}
          />
          <HomepageButton
            icon={CalendarClock}
            title="Meetings & Appointments"
            onClick={() => router.push("/appointment")}
          />
          <HomepageButton
            icon={IdCard}
            title="Personal Documents"
            onClick={() => router.push("/personal-documents")}
          />
          <HomepageButton
            icon={ScrollText}
            title="Payment History"
            onClick={() => router.push("/payments")}
          />
        </div>
        <ApplicationHistory />
      </div>
    </div>
  );
}
