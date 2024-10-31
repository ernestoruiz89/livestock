import React from 'react';
import { Beef, Sprout, Activity, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Ganado',
      value: '234',
      icon: Beef,
      color: 'bg-blue-500',
    },
    {
      title: 'Parcelas Activas',
      value: '8',
      icon: Sprout,
      color: 'bg-green-500',
    },
    {
      title: 'Tratamientos Pendientes',
      value: '3',
      icon: Activity,
      color: 'bg-yellow-500',
    },
    {
      title: 'Alertas',
      value: '2',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Rotación de Parcelas</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Parcela {i}</p>
                  <p className="text-sm text-gray-500">Último cambio: hace 5 días</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">Activa</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Próximas Actividades</h2>
          <div className="space-y-4">
            {[
              { title: 'Vacunación Lote A', date: '2024-03-25', type: 'Salud' },
              { title: 'Rotación Parcela 4', date: '2024-03-26', type: 'Parcelas' },
              { title: 'Pesaje mensual', date: '2024-03-28', type: 'Control' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}