import {FC} from 'react';
import {
  Biome,
  BiomeCategories,
  BiomeCategory,
  Precipitation,
  Precipitations,
  TempModifier,
  TempModifiers
} from '../../interface/biome';
import {Card} from '../card/card';
import {LabelWrapper} from '../label-wrapper';
import {Select} from '../select/select';
import {InputLabel} from '../input/input-label';
import {parseInput} from '../../utils/math.utils';
import {BiomeEffectForm} from './biome-effect.form';

interface BiomeFormsProps {
  biome: Biome;
  onChange: (biome: Biome) => void;
  onClose: () => void;
}

export const BiomeForm: FC<BiomeFormsProps> = props => {
  const {onClose, biome, onChange} = props;
  return <Card bgColor={'#ccf'} onClose={onClose}>
    <InputLabel
      label={'Biome Name'}
      value={biome.name}
      onChange={e => onChange({...biome, name: e.target.value})}
    />
    <LabelWrapper
      label={'precipitation'}
      caption={'The type of precipitation found in this biome'}>
      <Select
        value={biome.precipitation === 'none' ? '' : biome.precipitation}
        options={Precipitations.slice(1).map(item => ({label: item, value: item}))}
        onSelected={value => onChange({...biome, precipitation: (value ? value : 'none') as Precipitation})
        }/>
    </LabelWrapper>
    <LabelWrapper
      label={'category'}>
      <Select
        value={biome.category === 'none' ? '' : biome.category}
        options={BiomeCategories.slice(1).map(item => ({
          label: item,
          value: item
        }))}
        onSelected={value => onChange({...biome, category: (value ? value : 'none') as BiomeCategory})
        }/>
    </LabelWrapper>
    <InputLabel
      label={'depth'}
      caption={'Used for terrain noise generation. Biomes with positive depth are considered land, biomes with negative depth are oceans.'}
      type={'number'}
      value={biome.depth}
      required
      onChange={e=>onChange({...biome,depth:parseInput(e.target.value)})}
    />
    <InputLabel
      label={'scale'}
      caption={'Used for terrain noise generation. Vertically stretches the terrain. Lower values produce flatter terrain.'}
      type={'number'}
      value={biome.scale}
      required
      onChange={e=>onChange({...biome,scale:parseInput(e.target.value)})}
    />
    <InputLabel
      label={'temperature'}
      caption={'Controls gameplay features like grass and foliage color and whether snow golems take damage.'}
      type={'number'}
      value={biome.temperature}
      required
      onChange={e=>onChange({...biome,temperature:parseInput(e.target.value)})}
    />
    <LabelWrapper
      label={'temperature_modifier'}>
      <Select
        value={biome.temperature_modifier === 'none' ? '' : biome.temperature_modifier}
        options={TempModifiers.slice(1).map(item => ({label: item, value: item}))}
        onSelected={value => onChange({...biome, temperature_modifier: (value ? value : 'none') as TempModifier})
        }/>
    </LabelWrapper>
    <InputLabel
      label={'downfall'}
      caption={'Controls grass and foliage color, a value above 0.85 also makes fire burn out faster.'}
      type={'number'}
      value={biome.downfall}
      required
      onChange={e=>onChange({...biome,downfall:parseInput(e.target.value)})}
    />
    <BiomeEffectForm biomeEffects={biome.effects} onChange={()=>{}}/>

  </Card>
}