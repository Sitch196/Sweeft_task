interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

export const fetchAndCacheImages = async (): Promise<Image[]> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=20&order_by=popularity&client_id=2cKskRQ7DIMTiL0ugC_XvC9I6m6AdSsE2EuWPZtySoM`
    );
    const data = await response.json();

    localStorage.setItem(`cachedImages_`, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
