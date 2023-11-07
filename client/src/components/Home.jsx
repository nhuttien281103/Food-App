import React from 'react';
import { motion } from 'framer-motion';
import { delivery, heroBg } from '@/assets';
import { buttonClick, staggerFadeOut } from '@/animations';
import { randomDataProducts } from '@/utils/dummy';
import { formatPrice } from '@/utils/formatPrice';

const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500 capitalize">
            Free Delivery
          </p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary ">
            <img
              src={delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[40px] text-headingColor md:text-[62px] font-sans font-extrabold tracking-wider capitalize">
          The fastest delivery in{' '}
          <span className="text-orange-600">your city</span>
        </p>

        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          incidunt laboriosam tempora facilis esse? A placeat, optio, magni nam
          corrupti eius eveniet obcaecati odio dolores ea quisquam ipsum, neque
          sint?
        </p>

        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold capitalize"
        >
          Order now
        </motion.button>
      </div>
      <div className="py-2 flex-1 flex items-center justify-end relative">
        <img
          src={heroBg}
          alt="hero backgroud"
          className="absolute top-0 right-0 w-full h-420 md:w-auto md:h-650"
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomDataProducts &&
            randomDataProducts.map((data, index) => {
              return (
                <motion.div
                  key={index}
                  {...staggerFadeOut}
                  className="w-32 h-36 md:h-auto md:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={data.imageURL}
                    alt="Product"
                    className="w-12 h-12 md:w-28 md:h-28 md:-mt-16 object-contain"
                  />

                  <p className="text-sm lg:text-lg font-semibold text-textColor">
                    {data.product_name.slice(0, 14)}
                  </p>

                  <p className="text-[12px] text-center md:text-base text-lighttextGray font-normal capitalize">
                    {data.product_category}
                  </p>
                  <p className="text-sm font-semibold text-headingColor">
                    {formatPrice.format(data.product_price)}
                  </p>
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
