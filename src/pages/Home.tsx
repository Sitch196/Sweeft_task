import React, { useState, useEffect, ChangeEvent } from "react";
import { fetchAndCacheImages } from "../utils/fetchAndCacheImages";

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async (searchQuery: string) => {
    let data;

    if (searchQuery) {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=20&query=${searchQuery}&client_id=2cKskRQ7DIMTiL0ugC_XvC9I6m6AdSsE2EuWPZtySoM`
      );
      data = await response.json();
    } else {
      const popularImages = await fetchAndCacheImages();
      data = popularImages;
    }

    setImages(data);
    localStorage.setItem(`cachedImages_${searchQuery}`, JSON.stringify(data));
  };

  useEffect(() => {
    fetchImages(query);
  }, [query]);

  return (
    <div className="container mx-auto mt-8 p-3">
      <input
        type="text"
        placeholder="Type a keyword..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="w-full p-2 border border-gray-300 rounded-md indent-3"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {images?.map((image) => (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            className="w-full h-[250px] object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
