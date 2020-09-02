import {FC, useState} from 'react';
import {Animation, Keyframes} from '../animation';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Button} from '../button';

interface CardProps {
  onClose: () => void;
  bgColor: string;
}

const Wrapper = styled.article<{ bgColor: string }>`
    padding: 10px;
    background: ${({bgColor}) => bgColor};
    border: 1px #333 solid;
    margin: 10px auto;
    width: 100%;
    box-sizing: border-box;
`;
export const Card: FC<CardProps> = props => {
  const {children, onClose, bgColor} = props;
  const [getShow, setShow] = useState<boolean>(true);
  const emitClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose()
    }, 300)
  }
  return <Animation
    show={getShow} onStarting enter={{keyframes: Keyframes.slideInFromLeft}}
    exit={{keyframes: Keyframes.fadeOut}}><Wrapper bgColor={bgColor}>
    <Flex justifyContent={['flex-end']}>
      <Button onClick={emitClose} style={{position: 'absolute'}}>X</Button>
    </Flex>
    {
      children
    }</Wrapper>
  </Animation>
}