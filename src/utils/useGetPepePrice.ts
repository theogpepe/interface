import { useState, useEffect } from 'react';

const useGetPepePrice = () => {
  const [price, setPrice] = useState<number | 0>();

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://app.geckoterminal.com/api/p1/eth/pools/0xa84181f223a042949e9040e42b44c50021802db6');
        const data = await response.json();
        setPrice(data.data.attributes.price_in_usd);
      } catch (error) {
        console.error('Error fetching PEPE price:', error);
        setPrice(0); // Set to undefined in case of an error
      }
    };

    fetchPrice();
  }, []);

  return price;
};

export default useGetPepePrice;
