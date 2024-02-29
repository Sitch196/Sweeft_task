// ImageModal.tsx
import React from "react";

interface Images {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  downloads: number;
  views: number;
  likes: number;
}

const ImageModal: React.FC<{ image: Images | null; onClose: () => void }> = ({
  image,
  onClose,
}) => {
  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex"
    >
      <div className="relative p-4 mx-auto max-w-full max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 m-4  bg-black px-3 py-[5px] rounded-full text-white cursor-pointer"
        >
          X
        </button>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="w-full h-[80vh] object-cover rounded-md"
        />
        <div className=" flex gap-4 text-white mt-4">
          <p>Likes: {image.likes}</p>
          <p>Views: {image.views || 156}</p>
          <p>Downloads: {image.downloads || 751}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
