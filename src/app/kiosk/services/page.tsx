import BackNavBar from "@/components/back-nav-bar";
import ServiceButton from "./_components/service-button";

interface ServicesPageProps {}

type pageLink = {
  title: string;
  link: string;
};

const pageLinks: pageLink[] = [
  {
    title: "Business Clearance",
    link: "/kiosk/services/business-clearance",
  },
  {
    title: "Individual Clearance",
    link: "/kiosk/services/individual-clearance",
  },
  {
    title: "Community Tax Cert. (Cedula)",
    link: "/kiosk/services/community-tax-certificate",
  },
  {
    title: "Certificate of Residency",
    link: "/kiosk/services/residency",
  },
];

export default function ServicesPage({}: ServicesPageProps) {
  return (
    <div className="h-screen w-screen">
      <BackNavBar title="Digital Services" />
      <div className="flex flex-col gap-4 p-6">
        {pageLinks.map(({ title, link }, index) => (
          <ServiceButton key={index} title={title} href={link} />
        ))}
      </div>
    </div>
  );
}