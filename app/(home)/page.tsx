"use client";

import { useEffect, useState } from "react";
import AddNewContact from "../components/add-new-contact";
import Contact from "../components/contact";
import Header from "../components/header";
import ContactInfo from "../components/contact-info";

export default function Home() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const addContact = (newContact: any) => {
    const updatedContacts = [
      ...contacts,
      { ...newContact, id: contacts.length + 1 },
    ];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
  };

  const handleCloseContactInfo = () => {
    setSelectedContact(null);
  };

  return (
    <main className="flex min-h-screen w-full justify-center bg-slate-200 p-5">
      <div className="flex min-h-full flex-col gap-5 rounded-3xl bg-blue-50 p-5 shadow-xl">
        <Header />

        <div className="flex h-full gap-10">
          <section className="flex min-w-96 max-w-96 flex-col gap-5 rounded-3xl bg-white p-5">
            <h3 className="text-2xl font-medium">Contatos</h3>

            <div className="flex flex-col gap-5">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                  className={`cursor-pointer rounded-xl p-1.5 active:bg-gray-200 ${selectedContact && selectedContact.id === contact.id ? "bg-gray-200" : ""}`}
                >
                  <Contact contact={contact} />
                </div>
              ))}
            </div>
          </section>

          <section className="relative min-w-96 max-w-96 overflow-hidden rounded-3xl bg-white">
            <AddNewContact addContact={addContact} />

            {selectedContact && (
              <div className="absolute top-0 h-full w-full bg-white">
                <ContactInfo
                  contact={selectedContact}
                  handleCloseContactInfo={handleCloseContactInfo}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
