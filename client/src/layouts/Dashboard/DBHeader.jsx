import React from 'react';
import { motion } from 'framer-motion';
import { avatar } from '@/assets';
import { BellIcon, LogOutIcon, SearchIcon } from '@/components/Icons';
import { useSelector } from 'react-redux';
import { buttonClick } from '@/animations';

const DBHeader = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <header className="w-full flex items-center justify-between gap-3 mb-6">
      <p className="text-xl font-semibold text-headingColor">
        Welcome to Store N'Tien
        {user?.name && (
          <span className="block text-base font-normal text-gray-500">{`Hello ${user?.name}...!`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        {/* input search */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3 px-4 bg-cardOverlay backdrop-blur-md border border-gray-200 rounded-md">
            <input
              type="text"
              placeholder="Search here..."
              className="border-none outline-none bg-transparent w-32 text-base font-normal text-headingColor"
            />
            <SearchIcon width="1.6rem" className="text-gray-400" />
          </div>
        </div>
        {/* button alert  */}
        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md border border-gray-200 flex items-center justify-center"
        >
          <BellIcon width="1.6rem" className="text-gray-400" />
        </motion.div>
        {/* image user */}
        <div className="w-10 h-10 rounded-md border border-gray-200 cursor-pointer overflow-hidden flex items-center justify-center">
          <motion.img
            className="w-full h-full object-cover"
            src={user?.picture ? user?.picture : avatar}
            alt="Avatar"
            whileHover={{ scale: 1.2 }}
            referrerPolicy="no-referrer"
          />
        </div>
        {/* button logout */}
        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-cardOverlay backdrop-blur-md border border-gray-200 flex items-center justify-center"
        >
          <LogOutIcon width="1.4rem" className="text-gray-400" />
        </motion.div>
      </div>
    </header>
  );
};

export default DBHeader;
