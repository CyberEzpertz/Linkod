"use client";
import BackNavBar from "@/components/back-nav-bar";
import {
  Accessibility,
  BriefcaseBusiness,
  HandCoins,
  HandHeart,
  HousePlus,
  LucideIcon,
  User2,
} from "lucide-react";
import KioskServiceButton from "./_components/kiosk-service-button";

interface ServicesPageProps {}

type pageLink = {
  title: string;
  link: string;
  icon: LucideIcon;
  description: string;
  disabled?: boolean;
};

const pageLinks: pageLink[] = [
  {
    title: "Business Clearance",
    link: "/kiosk/services/business-clearance",
    icon: BriefcaseBusiness,
    description: "Apply for a business clearance certificate.",
  },
  {
    title: "Individual Clearance",
    link: "/kiosk/services/individual-clearance",
    icon: User2,
    description: "Get your individual clearance.",
  },
  {
    title: "Community Tax Cert. (Cedula)",
    link: "/kiosk/services/community-tax-certificate",
    icon: HandCoins,
    description: "Request a community tax certificate.",
  },
  {
    title: "Certificate of Residency",
    link: "/kiosk/services/residency",
    icon: HousePlus,
    description: "Obtain a certificate of residency.",
    disabled: true,
  },
  {
    title: "PWD Card",
    link: "/kiosk/services/pwd-card",
    icon: Accessibility,
    description: "Apply for a PWD card.",
    disabled: true,
  },
  {
    title: "Senior Citizen Card",
    link: "/kiosk/services/senior-card",
    icon: HandHeart,
    description: "Apply for a senior citizen card.",
    disabled: true,
  },
];

export default function ServicesPage({}: ServicesPageProps) {
  return (
    <div>
      <BackNavBar title="Digital Services" />
      <div className="grid grid-cols-3 gap-2 p-4">
        {pageLinks.map(
          ({ title, link, icon, description, disabled }, index) => (
            <KioskServiceButton
              key={index}
              title={title}
              href={link}
              icon={icon}
              description={description}
              disabled={disabled}
            />
          )
        )}
      </div>
    </div>
  );
}
