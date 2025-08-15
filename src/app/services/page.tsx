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
    link: "/services/business-clearance",
  },
  {
    title: "Individual Clearance",
    link: "/services/individual-clearance",
  },
  {
    title: "Community Tax Cert. (Cedula)",
    link: "/services/community-tax-certificate",
  },
  {
    title: "Certificate of Residency",
    link: "/services/residency",
  },
];

export default function ServicesPage({}: ServicesPageProps) {
  return (
    <div>
      <BackNavBar title="Digital Services" />
      <div className="grid grid-cols-2 gap-2 p-4">
        {pageLinks.map(({ title, link }, index) => (
          <ServiceButton key={index} title={title} href={link} />
        ))}
      </div>
    </div>
  );
}
