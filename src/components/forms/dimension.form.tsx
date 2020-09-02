import {Dimension, DimensionGenerator, DimensionGeneratorType, FlatSettings} from '../../interface/dimension';
import {FC, useState} from 'react';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import {RadioGroup} from '../radio-group';
import {NoiseForm} from './noise.form';
import {generateSeed} from '../../utils/math.utils';
import {Card} from '../card/card';
import {FlatSettingsForm} from './flat-settings.form';

export interface DimensionFormProps {
  dimension: Dimension;
  onChange: (d: Dimension) => void;
  onRemove: () => void;
}


export const DimensionForm: FC<DimensionFormProps> = props => {
  const {dimension, onChange, onRemove} = props;
  const [getHistoricFlat, setHistoricFlat] = useState<DimensionGenerator>(dimension.generator)
  const [getHistoricNoise, setHistoricNoise] = useState<DimensionGenerator>(dimension.generator)
  const emitChangeGenerator = (g: DimensionGenerator) => {
    const dim = {...dimension, generator: g};
    if (g.type === 'minecraft:flat') {
      setHistoricFlat(g);
    }
    if (g.type === 'minecraft:noise') {
      setHistoricNoise(g);
    }
    onChange(dim)
  }
  const changeGeneratorType = (type: DimensionGeneratorType) => {
    let generator: DimensionGenerator;
    if (type === 'minecraft:flat') {
      generator = {
        settings: getHistoricFlat.settings,
        seed: getHistoricFlat.seed,
        type
      }
    } else {
      generator = {
        type,
        biome_source: getHistoricNoise.biome_source || {
          seed: generateSeed(),
        },
        settings: getHistoricNoise.settings,
        seed: getHistoricNoise.seed
      }
    }
    onChange({...dimension, generator});

  }
  return <Card onClose={onRemove} bgColor={'#cdc'}>
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
      dimension.generator.type === 'minecraft:flat' &&
      <FlatSettingsForm
        onChange={()=>{}} settings={dimension.generator.settings as FlatSettings}/>
    }
  </Card>
};