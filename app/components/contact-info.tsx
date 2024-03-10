import { MailIcon, PhoneIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ContactInfoProps {
  contact: {
    id: number;
    name: string;
    surname?: string;
    email?: string;
    phone?: string;
    address?: {
      city: string;
      neighborhood: string;
      state: string;
      street: string;
    };
  };
  handleCloseContactInfo: () => void;
}

export default function ContactInfo({
  contact,
  handleCloseContactInfo,
}: ContactInfoProps) {
  const formattedPhone = contact.phone?.replace(/\D/g, "");

  console.log(contact);

  return (
    <div className="flex h-full flex-col items-center gap-5 p-5">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium">
          {contact.name} {contact.surname}
        </h3>
        <p className="text-sm text-gray-400">{contact.phone}</p>
      </div>

      <div className="flex gap-2.5">
        <a href={`https://wa.me/${formattedPhone}`} target="_blank">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <FaWhatsapp size={18} />
          </button>
        </a>

        <a href={`mailto:${contact.email}`} target="_blank">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <MailIcon size={18} />
          </button>
        </a>

        <a href={`tel:${formattedPhone}`} target="_blank">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <PhoneIcon size={18} />
          </button>
        </a>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <h3 className="text-xl font-medium text-blue-500">Email</h3>

        <p className="flex items-center gap-2">
          <MailIcon size={16} className="text-gray-400" />
          {contact.email}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <h3 className="text-xl font-medium text-blue-500">Dados do Endereço</h3>

        <div className="flex flex-col gap-1">
          <p>{contact.address?.street}</p>
          <p>{contact.address?.neighborhood}</p>
          <p>
            {contact.address?.city} - {contact.address?.state}
          </p>
        </div>
      </div>

      <button
        onClick={handleCloseContactInfo}
        className="absolute left-0 top-0 m-3 text-sm text-blue-500 active:text-gray-400"
      >
        Fechar
      </button>

      <div className="absolute bottom-0 flex w-full flex-col gap-2.5 p-5">
        <button className="rounded-xl bg-blue-500 p-2 text-white active:bg-gray-400">
          Editar
        </button>

        <button className="rounded-xl bg-red-600 p-2 text-white active:bg-gray-400">
          Apagar Contato
        </button>
      </div>
    </div>
  );
}
