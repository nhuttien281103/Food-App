import React from 'react';
import { motion } from 'framer-motion';
import { buttonClick } from '@/animations';
import { useNavigate } from 'react-router-dom';

const CheckOutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      CheckOutSuccess
      <motion.button {...buttonClick} onClick={() => navigate('/')}>
        Go home page
      </motion.button>
    </div>
  );
};

export default CheckOutSuccess;
