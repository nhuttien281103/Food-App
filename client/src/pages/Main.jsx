import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Helmet from '@/components/Helmet';
import { Footer, Header } from '@/layouts';
import { getAllProductApi } from '@/api/productApi';
import { Cart, FilterSection, Home, HomeSlider } from '@/components';

const Main = () => {
  const products = useSelector((state) => state.product.productsAll);
  const dispatch = useDispatch();
  const isModalCart = useSelector((state) => state.cart.isModalCart);

  useEffect(() => {
    if (!products) {
      dispatch(getAllProductApi());
    }
  }, [dispatch, products]);

  return (
    <Helmet title="Home">
      <main className="w-screen min-h-screen flex flex-col items-center justify-start bg-primary">
        {/* Header component */}
        <Header />
        {/* content */}
        <div className="w-full flex flex-col items-start justify-center mt-32 px-6 md:px-24 2xl:px-95 gap-12 pb-24">
          <Home />
          <HomeSlider />
          <FilterSection />
        </div>
        {/* Footer component */}
        <Footer />
        {/* modal */}
        {isModalCart && <Cart />}
      </main>
    </Helmet>
  );
};

export default Main;
