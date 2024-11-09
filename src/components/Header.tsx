import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-500">
          <Bell className="w-6 h-6" />
        </button>
        <button className="flex items-center space-x-2 text-gray-700">
          <User className="w-6 h-6" />
          <span>Usuário</span>
        </button>
      </div>
    </header>
  );
}