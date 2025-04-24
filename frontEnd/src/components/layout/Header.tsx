import { useUser } from "../../contexts/userContext";

export const Header = () => {
  const { userName } = useUser();

  return (
    <header className="bg-teal-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts App</h1>
        <div className="text-sm">Welcome, {userName}</div>
      </div>
    </header>
  );
};
