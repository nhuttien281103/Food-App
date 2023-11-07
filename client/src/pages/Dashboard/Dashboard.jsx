import { DBContentRight, DBSidebar } from '@/layouts/Dashboard';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBSidebar />
      <DBContentRight />
    </div>
  );
};

export default Dashboard;
