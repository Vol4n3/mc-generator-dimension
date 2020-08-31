import {Dimension, DimensionGenerator, DimensionGeneratorType} from '../../interface/dimension';
import {FC, useState} from 'react';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Button} from '../button';
import {RadioGroup} from '../radio-group';
import {Animation, Keyframes} from '../animation';
import {NoiseForm} from './noise.form';
import {generateSeed} from '../../utils/math.utils';

export interface DimensionFormProps {
  dimension: Dimension;
  onChange: (d: Dimension) => void;
  onRemove: () => void;
}

const Wrapper = styled.article`
    padding: 10px;
    background: #eee;
    border: 1px #333 solid;
    margin: 10px auto;
    width: 100%;
    box-sizing: border-box;
`;

export const DimensionForm: FC<DimensionFormProps> = props => {
  const {dimension, onChange, onRemove} = props;
  const [getShow, setShow] = useState<boolean>(true);
  const [getHistoricFlat,setHistoricFlat] = useState<DimensionGenerator>(dimension.generator)
  const [getHistoricNoise,setHistoricNoise] = useState<DimensionGenerator>(dimension.generator)
  const emitClose = () => {
    setShow(false);
    setTimeout(() => {
      onRemove()
    }, 300)
  }
  const emitChangeGenerator = (g: DimensionGenerator)=>{
    const dim = {...dimension, generator: g};
    if(g.type === 'minecraft:flat'){
      setHistoricFlat(g);
    }
    if(g.type === 'minecraft:noise'){
      setHistoricNoise(g);
    }
    onChange(dim)
  }
  const changeGeneratorType = (type: DimensionGeneratorType) => {
    let generator: DimensionGenerator;
    if (type === 'minecraft:flat') {
      generator = {
          settings: getHistoricFlat.settings ,
          seed: getHistoricFlat.seed,
          type
      }
    } else {
      generator = {
        type,
        biome_source: getHistoricNoise.biome_source || {
          seed : generateSeed(),
        },
        settings: getHistoricNoise.settings,
        seed:getHistoricNoise.seed
      }
    }
    onChange({...dimension, generator});

  }
  return <Animation
    show={getShow} onStarting enter={{keyframes: Keyframes.slideInFromLeft}}
    exit={{keyframes: Keyframes.fadeOut}}>
    <Wrapper>
      <Flex justifyContent={['flex-end']}>
        <Button onClick={emitClose} style={{position:'absolute'}}>X</Button>
      </Flex>
      <LabelWrapper label={'Dimension Name'}>
        <Input
          value={dimension.name || ''}
          required
          onChange={(e) => onChange({...dimension, name: e.target.value})}/>
      </LabelWrapper>
      <LabelWrapper label={'dimension Type'} caption={'you can choose vanilla preset or create one'}>
        <Input
          onChange={e => onChange({...dimension, type: e.target.value})}
          list={'dimension_type'}
          value={dimension.type}
          required/>
      </LabelWrapper>
      <LabelWrapper label={'Type de générateur'}>
        <RadioGroup<DimensionGeneratorType>
          name={'generator'}
          options={[
            {value: 'minecraft:noise', label: 'Noise Dimension'},
            {value: 'minecraft:flat', label: 'Flat Dimension'}
          ]}
          required
          selected={dimension.generator.type}
          onChecked={changeGeneratorType}/>
      </LabelWrapper>
      {
        dimension.generator.type === 'minecraft:noise' && <NoiseForm
          generator={dimension.generator}
          onChange={emitChangeGenerator}/>
      }
      {
        dimension.generator.type === 'minecraft:flat' && <div>flat</div>
      }
    </Wrapper>
  </Animation>
};