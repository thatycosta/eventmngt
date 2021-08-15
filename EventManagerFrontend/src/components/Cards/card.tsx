import React from 'react';
import styled from 'styled-components';
import { FaCommentAlt, FaThumbsUp, FaRegEye } from 'react-icons/fa';

import { Title, Date, Description, Action, StyledContainer} from './styles';

const Card = (props: any) => (
    <StyledContainer>
        <Title>The benefits of Green Apples</Title>
        <Date>3/2/2019</Date>
        <Description>
        Green apples have a high fiber content which helps in increasing the
      body's metabolism. While consuming an apple, make sure that you're not
      tossing the peel in the trash. Consuming apple with its peel improves the
      overall health. Due to its high fiber content, apple helps in
      detoxification process. It keeps the liver and digestive system away from
      harmful elements.
        </Description>
        <Action> <FaCommentAlt/> 0 Comments </Action>
        <Action> <FaThumbsUp/> 0 Likes </Action>
        <Action> <FaRegEye/> 0 Views </Action>
    </StyledContainer>
    )

export default Card;