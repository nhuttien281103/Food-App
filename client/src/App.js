/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '@/configs/firebase.config';
import { motion } from 'framer-motion';

import { validateUserJWTToken } from './api/userApi';
import { useDispatch } from 'react-redux';
import { fadeOutInput } from './animations';
import { userLogin } from './context/slices/authSlice';
import { Loading } from './components';
import { CLIENT_ROUTES } from './routes';
import { getAllCartApi } from './api/productApi';

function App() {
  const firebaseAuth = getAuth(app);
  const dispath = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              dispath(getAllCartApi(data.user_id));
            }
            dispath(userLogin(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeOutInput}
          className="fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <Loading />
        </motion.div>
      )}
      <Routes>
        {CLIENT_ROUTES.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
