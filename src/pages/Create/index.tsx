import React from 'react';

import styled from 'styled-components'
import { Heading, Text, Card, CardHeader, CardBody } from '@theogpepe/uikit'
import FoldableText from 'components/FoldableText'
import Container from 'components/Container';
import useI18n from 'hooks/useI18n'
import createInfo from './createInfo'

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
`

const Create = () => {

  const TranslateString = useI18n()

  return (
    <Wrapper>
    <Container>
      <Heading as="h2" size="xl" color="secondary" mb="24px">
        Create
      </Heading>
      <Text bold mb="24px">
        Launch your token on PepeX
      </Text>
      <Card>
        <CardHeader>
          <Text fontSize="24px" color="secondary" bold>
            FAQ
          </Text>
        </CardHeader>
        <CardBody>
          {createInfo.map(({ title, description }) => (
            <FoldableText
              key={title.fallback}
              id={title.fallback}
              mb="24px"
              title={TranslateString(title.id, title.fallback)}
            >
              {description.map(({ id, fallback }) => {
                return (
                  <Text key={fallback} color="textSubtle" as="p">
                    {TranslateString(id, fallback)}
                  </Text>
                )
              })}
            </FoldableText>
          ))}
        </CardBody>
      </Card>
    </Container>
    </Wrapper>
  );
};

export default Create;
