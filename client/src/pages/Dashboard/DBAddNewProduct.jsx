import React, { useState } from 'react';
import { DeleteIcon, UploadIcon } from '@/components/Icons';
import { storage } from '@/configs/firebase.config';
import { statuses } from '@/utils/dummy';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { buttonClick } from '@/animations';
import { Progress } from '@/components';
import { addNewProduct, getAllProductApi } from '@/api/productApi';
import { useDispatch } from 'react-redux';

const DBAddNewProduct = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [progress, setProgress] = useState(null);

  //! hanlde upload imgae with firebase
  const handleUploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error(`Error : ${error.message}`);
        setIsLoading(false);
        setProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          toast.success('Image uploaded to the cloud');
        });
      },
    );
  };

  //! handle remove image with firebase
  const hanldeRemoveImage = () => {
    setIsLoading(true);
    const deteleRef = ref(storage, imageDownloadURL);

    deleteObject(deteleRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      toast.success('Image removed from the cloud');
    });
  };

  //! handle add new product with firebase
  const handleAddNewProduct = () => {
    const data = {
      product_name: name,
      product_price: price,
      product_category: category,
      imageURL: imageDownloadURL,
    };

    //! method add product
    addNewProduct(data)
      .then((res) => {
        toast.success('Product added successfully');
        setName('');
        setPrice('');
        setCategory(null);
        setImageDownloadURL(null);
      })
      .catch((error) => {
        toast.error(`Error : ${error.message}`);
      });
    dispatch(getAllProductApi());
  };

  return (
    <div className="flex items-center justify-center flex-col px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder="Product name here..."
          stateValue={name}
          stateFunc={setName}
        />

        <div className="flex items-center justify-around gap-3 flex-wrap w-full">
          {statuses &&
            statuses?.map((data) => (
              <p
                onClick={() => setCategory(data.category)}
                key={data.id}
                className={`px-4 py-1 rounded-md text-lg text-textColor font-medium cursor-pointer hover:bg-red-500 hover:text-white border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? 'bg-red-500 text-white'
                    : 'bg-transparent'
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValueField
          type="text"
          placeHolder="Product price here..."
          stateValue={price}
          stateFunc={setPrice}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              Loading...
              <Progress value={progress} />
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center cursor-pointer">
                        <p className="font-bold text-3xl">
                          <UploadIcon className="-rotate-0 text-textColor" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.2 }}
                      src={imageDownloadURL}
                      className="w-full h-full object-contain"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3  text-white flex items-center justify-center h-12 w-12 rounded-full bg-red-500 text-lg cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => hanldeRemoveImage(imageDownloadURL)}
                    >
                      <DeleteIcon width="1.6rem" className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          {...buttonClick}
          onClick={handleAddNewProduct}
          className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-2 bg-cardOverlay outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBAddNewProduct;
