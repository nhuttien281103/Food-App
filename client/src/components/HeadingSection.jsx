import React from 'react';

const HeadingSection = ({ title }) => {
  return (
    <>
      <p className="text-lg text-headingColor font-bold">{title}</p>
      <div className="w-48 h-1 rounded-md bg-orange-500"></div>
    </>
  );
};

export default HeadingSection;
