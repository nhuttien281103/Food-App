import React from 'react';
import DBHeader from './DBHeader';
import { Route, Routes } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@/routes';

const DBContentRight = () => {
  return (
    <main className="flex flex-col py-12 px-12 flex-1 h-full">
      {/* header dashboard */}
      <DBHeader />
      {/* content dashboard */}
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          {DASHBOARD_ROUTES.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </main>
  );
};

export default DBContentRight;
