import React from 'react';

const ImageCard = ({ image }) => {
  const nasaImage = (image.links[0].href);
  const nasaDescription = (image.data[0].description.toLowerCase());
  const nasaId = (image.data[0].nasa_id)
  const shortened = nasaDescription.slice(0, 99);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        key={nasaId}
        src={nasaImage}
        alt={nasaDescription}
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 mb-2">
          {(nasaDescription.length > 100)
            ? shortened + "..."
            : nasaDescription
          }
        </div>
      </div>
    </div>
  )

};

export default ImageCard;
