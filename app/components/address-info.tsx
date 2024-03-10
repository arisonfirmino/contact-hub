"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";

interface AddressInfoProps {
  setAddressData: (data: AddressData) => void;
}

interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export default function AddressInfo({ setAddressData }: AddressInfoProps) {
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleZipCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const enteredZipCode = event.target.value;

    const cleanedZipCode = enteredZipCode.replace(/\D/g, "");
    setZipCode(cleanedZipCode);

    if (cleanedZipCode.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanedZipCode}/json/`,
        );
        const data = response.data;
        setStreet(data.logradouro);
        setNeighborhood(data.bairro);
        setCity(data.localidade);
        setState(data.uf);

        // Envia os dados do endereço para o componente pai
        setAddressData({
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        });
      } catch (error) {
        console.error("Erro ao obter dados do CEP:", error);
      }
    } else {
      setStreet("");
      setNeighborhood("");
      setCity("");
      setState("");
    }
  };

  const formatZipCode = (zipCode: string) => {
    const formattedZipCode = zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
    return formattedZipCode;
  };

  return (
    <section className="flex flex-col gap-5 text-sm">
      <div className="w-full">
        <input
          type="text"
          placeholder="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border-b border-solid border-blue-500 p-1 outline-none"
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="Bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full border-b border-solid border-blue-500 p-1 outline-none"
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border-b border-solid border-blue-500 p-1 outline-none"
        />
      </div>

      <section className="flex gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border-b border-solid border-blue-500 p-1 outline-none"
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="CEP"
            value={formatZipCode(zipCode)}
            onChange={handleZipCodeChange}
            className="w-full border-b border-solid border-blue-500 p-1 outline-none"
          />
        </div>
      </section>
    </section>
  );
}
