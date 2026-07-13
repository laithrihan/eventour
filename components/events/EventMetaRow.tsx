import Image from "next/image";

type EventMetaRowProps = {
  icon: string;
  alt: string;
  label: string;
  className?: string;
};

const EventMetaRow = ({
  icon,
  alt,
  label,
  className = "flex-row-gap-2 items-center",
}: EventMetaRowProps) => (
  <div className={className}>
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

export default EventMetaRow;
