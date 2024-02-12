

import React, { useState, useCallback } from 'react';
import { Input, Button } from '@theogpepe/uikit'; // Ensure these components are correctly imported
import Container from 'components/Container';
import styled from 'styled-components';
import DoubleCurrencyLogo from 'components/DoubleLogo';
import { ETHER } from '@theogpepe/v2-sdk';
import { PEPE } from 'constants/index';


const poolPairs = {
  "ETH/PEPE": "0x5Cd98FdCF62dC69B7d8307837C73a50759772538",  // Example address
  "ETH/WOJAK": "0x115f10B50314677f8e50189Ff588533873e867E7", // More pairs
  // Add more pairs as needed
};



const PoolChartComponent = () => {
  const [poolAddress, setPoolAddress] = useState('');
  const [showList, setShowList] = useState(false);

  const handlePoolAddressChange = useCallback((event) => {
    setPoolAddress(event.target.value);
  }, []);

  const toggleList = () => {
    setShowList(!showList);
  };

  const selectPool = (address) => {
    setPoolAddress(address);
    setShowList(false); // Optionally close the list after selection
  };

  const getChartUrl = () => {
    return `https://www.dextools.io/widget-chart/es/ether/pe-light/${poolAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false`;
  };

  const handleKeyDown = (event, address) => {
    if (event.key === 'Enter') {
      selectPool(address);
    }
  };

  const PoolList = styled.div`
  /* Styles for the pool list container */
  margin-top: 10px;
`;

const PoolItem = styled.div`
  /* Styles for each pool item */
  padding: 8px 10px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;


  return (
    <Container>
          {/* ... */}


      <Button onClick={toggleList}>Toggle Pool List</Button>
      {showList && (
        <PoolList>
        {Object.entries(poolPairs).map(([name, address]) => (
          <PoolItem
            key={address}
            onClick={() => selectPool(address)}
            onKeyDown={(event) => handleKeyDown(event, address)}
            role="button"
            tabIndex={0}
          >
            {name}
            <DoubleCurrencyLogo currency0={ETHER} currency1={PEPE} />
          </PoolItem>
        ))}
      </PoolList>
  )}
      <Input
        value={poolAddress}
        onChange={handlePoolAddressChange}
        placeholder="Enter Pool Address"
      />
      {poolAddress && (
        <iframe
          title="DEXTools Trading Chart"
          width="500"
          height="400"
          src={getChartUrl()}
        />
      )}
    </Container>
  )
};



export default PoolChartComponent;
