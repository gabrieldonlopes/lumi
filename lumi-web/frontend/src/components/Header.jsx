import React from "react";
import { User } from "lucide-react"; // ícone moderno

const Header = () => {
  const user = { name: "Gdon" }; // fictício, pode vir da API depois

  return (
    <header className="flex justify-between items-center bg-gray-900 px-6 py-3 rounded-xl shadow-md mb-6">
      {/* Nome do App */}
      <h1 className="text-2xl font-bold text-white tracking-wide">LUMI</h1>

      {/* Usuário */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-300 font-semibold">{user.name}</span>
        <div className="w-9 h-9 bg-gray-800 flex items-center justify-center rounded-full hover:bg-gray-700 cursor-pointer transition">
          <User className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
