import {Dimension, DimensionGeneratorType} from '../../interface/dimension';
import {FC, useState} from 'react';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Button} from '../button';
import {RadioGroup} from '../radio-group';
import {Keyframes, Animation} from '../animation';

export interface DimensionFormProps {
  dimension: Dimension;
  onChange: (d: Dimension) => void;
  dimensionsTypes: string[];
  onRemove: () => void;
}

const Wrapper = styled.article`
    padding: 10px;
    background: lightblue;
    border: 1px #ccc solid;
    margin: 10px auto;
`;
export const DimensionForm: FC<DimensionFormProps> = props => {
  const {dimension, onChange, onRemove} = props;
  const [getShow, setShow] = useState<boolean>(true);
  const [getGeneratorType, setGeneratorType] = useState<DimensionGeneratorType>();
  const emitClose = () => {
    setShow(false);
    setTimeout(() => {
      onRemove()
    }, 300)
  }
  return <Animation
    show={getShow} onStarting enter={{keyframes: Keyframes.slideInFromTop}}
    exit={{keyframes: Keyframes.fadeOut}}><Wrapper>
    <Flex justifyContent={['flex-end']}>
      <Button onClick={emitClose}>X</Button>
    </Flex>
    <LabelWrapper label={'Dimension Name'}>
      <Input
        value={dimension.name || ''}
        required
        onChange={(e) => onChange({...dimension, name: e.target.value})}/>
    </LabelWrapper>
    <LabelWrapper label={'Type de générateur'}>
      <RadioGroup<DimensionGeneratorType>
        name={'generator'}
        options={[
          {value: 'minecraft:flat', label: 'Flat'},
          {value: 'minecraft:noise', label: 'Noise'}
        ]}
        selected={getGeneratorType}
        onChecked={(e) => setGeneratorType(e)}/>
    </LabelWrapper>
    {
      getGeneratorType === 'minecraft:noise' && <></>
    }
    {
      getGeneratorType === 'minecraft:flat' && <></>
    }
  </Wrapper>
  </Animation>
};