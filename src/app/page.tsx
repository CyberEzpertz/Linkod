import Header from "@/components/header";
import HomepageButton from "@/components/homepage-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, IdCard, ScrollText, Signature } from "lucide-react";

interface Props {}
export default function HomePage({}: Props) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-4 pb-0">
        <div className="flex flex-row items-center gap-2 p-2 pb-8">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">Kamusta Juan</h2>
            <p className="text-sm">Anong gusto mong gawin ngayong araw?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HomepageButton icon={Signature} title="Digital Services" />
          <HomepageButton
            icon={CalendarClock}
            title="Meetings & Appointments"
          />
          <HomepageButton icon={IdCard} title="Personal Documents" />
          <HomepageButton icon={ScrollText} title="Payment History" />
        </div>
      </div>
    </div>
  );
}
