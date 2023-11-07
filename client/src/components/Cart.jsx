import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setModalCartClose } from '@/context/slices/cartSlice';
import { buttonClick, slideIn, staggerFadeOut } from '@/animations';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from 'react-redux';
import { formatPrice } from '@/utils/formatPrice';
import { getAllCartApi, updateItemQuantityCartApi } from '@/api/productApi';
import httpRequest from '@/utils/httpRequest';

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      // eslint-disable-next-line array-callback-return
      cart.map((data) => {
        tot = tot + data.product_price * data.product_quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  useEffect(() => {
    if (!cart && user) {
      dispatch(getAllCartApi(user.user_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleCheckOut = () => {
    httpRequest
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/products/create-checkout-session`,
      )
      .then((response) => {
        console.log(response);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-460 bg-cardOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 px-3">
        <motion.i
          {...buttonClick}
          className="cursor-pointer p-2"
          onClick={() => dispatch(setModalCartClose())}
        >
          <KeyboardDoubleArrowRightIcon className="!text-[30px] text-headingColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your card</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FilterAltIcon className="!text-[30px] text-textColor" />
        </motion.i>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start rounded-3xl bg-zinc-900 h-full py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart?.map((data, index) => (
                <CartItem key={index} data={data} index={index} />
              ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[60px] w-full h-[25%] flex flex-col items-center justify-center px-4 py-6 gap-3">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-2xl text-zinc-500 font-semibold">Total : </p>
                <p className="text-2xl text-orange-500 font-semibold">
                  {formatPrice.format(total)}
                </p>
              </div>
              <motion.button
                {...buttonClick}
                onClick={() => handleCheckOut()}
                className="bg-gradient-to-bl from-orange-400 to-orange-600 w-[70%] px-4 py-2 rounded-xl text-black text-lg font-semibold capitalize"
              >
                Checkout
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center w-full text-3xl text-primary font-bold">
              Empty cart
            </h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItem = ({ data, index }) => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [itemsTotal, setItemsTotal] = useState(0);

  useEffect(() => {
    setItemsTotal(data.product_price * data.product_quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsTotal, cart]);

  const handleIncrement = (productId) => {
    if (user) {
      updateItemQuantityCartApi(user.user_id, productId, 'increment').then(
        () => {
          dispatch(getAllCartApi(user?.user_id));
        },
      );
    }
  };
  const handleDecrement = (productId) => {
    if (user) {
      updateItemQuantityCartApi(user.user_id, productId, 'decrement').then(
        () => {
          dispatch(getAllCartApi(user.user_id));
        },
      );
    }
  };

  return (
    <motion.div
      key={index}
      {...staggerFadeOut}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data.imageURL}
        alt="Product"
        className="w-24 min-w-[64px] h-16 object-contain"
      />
      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-base text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm font-semibold text-red-400 ml-auto">
          {formatPrice.format(itemsTotal)}
        </p>
      </div>
      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => handleDecrement(data.product_id)}
          className="w-7 h-7 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-lg h-full font-semibold text-primary">-</p>
        </motion.div>
        <p className="text-lg font-semibold text-primary">
          {data?.product_quantity}
        </p>
        <motion.div
          {...buttonClick}
          onClick={() => handleIncrement(data.product_id)}
          className="w-7 h-7 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-lg h-full font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
