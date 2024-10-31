import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CattleList from './components/cattle/CattleList';
import PastureList from './components/pastures/PastureList';
import FeedingList from './components/feeding/FeedingList';
import HealthList from './components/health/HealthList';

function App() {
  const [currentView, setCurrentView] = React.useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      <main className="max-w-7xl mx-auto">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'cattle' && <CattleList />}
        {currentView === 'pastures' && <PastureList />}
        {currentView === 'feeding' && <FeedingList />}
        {currentView === 'health' && <HealthList />}
      </main>
    </div>
  );
}

export default App;