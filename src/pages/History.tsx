// History.tsx
import React, { useState } from "react";
import { useSearchHistoryStore } from "../store/searchHistoryStore"; // Import the store

const History: React.FC = () => {
  const searchHistory = useSearchHistoryStore((state) => state.searchHistory);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const handleQueryClick = (query: string) => {
    setSelectedQuery((prevQuery) => (prevQuery === query ? null : query));
  };

  return (
    <div className="container mx-auto mt-8 p-3">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      <ul className="space-y-2">
        {searchHistory.map((query, index) => (
          <li
            key={index}
            className="cursor-pointer text-blue-500"
            onClick={() => handleQueryClick(query)}
          >
            {query}
          </li>
        ))}
      </ul>

      {selectedQuery && (
        <div className="mt-4 grid grid-cols-5 gap-4">
          {/* Retrieve images from local storage based on the selected query */}
          {JSON.parse(
            localStorage.getItem(`cachedImages_${selectedQuery}`) || "[]"
          ).map((image: any, index: number) => (
            <img
              key={index}
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-[100px] object-cover rounded-md cursor-pointer"
              onClick={() => setSelectedQuery(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
