import {Dimension, DimensionGeneratorType} from '../../interface/dimension';
import {FC, useState} from 'react';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Button} from '../button';
import {RadioGroup} from '../radio-group';
import {Animation, Keyframes} from '../animation';
import {generateSeed} from '../../utils/math.utils';
import {NoiseForm} from './noise.form';
import {Select} from '../select/select';

export interface DimensionFormProps {
  dimension: Dimension;
  onChange: (d: Dimension) => void;
  dimensionsTypes: string[];
  noiseSettings: string[];
  onRemove: () => void;
}

const Wrapper = styled.article`
    padding: 10px;
    background: #eee;
    border: 1px #333 solid;
    margin: 10px auto;
`;

export const DimensionForm: FC<DimensionFormProps> = props => {
  const {dimension, onChange, onRemove, dimensionsTypes, noiseSettings} = props;
  const [getShow, setShow] = useState<boolean>(true);
  const emitClose = () => {
    setShow(false);
    setTimeout(() => {
      onRemove()
    }, 300)
  }
  const changeGeneratorType = (type: DimensionGeneratorType) => {
    let generator = {...dimension.generator, type};
    if (type === 'minecraft:flat') {
      generator = {
        ...generator,
        settings: {
          biome: '',
          features: [],
          layers: [],
          structures: {}
        }
      }
    } else {
      generator = {
        ...generator,
        biome_source: {
          seed: generateSeed(),
        },
        settings: ''
      }
    }
    onChange({...dimension, generator})
  }
  return <Animation
    show={getShow} onStarting enter={{keyframes: Keyframes.slideInFromTop}}
    exit={{keyframes: Keyframes.fadeOut}}>
    <Wrapper>
      <Flex justifyContent={['flex-end']}>
        <Button onClick={emitClose}>X</Button>
      </Flex>
      <LabelWrapper label={'Dimension Name'}>
        <Input
          value={dimension.name || ''}
          required
          onChange={(e) => onChange({...dimension, name: e.target.value})}/>
      </LabelWrapper>
      <LabelWrapper label={'dimension Type'}>
        <Select
          onSelected={e => onChange({...dimension, type: e})}
          options={dimensionsTypes.map((d) => ({
            label: d.replace('minecraft:', ''),
            value: d
          }))}
          value={dimension.type}
          required/>
      </LabelWrapper>
      <LabelWrapper label={'Type de générateur'}>
        <RadioGroup<DimensionGeneratorType>
          name={'generator'}
          options={[
            {value: 'minecraft:flat', label: 'Flat'},
            {value: 'minecraft:noise', label: 'Noise'}
          ]}
          required
          selected={dimension.generator.type}
          onChecked={changeGeneratorType}/>
      </LabelWrapper>
      {
        dimension.generator.type === 'minecraft:noise' && <NoiseForm
          generator={dimension.generator}
          onChange={e => onChange({...dimension, generator: e})}
          noiseSettings={noiseSettings}/>
      }
      {
        dimension.generator.type === 'minecraft:flat' && <div>flat</div>
      }
    </Wrapper>
  </Animation>
};