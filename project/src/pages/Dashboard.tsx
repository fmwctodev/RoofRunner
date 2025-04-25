import React from 'react';
import { RefreshCw } from 'lucide-react';
import Breadcrumbs from '../components/Navigation/Breadcrumbs';
import KPIRow from '../components/Dashboard/KPIRow';
import SecondaryMetrics from '../components/Dashboard/SecondaryMetrics';
import ActivityAndQuickActions from '../components/Dashboard/ActivityAndQuickActions';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' }, 
              { label: 'Dashboard', path: '/', active: true }
            ]} 
          />
          <h1 className="mt-2">Dashboard</h1>
        </div>
        
        <button className="btn btn-secondary inline-flex items-center gap-2 self-start">
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>
      
      <KPIRow />
      <SecondaryMetrics />
      <ActivityAndQuickActions />
    </div>
  );
};

export default Dashboard;