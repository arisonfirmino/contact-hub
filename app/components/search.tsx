import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <form>
      <div className="flex gap-2.5 rounded-lg bg-white px-2.5 py-1">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-transparent outline-none"
        />
        <button>
          <SearchIcon size={16} />
        </button>
      </div>
    </form>
  );
}
