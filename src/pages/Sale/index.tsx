import React, { useState, useCallback } from 'react';
import { Button, CardBody, Heading, Text, Flex } from '@cardioswap/uikit';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import styled from 'styled-components'
import SaleInputPanel from 'components/SaleInputPanel';
import { CurrencyAmount, ETHER } from '@theogpepe/v2-sdk'; // Assuming that you have ETHER initialized properly
import ConnectWalletButton from 'components/ConnectWalletButton';
import { BottomGrouping, Wrapper } from 'components/swap/styleds';
import CardNav from 'components/CardNav';
import { RowBetween, RowFixed } from 'components/Row'
import { AutoColumn } from 'components/Column';
import Container from 'components/Container';
import { USDT } from 'constants/index';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { HoverCard } from 'components/PositionCard';
import { useSaleHooks, useBuyTokens, useClaimTokens } from './saleContract';
import AppBody from '../AppBody';

const Sale: React.FC = () => {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const [ethAmount, setEthAmount] = useState<string>('');
  const [pepeAmount, setPepeAmount] = useState<string>('');



  const { started, forSale, cap, totalSold, purchased, price, liquidityAdded } = useSaleHooks(account);

  const buyTokens = useBuyTokens(ethAmount, price)
  const claimTokens = useClaimTokens()

  const remainingForSale = Number(forSale) - Number(totalSold);

  const ethBalance = useCurrencyBalance(account ?? undefined, ETHER);
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(ethBalance);
  const atMaxAmountInput = Boolean(maxAmountInput && ethAmount === maxAmountInput.toExact());

  const isPlsBalanceZero = ethBalance?.toExact() === '0';
  const isPepeAmountExceeding = Number(pepeAmount) > Number(remainingForSale);


  const handleEthAmountChange = useCallback((value: string) => {
    setEthAmount(value);
    const pepeValue = (Number(value) / Number(price)).toString(); // Multiply the input value by 100
    setPepeAmount(pepeValue);
  }, [price]);

  const handlePepeAmountChange = useCallback((value: string) => {
    setPepeAmount(value);
    const ethValue = (Number(value) * Number(price)).toString(); // Divide the input value by 100
    setEthAmount(ethValue);
  }, [price]);


  const calculateMaxAmount = useCallback(async () => {
    if (!library || !account) return;

    const balance = await library.getBalance(account);
    const r = ethers.utils.formatEther(balance);
    setEthAmount(r);

    // Calculate pepeAmount based on the max ETH amount
    const pepeValue = (Number(r) / Number(price)).toString();
    setPepeAmount(pepeValue);
  }, [library, account, price]);



  const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`
  const Details = styled.div`
  flex: 1;
`


  return (
    <Container>
      <CardNav />
      <AppBody>
        <Wrapper id="swap-page">
          <StyledPageHeader>
            <Flex alignItems="center">
              <Details>
                <Heading mb="8px">BUY PEPE</Heading>
                <Text color="textSubtle" fontSize="14px">
                  PepeSwap (PEPE) Token Sale
                </Text>
              </Details>
            </Flex>
            </StyledPageHeader>
            <StyledPageHeader>
            <HoverCard>
            <AutoColumn gap="md">
              <RowBetween>
                ETH Cap:
                <RowFixed>
                  {cap ? parseInt(ethers.utils.formatUnits(cap, 18)) : 'Loading...'} ETH
                </RowFixed>
              </RowBetween>
              <RowBetween>
                For Sale:
                <RowFixed>
                  {forSale ? parseInt(ethers.utils.formatUnits(forSale, 18)) : 'Loading...'} PEPE
                </RowFixed>
              </RowBetween>
              <RowBetween>
                Total Sold:
                <RowFixed>
                {(Number(totalSold)/Number(forSale)*100).toFixed(2)}% = {totalSold ? parseInt(ethers.utils.formatUnits(totalSold, 18)) : 'Loading...'} PEPE
                </RowFixed>
              </RowBetween>
              <RowBetween>
                Price:
                <RowFixed>
                  {price ? price.toString() : 'Loading...'} PEPE/ETH
                </RowFixed>
              </RowBetween>
              <RowBetween>
                Purchased by you:
                <RowFixed>
                  {purchased ? ethers.utils.formatUnits(purchased, 18) : 'Loading...'}
                </RowFixed>
              </RowBetween>
              <Button
                  onClick={claimTokens}
                  disabled={!liquidityAdded}
                  variant="primary"
                  width="100%"
                >
                  Claim
                </Button>
            </AutoColumn>
          </HoverCard>
          </StyledPageHeader>
          <CardBody>
            <AutoColumn gap="md">
              <SaleInputPanel
                label="From (ETH)"
                value={ethAmount}
                onUserInput={handleEthAmountChange}
                onMax={calculateMaxAmount}
                showMaxButton={!atMaxAmountInput}
                currency={ETHER} // assuming ETHER is correctly initialized
                id="eth-input"
              />
              <SaleInputPanel
                label="To (Pepe)"
                value={pepeAmount}
                onUserInput={handlePepeAmountChange}
                showMaxButton={false}
                currency={USDT}
                id="pepe-output"
              />
            </AutoColumn>
            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : !started ? (
                <Button
                  disabled
                  variant="primary"
                  width="100%"
                >Sale Not Started
                </Button>
              ) : isPlsBalanceZero ? (
                <Button
                  disabled
                  variant="primary"
                  width="100%"
                >
                  Not enough ETH balance
                </Button>
              ) : isPepeAmountExceeding ? (
                <Button disabled
                  variant="primary"
                  width="100%">
                  Not enough PEPE available
                </Button>
              ) : (
                <Button
                  onClick={buyTokens}
                  disabled={isPlsBalanceZero}
                  variant="primary"
                  width="100%"
                >
                  Buy
                </Button>
              )}
            </BottomGrouping>
          </CardBody>
        </Wrapper>
      </AppBody>
    </Container>
  );
};

export default Sale;