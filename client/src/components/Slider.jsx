import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { getAllProductApi } from '@/api/productApi';
import { useDispatch } from 'react-redux';

// Import Swiper styles
import 'swiper/css';
import '@/css/swiperStyle.css';
import SliderCard from './SliderCard';

const Slider = () => {
  const products = useSelector((state) => state.product.productsAll);
  const dispatch = useDispatch();
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    // Get all products
    if (!products) {
      dispatch(getAllProductApi());
    }
    // The type of filtered product is fruit
    setFruits(products?.filter((data) => data.product_category === 'fruits'));
  }, [dispatch, products]);

  return (
    <div className="w-full pt-12">
      <Swiper
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, index) => (
            <SwiperSlide key={index}>
              <SliderCard data={data} index={index} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
