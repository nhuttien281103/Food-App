import { deleteProductApi, getAllProductApi } from '@/api/productApi';
import { TableComponent } from '@/components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const columnsTableProduct = [
  {
    title: 'Image',
    field: 'imageURL',
    render: (rowData) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img src={rowData.imageURL} className="w-32 h-16 object-contain" />
    ),
  },
  { title: 'Name', field: 'product_name' },
  { title: 'Category', field: 'product_category' },
  {
    title: 'Price',
    field: 'product_price',
    render: (rowData) => (
      <p className="text-xl font-semibold text-textColor">
        {parseFloat(rowData.product_price).toFixed(2)}
      </p>
    ),
  },
];

const swalControl = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
};

const DBProduct = () => {
  const products = useSelector((state) => state.product.productsAll);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      dispatch(getAllProductApi());
    }
  }, [dispatch, products]);

  //! hanlde delete product
  const handleDeleteProduct = (rowData) => {
    return Swal.fire(swalControl).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductApi(rowData.product_id))
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            dispatch(getAllProductApi());
          })
          .catch((error) => {
            return Swal.fire('Deleted!', error.message, 'error');
          });
      }
    });
  };

  //! hanlde update product
  const handleUpdateProduct = (rowData) => {
    return Swal.fire(swalControl).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductApi(rowData.product_id))
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            dispatch(getAllProductApi());
          })
          .catch((error) => {
            return Swal.fire('Deleted!', error.message, 'error');
          });
      }
    });
  };

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <TableComponent
        title="All Products"
        columns={columnsTableProduct}
        data={JSON.parse(JSON.stringify(products))}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product',
            onClick: (event, rowData) => {
              handleUpdateProduct(rowData);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product',
            onClick: (event, rowData) => {
              handleDeleteProduct(rowData);
            },
          },
        ]}
      />
    </div>
  );
};

export default DBProduct;
