import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '@/configs/firebase.config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { loginBg, logo } from '@/assets';
import Helmet from '@/components/Helmet';
import { LoginInput } from '@/components';
import { EmailIcon, GooleIcon, LockIcon } from '@/components/Icons';
import { buttonClick } from '@/animations';
import { validateUserJWTToken } from '@/api/userApi';
import { userLogin } from '@/context/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [isSignUp, setIsSignUp] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // handle sign up with google in firebase
  const handleSignInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                dispath(userLogin(data));
              });
              navigate('/', { replace: true });
            });
          }
        });
      })
      .catch((error) => {
        console.error('Error : ' + error.message);
      });
  };

  // handle sign up with email and password in firebase
  const signUpWithEmailPassword = async () => {
    if (
      user.password === '' ||
      user.email === '' ||
      user.confirmPassword === ''
    ) {
      toast.warn('The input is required');
    } else if (user.password === user.confirmPassword) {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        user.email,
        user.password,
      ).then(() => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                console.log(data);
                dispath(userLogin(data));
              });
              navigate('/login', { replace: true });
            });
          }
        });
      });
    } else {
      // Alert message error
      toast.error('Registration failed');
    }
  };

  // handle sign up with email and password in firebase
  const handleSignInEmailPassword = async () => {
    if (user.email !== '' && user.password !== '') {
      await signInWithEmailAndPassword(
        firebaseAuth,
        user.email,
        user.password,
      ).then(() => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                dispath(userLogin(data));
              });
              navigate('/', { replace: true });
            });
          }
        });
      });
    } else {
      // Alert message error
      toast.error('Email or password is incorrect');
    }
  };

  return (
    <Helmet title="Login">
      <div className="w-screen h-screen relative overflow-hidden flex">
        {/* backgroud image */}
        <img
          src={loginBg}
          alt="backgroud login"
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        {/* content box */}
        <div
          className="flex flex-col items-center gap-6 left-0 bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4
         py-12"
        >
          {/* top logo section */}
          <div className="flex items-center justify-start gap-4 w-full">
            <img src={logo} className="w-8" alt="logo" />
            <p className="text-headingColor font-semibold text-2xl">City</p>
          </div>

          {/* welcom text */}
          <p className="text-3xl font-semibold text-headingColor">
            Welcome Back
          </p>
          <p className="text-xl text-textColor -mt-6">
            {!isSignUp ? 'Sign in' : 'Sign up'} with following
          </p>

          {/* input section */}
          <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
            <LoginInput
              placeHolder="Email here"
              inputState={user.email}
              icon={<EmailIcon width="1.8rem" className="text-headingColor" />}
              inputStateFunc={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              type={'email'}
            />
            <LoginInput
              placeHolder="Password here"
              inputState={user.password}
              icon={<LockIcon width="1.8rem" className="text-headingColor" />}
              inputStateFunc={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              type={'password'}
            />
            {isSignUp && (
              <LoginInput
                placeHolder="Confirm password here"
                inputState={user.confirmPassword}
                icon={<LockIcon width="1.8rem" className="text-headingColor" />}
                inputStateFunc={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                type={'password'}
              />
            )}
            {!isSignUp ? (
              <p>
                Doesn't have an account?
                <motion.button
                  {...buttonClick}
                  className="text-red-500 bg-transparent underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Create one
                </motion.button>
              </p>
            ) : (
              <p>
                Already have an account?
                <motion.button
                  {...buttonClick}
                  className="text-red-500 bg-transparent underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in here
                </motion.button>
              </p>
            )}

            {/* button section */}
            {isSignUp ? (
              <motion.button
                {...buttonClick}
                className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-xl capitalize text-white hover:bg-red-600 transition-all duration-150"
                onClick={signUpWithEmailPassword}
              >
                Sign up
              </motion.button>
            ) : (
              <motion.button
                {...buttonClick}
                className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-xl capitalize text-white hover:bg-red-600 transition-all duration-150"
                onClick={handleSignInEmailPassword}
              >
                Sign in
              </motion.button>
            )}
          </div>
          <div className="flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">or</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>

          <motion.div
            {...buttonClick}
            className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
            onClick={handleSignInWithGoogle}
          >
            {<GooleIcon width="1.8rem" />}
            <p className="text-base font-medium capitalize text-headingColor">
              Sign in with Google
            </p>
          </motion.div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
