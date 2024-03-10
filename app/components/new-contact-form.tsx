"use client";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddressInfo from "./address-info";
import { PlusCircleIcon } from "lucide-react";

const schema = yup.object({
  name: yup.string().required("Este campo é obrigatório."),
  surname: yup.string(),
  email: yup.string().email("Insira um email válido."),
  phone: yup.string(),
});

interface NewContactFormProps {
  addContact: (data: ContactData) => void;
}

interface ContactData {
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export default function NewContactForm({ addContact }: NewContactFormProps) {
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [addressData, setAddressData] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    const formattedPhoneNumber = phoneNumber.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3",
    );
    return formattedPhoneNumber;
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setValue("phone", formattedPhoneNumber, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: ContactData) => {
    addContact({ ...data, address: addressData });
    reset();
    setAddressData({
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col gap-5"
    >
      <section className="flex gap-5">
        <div className="relative flex w-full flex-col gap-1">
          <input
            type="text"
            {...register("name")}
            placeholder="Nome"
            className="w-full border-b border-solid border-blue-500 p-1 outline-none"
          />
          <p className="text-xs text-red-600">{errors.name?.message}</p>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            {...register("surname")}
            placeholder="Sobrenome"
            className="w-full border-b border-solid border-blue-500 p-1 outline-none"
          />
        </div>
      </section>

      <div className="relative flex w-full flex-col gap-1">
        <input
          type="text"
          {...register("email")}
          placeholder="Email"
          className="w-full border-b border-solid border-blue-500 p-1 outline-none"
        />
        <p className="text-xs text-yellow-400">{errors.email?.message}</p>
      </div>

      <div className="relative flex w-full flex-col gap-1">
        <input
          type="text"
          {...register("phone")}
          onChange={handlePhoneChange}
          maxLength={11}
          placeholder="Número de telefone"
          className="w-full border-b border-solid border-blue-500 p-1 outline-none"
        />
        <p className="text-xs text-yellow-400">{errors.phone?.message}</p>
      </div>

      <button
        type="button"
        onClick={() => setShowAddressInfo(!showAddressInfo)}
        className="flex items-center gap-2 rounded-xl p-2.5 text-sm active:bg-gray-200"
      >
        <PlusCircleIcon size={14} className="fill-blue-500 text-white" />
        adicionar endereço
      </button>

      {showAddressInfo && <AddressInfo setAddressData={setAddressData} />}

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-500 p-2 text-white active:bg-gray-400"
      >
        Adicionar
      </button>
    </form>
  );
}
