/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { formatPrice } from '@/utils/formatPrice';
import { motion } from 'framer-motion';
import { buttonClick } from '@/animations';
import { ShoppingBasketRounded } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCartApi } from '@/api/productApi';
import { useDispatch } from 'react-redux';

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = () => {
    console.log(user);
    if (!user) {
      navigate('/login', { replace: true });
    } else {
      dispatch(createCartApi(user.uid, data)).then(() => alert('Success'));
    }
  };

  return (
    <div className="bg-cardOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <img
        src={data.imageURL}
        alt="Image Product"
        className="w-40 h-40 object-contain"
      />

      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          {formatPrice.format(data.product_price)}
        </p>

        <motion.div
          {...buttonClick}
          onClick={addToCart}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <ShoppingBasketRounded className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
