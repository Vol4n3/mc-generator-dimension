import {FC, useState} from 'react';
import styled from 'styled-components';
import {Button} from '../button';
import {Phase, KeyframesConfig} from '../phase';
import {Flex} from '../flex';

interface TagProps {
  onClose: () => void;
  label: string;
}

const Wrapper = styled.div`
  border: 1px #333 solid;
  padding: 5px;
  background: #333333;
  color: white;
  font-size: 0.85rem;
  width: 100%;
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
  return <Phase show={getShow} onStarting enter={{keyframes: KeyframesConfig.fadeIn}}
                exit={{keyframes: KeyframesConfig.fadeOut}}>
    <Wrapper title={label}>
        <Flex alignItems={['center']} noWrap>
          <span>{label}</span>
          <div style={{marginLeft: 'auto'}}>
            <Button onClick={emitClose}>X</Button>
          </div>
        </Flex>
    </Wrapper>
  </Phase>

}