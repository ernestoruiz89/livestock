import React from 'react';
import { Menu, LayoutDashboard, Users, Map, Wheat, Activity, Settings, ListTodo } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Ganado', id: 'cattle' },
    { icon: Map, label: 'Parcelas', id: 'pastures' },
    { icon: Wheat, label: 'Alimentación', id: 'feeding' },
    { icon: Activity, label: 'Salud', id: 'health' },
    { icon: ListTodo, label: 'Actividades', id: 'activities' },
    { icon: Settings, label: 'Configuración', id: 'settings' },
  ];

  return (
    <nav className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">GanadoERP</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${currentView === item.id ? 'bg-green-700' : 'hover:bg-green-700'}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-green-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium w-full text-left
                  ${currentView === item.id ? 'bg-green-700' : 'hover:bg-green-700'}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}