import { motion } from 'framer-motion';
import { avatar, logo } from '@/assets';
import { navLink } from '@/utils/dummy';
import { isActiveStyles, isNoActiveStyles } from '@/utils/stylesCss';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartIcon, LogOutIcon } from '@/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { buttonClick, slideTop } from '@/animations';
import { getAuth } from 'firebase/auth';
import { app } from '@/configs/firebase.config';
import { userLogout } from '@/context/slices/authSlice';
import { setModalCartOpen } from '@/context/slices/cartSlice';
import { getAllCartApi } from '@/api/productApi';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuUser, setIsMenuUser] = useState(false);

  useEffect(() => {
    if (!cart && currentUser) {
      dispatch(getAllCartApi(currentUser.user_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(userLogout());
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-3">
      {/* logo */}
      <NavLink to={'/'} className="flex items-center justify-center gap-4">
        <img src={logo} alt="logo" className="w-12" />
        <p className="font-semibold text-xl">Store N'Tien</p>
      </NavLink>
      {/* menu */}
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          {navLink.map((nav, index) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNoActiveStyles
              }
              key={index}
              to={nav.path}
            >
              {nav.textDislay}
            </NavLink>
          ))}
        </ul>

        {/* button cart */}
        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setModalCartOpen())}
          className="relative cursor-pointer"
        >
          <CartIcon width="1.8rem" className="text-headingColor" />
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-2">
            <p className="text-primary text-[13px] font-semibold">
              {currentUser ? cart?.length : 0}
            </p>
          </div>
        </motion.div>

        {/* check user login exist => user, dont'n exist => button login */}
        {currentUser ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsMenuUser(true)}
          >
            <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
              <motion.img
                className="w-full h-full object-cover"
                src={currentUser?.picture ? currentUser?.picture : avatar}
                alt="Avatar"
                whileHover={{ scale: 1.2 }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* menu user */}
            {isMenuUser && (
              <motion.div
                {...slideTop}
                onMouseLeave={() => setIsMenuUser(false)}
                className="w-48 px-6 py-4 bg-cardOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-3 flex flex-col gap-4"
              >
                {navLink.map((nav, index) => (
                  <NavLink
                    className="text-lg text-textColor hover:text-red-500"
                    key={index}
                    to={nav.path}
                  >
                    {nav.textDislay}
                  </NavLink>
                ))}
                <hr />
                {/* button sign out */}
                <motion.button
                  className="group flex items-center justify-center px-3 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200"
                  onClick={signOut}
                >
                  <LogOutIcon
                    width="1.2rem"
                    className="text-textColor group-hover:text-headingColor"
                  />
                  <p className="text-textColor group-hover:text-headingColor ml-[4px]">
                    Sign Out
                  </p>
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.button
            {...buttonClick}
            onClick={() => navigate('/login', { replace: true })}
            className="px-4 py-1 rounded-md text-white bg-cardOverlay border-none outline-none bg-red-500 cursor-pointer hover:opacity-80"
          >
            Login
          </motion.button>
        )}
      </nav>
    </header>
  );
};

export default Header;
