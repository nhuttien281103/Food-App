import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeadingSection } from '.';
import { staggerFadeOut } from '@/animations';
import { statuses } from '@/utils/dummy';
import { useSelector } from 'react-redux';
import SliderCard from './SliderCard';

const FilterSection = () => {
  const products = useSelector((state) => state.product.productsAll);
  const [category, setCategory] = useState('fruits');

  return (
    <motion.div className="w-full flex items-center justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <HeadingSection title={'Our Hot Dishes'} />
        </div>
      </div>

      <div className="w-full pt-6 flex items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, index) => {
            return (
              <FilterCard
                key={index}
                data={data}
                index={index}
                category={category}
                setCategory={setCategory}
              />
            );
          })}
      </div>

      <div className="w-full flex items-center justify-evenly flex-wrap gap-6 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, index) => (
              <SliderCard key={index} data={data} index={index} />
            ))}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...staggerFadeOut}
      onClick={() => setCategory(data.category)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-3 mt-6 ${
        category === data.category ? 'bg-red-500' : 'bg-white'
      } hover:bg-red-500 flex flex-col items-center justify-center gap-4`}
    >
      <p
        className={`text-xl font-semibold ${
          category === data.category ? 'text-white' : 'text-red-500'
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
