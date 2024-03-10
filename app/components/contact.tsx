import { PhoneIcon } from "lucide-react";

interface ContactProps {
  contact: {
    id: number;
    name: string;
    surname?: string;
    email?: string;
    phone?: string;
  };
}

export default function Contact({ contact }: ContactProps) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">
        {contact.name} {contact.surname}
      </h3>
      <p className="flex items-center gap-2 text-xs text-gray-400">
        <PhoneIcon size={12} />
        {contact.phone}
      </p>
    </div>
  );
}
