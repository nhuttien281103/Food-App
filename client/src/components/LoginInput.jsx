import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeOutInput } from '@/animations';

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      {...fadeOutInput}
      className={`w-full flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-md rounded-md px-4 py-2 
      ${isFocus ? 'shadow-md shadow-red-600' : 'shadow-none'}`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor placeholder:font-normal text-lg font-medium border-none outline-none"
        value={inputState}
        onChange={inputStateFunc}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
