import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';

const StyledChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const poolAddresses = {
    "Chart 1": "0xf532da4460c965379593d38f89afae437fb54700",
    "Chart 2": "0xcd81efdcd5ee3befbadcf46cef1b4c0bf7b40df0",
    "Chart 3": "0xb49fc8db708db20337d211fd5c5be6a8f3f7a6d4",
    "Chart 4": "0x87a7efae1661c0c0acd4b857186eb2b8ca5b89f1",
    "Chart 5": "0xd6a74e770fa71967b97186d9d59ce633627bffaa"
};

const ChadIndex = () => {
  const getChartUrl = (address: string) => {
    return `https://www.dextools.io/widget-chart/es/ether/pe-light/${address}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false`;
  };

  return (
    <Container>
      <StyledChartsContainer>
        {Object.entries(poolAddresses).map(([label, address]) => (
        <iframe
        title={`DEXTools Trading Chart - ${label}`}
        width="500"
        height="400"
        src={getChartUrl(address)}      />
        ))}
      </StyledChartsContainer>
    </Container>
  );
};

export default ChadIndex;
