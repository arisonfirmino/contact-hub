import Search from "./search";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="font-bold uppercase text-blue-500">Contact Hub</h1>

      <Search />
    </header>
  );
}
