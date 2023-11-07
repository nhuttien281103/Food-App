import React, { useEffect } from 'react';
import { Helmet } from '@/components';
import { getAllProductApi } from '@/api/productApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const DBHome = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productsAll);

  useEffect(() => {
    if (!products) {
      dispatch(getAllProductApi());
    }
  }, [dispatch, products]);

  return (
    <Helmet title="Dashboard Home">
      <>Home Dashboard</>
    </Helmet>
  );
};

export default DBHome;
