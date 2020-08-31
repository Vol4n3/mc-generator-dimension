import {FC, useState} from 'react';
import styled from 'styled-components';
import {Button} from '../button';
import {Animation, Keyframes} from '../animation';
import {Flex} from '../flex';

interface TagProps {
  onClose: () => void;
  label: string;
}

const Wrapper = styled.div`
  border: 1px #333 solid;
  padding: 5px;
  background: #333;
  color: white;
  display: inline-block;
  font-size: 0.85rem;
  width: 170px;
  `;
const Ellipsis = styled.div`
  width: 150px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`;
export const Tag: FC<TagProps> = props => {
  const {onClose, label} = props;
  const [getShow, setShow] = useState<boolean>(true)
  const emitClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }
  return <Animation show={getShow} onStarting enter={{keyframes:Keyframes.fadeIn}} exit={{keyframes:Keyframes.fadeOut}}>
    <Wrapper title={label}>
      <Flex alignItems={['center']} justifyContent={['space-between']} noWrap>
        <Ellipsis>{label}</Ellipsis>
      <div style={{marginLeft: 'auto'}}>
        <Button onClick={emitClose}>X</Button>
      </div>
      </Flex>
    </Wrapper>
  </Animation>

}