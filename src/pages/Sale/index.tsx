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
  const [cardioAmount, setCardioAmount] = useState<string>('');



  const { started, forSale, cap, totalSold, purchased, price, liquidityAdded } = useSaleHooks(account);

  const buyTokens = useBuyTokens(ethAmount, price)
  const claimTokens = useClaimTokens()

  const remainingForSale = Number(forSale) - Number(totalSold);

  const plsBalance = useCurrencyBalance(account ?? undefined, ETHER);
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(plsBalance);
  const atMaxAmountInput = Boolean(maxAmountInput && ethAmount === maxAmountInput.toExact());

  const isPlsBalanceZero = plsBalance?.toExact() === '0';
  const isCardioAmountExceeding = Number(cardioAmount) > Number(remainingForSale);


  const handleEthAmountChange = useCallback((value: string) => {
    setEthAmount(value);
    const cardioValue = (Number(value) / Number(price)).toString(); // Multiply the input value by 100
    setCardioAmount(cardioValue);
  }, [price]);

  const handleCardioAmountChange = useCallback((value: string) => {
    setCardioAmount(value);
    const ethValue = (Number(value) * Number(price)).toString(); // Divide the input value by 100
    setEthAmount(ethValue);
  }, [price]);


  const calculateMaxAmount = useCallback(async () => {
    if (!library || !account) return;

    const balance = await library.getBalance(account);
    const ethBalance = ethers.utils.formatEther(balance);
    setEthAmount(ethBalance);

    // Calculate cardioAmount based on the max ETH amount
    const cardioValue = (Number(ethBalance) / Number(price)).toString();
    setCardioAmount(cardioValue);
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
                <Heading mb="8px">BUY CARDIO</Heading>
                <Text color="textSubtle" fontSize="14px">
                  CardioSwap (CARDIO) Token Sale
                </Text>
              </Details>
            </Flex>
            </StyledPageHeader>
            <StyledPageHeader>
            <HoverCard>
            <AutoColumn gap="md">
              <RowBetween>
                PLS Cap:
                <RowFixed>
                  {cap ? parseInt(ethers.utils.formatUnits(cap, 18)) : 'Loading...'} PLS
                </RowFixed>
              </RowBetween>
              <RowBetween>
                For Sale:
                <RowFixed>
                  {forSale ? parseInt(ethers.utils.formatUnits(forSale, 18)) : 'Loading...'} CARDIO
                </RowFixed>
              </RowBetween>
              <RowBetween>
                Total Sold:
                <RowFixed>
                {(Number(totalSold)/Number(forSale)*100).toFixed(2)}% = {totalSold ? parseInt(ethers.utils.formatUnits(totalSold, 18)) : 'Loading...'} CARDIO
                </RowFixed>
              </RowBetween>
              <RowBetween>
                Price:
                <RowFixed>
                  {price ? price.toString() : 'Loading...'} CARDIO/PLS
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
                label="From (PLS)"
                value={ethAmount}
                onUserInput={handleEthAmountChange}
                onMax={calculateMaxAmount}
                showMaxButton={!atMaxAmountInput}
                currency={ETHER} // assuming ETHER is correctly initialized
                id="eth-input"
              />
              <SaleInputPanel
                label="To (Cardio)"
                value={cardioAmount}
                onUserInput={handleCardioAmountChange}
                showMaxButton={false}
                currency={USDT}
                id="cardio-output"
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
                  Not enough PLS balance
                </Button>
              ) : isCardioAmountExceeding ? (
                <Button disabled
                  variant="primary"
                  width="100%">
                  Not enough CARDIO available
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