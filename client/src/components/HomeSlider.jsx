import React from 'react';
import { motion } from 'framer-motion';
import { HeadingSection } from '.';
import Slider from './Slider';

const HomeSlider = () => {
  return (
    <motion.div className="w-full flex items-center justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <HeadingSection title={'Our Fresh & Healthy Fruits'} />
        </div>
      </div>
      {/* Slider swiper */}
      <Slider />
    </motion.div>
  );
};

export default HomeSlider;
