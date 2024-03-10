import NewContactForm from "./new-contact-form";

interface AddNewContactProps {
  addContact: (newContact: any) => void;
}

export default function AddNewContact({ addContact }: AddNewContactProps) {
  return (
    <div className="flex h-full max-h-[590px] flex-col items-center gap-10 overflow-auto p-5 [&::-webkit-scrollbar]:hidden">
      <h3 className="text-lg font-medium">Novo Contato</h3>

      <NewContactForm addContact={addContact} />
    </div>
  );
}
