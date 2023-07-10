"use client"
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/6 bg-gray-800 text-white flex flex-col items-center">
        {/* Logo */}
        <img
          src="https://th.bing.com/th/id/OIP.gGrFPRdl5CD3Ub3nhrBw6gHaFU?pid=ImgDet&rs=1"
          alt="Logo"
          className="h-44 w-72 mt-4"
        />
        {/* Conteúdo da barra lateral */}
        <ul className="mt-8">
          <li className="flex items-center space-x-2 p-4">
            <HomeIcon />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2 p-4">
            <SettingsIcon />
            <span>Settings</span>
          </li>
          <li className="flex items-center space-x-2 p-4">
            <NotificationsIcon />
            <span>Notifications</span>
          </li>
        </ul>
      </aside>
      <main className="w-4/5 bg-gray-100">
        {/* Cabeçalho */}
        <header className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Ícone de pesquisa */}
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          {/* Ícone de perfil */}
          <AccountCircleIcon />
        </header>
        {/* Conteúdo principal */}
        <div className="p-4">
          {/* Card */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Título do Card</h2>
            <p className="text-gray-600">Descrição do Card</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
