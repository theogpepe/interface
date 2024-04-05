import { useEffect, useState } from 'react';

type ApiResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      token_prices: {
        [key: string]: string;
      };
    };
  };
};

const api = 'https://api.geckoterminal.com/api/v2/simple/networks/eth/token_price/0x4dFae3690b93c47470b03036A17B23C1Be05127C';

const useGetPepePrice = () => {
  const [price, setPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const res: ApiResponse = await response.json();

        const pepePrice = parseFloat(res.data.attributes.token_prices['0x4dfae3690b93c47470b03036a17b23c1be05127c']);
        setPrice(pepePrice);
      } catch (error) {
        console.error('Unable to fetch price data:', error);
      }
    };

    fetchData();
  }, []);

  return price; // Returns just the number or undefined
};

export default useGetPepePrice;
