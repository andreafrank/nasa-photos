import React from 'react';

const ImageCard = ({ image }) => {
  const nasaImage = (image.links[0].href);
  const nasaDescription = (image.data[0].description);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        src={nasaImage}
        alt={nasaDescription}
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
             {nasaDescription}
        </div>
      </div>
    </div>
  )

};

export default ImageCard;
