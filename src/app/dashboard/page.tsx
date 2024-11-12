'use client';
import React from 'react';

import TopBar from '@/components/Topbar/TopBar';

const DashboardPage: React.FC = () => {


  return (
      <div className="dashboard-content flex-1 bg-gray-100">
        <TopBar />
      </div>
  );
};

export default DashboardPage;