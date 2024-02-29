// Home.tsx
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { fetchAndCacheImages } from "../utils/fetchAndCacheImages";
import ImageModal from "../components/ImageModal";
import { useSearchHistoryStore } from "../store/searchHistoryStore";

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  downloads?: number;
  views?: number;
  likes?: number;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastImageRef = useRef<HTMLImageElement | null>(null);
  const addToSearchHistory = useSearchHistoryStore(
    (state) => state.addToSearchHistory
  );

  const fetchImages = async (searchQuery: string) => {
    let data;

    if (searchQuery) {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=20&query=${searchQuery}&client_id=2cKskRQ7DIMTiL0ugC_XvC9I6m6AdSsE2EuWPZtySoM`
      );
      data = await response.json();
    } else {
      const popularImages = await fetchAndCacheImages(currentPage);
      data = popularImages.map((image) => ({
        ...image,
        id: `${image.id}_${Date.now()}`,
      }));
    }

    setImages(data);
    localStorage.setItem(`cachedImages_${searchQuery}`, JSON.stringify(data));
    addToSearchHistory(searchQuery);
  };

  const fetchMoreImages = async () => {
    setCurrentPage((prev) => prev + 1);

    const newImages = await fetchAndCacheImages(currentPage);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  console.log(currentPage);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    fetchImages(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMoreImages();
      }
    }, options);

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }

    return () => observer.disconnect();
  }, [images]);

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
        {images?.map((image, index) => {
          if (index === images.length - 1) {
            return (
              <img
                ref={lastImageRef}
                key={image.id}
                src={image.urls.regular}
                alt={image.alt_description}
                className="w-full h-[250px] object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
            );
          } else {
            return (
              <img
                key={image.id}
                src={image.urls.regular}
                alt={image.alt_description}
                className="w-full h-[250px] object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
            );
          }
        })}
      </div>

      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
