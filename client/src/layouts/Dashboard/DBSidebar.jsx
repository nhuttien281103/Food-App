import { logo } from '@/assets';
import { navLinkDashboard } from '@/utils/dummy';
import { isActiveStyles, isNoActiveStyles } from '@/utils/stylesCss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DBSidebar = () => {
  return (
    <div className="h-full py-12 flex flex-col backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      {/* logo */}
      <NavLink to={'/'} className="flex items-center justify-start px-6 gap-4">
        <img src={logo} alt="logo" className="w-12" />
        <p className="font-semibold text-xl">Store N'Tien</p>
      </NavLink>
      <hr />
      {/* menu dashboard */}
      <ul className="flex flex-col gap-4">
        {navLinkDashboard.map((nav, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 border-l-4 border-red-500`
                : isNoActiveStyles
            }
            key={index}
            to={nav.path}
          >
            {nav.textDislay}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default DBSidebar;
