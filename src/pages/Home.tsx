import React, { useState, useEffect, ChangeEvent } from "react";

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=10&query=${query}&client_id=2cKskRQ7DIMTiL0ugC_XvC9I6m6AdSsE2EuWPZtySoM`
        );
        const data = await response.json();

        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Type a keyword..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
            style={{ margin: "10px", maxWidth: "300px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
