import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Text, Button, Flex, Checkbox, Box } from '@cardioswap/uikit'

const defaultOnDismiss = () => null

const StyledCheckbox = styled(Checkbox)`
  min-width: 24px;
`

const StyledLabel = styled.label`
  cursor: pointer;
`

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.failure};
`

type UseAtRiskModalProps = {
  onDismiss?: () => void
}

const UseAtRiskModal = ({ onDismiss = defaultOnDismiss }: UseAtRiskModalProps) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)

  useEffect(() => {
    const preventClickHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      return false
    }

    document.querySelectorAll('[role="presentation"]').forEach((el) => {
      el.addEventListener('click', preventClickHandler, true)
    })

    return () => {
      document.querySelectorAll('[role="presentation"]').forEach((el) => {
        el.removeEventListener('click', preventClickHandler, true)
      })
    }
  }, [])

  return (
    <Modal onDismiss={onDismiss} title="Use under your own risk" hideCloseButton>
      <Box maxWidth="320px">
        <StyledLabel htmlFor="acknowledgement">
          <Flex alignItems="center" justifyContent="space-between">
            <StyledCheckbox
              id="acknowledgement"
              checked={isAcknowledged}
              onChange={() => setIsAcknowledged(!isAcknowledged)}
              scale="sm"
            />
            <Text ml="16px" color={isAcknowledged ? 'text' : 'textDisabled'}>
              I understand that CardioSwap frontend is in the initial stages of development and that no audit has been conducted, I trade under my own risk.
            </Text>
          </Flex>
        </StyledLabel>
        <StyledButton mt="24px" width="100%" variant="text" disabled={!isAcknowledged} onClick={onDismiss}>
          Continue to Trade Anyway
        </StyledButton>
      </Box>
    </Modal>
  )
}

export default UseAtRiskModal
