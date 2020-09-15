import {FC} from 'react';
import {
  Biome,
  BiomeCategories,
  BiomeCategory,
  Precipitation,
  Precipitations,
  StructureFeatures,
  SurfaceBuilders,
  TempModifier,
  TempModifiers
} from '../../../interface/biome';
import {Card} from '../../card/card';
import {LabelWrapper, LabelWrapperCaption} from '../../label-wrapper';
import {Select} from '../../select/select';
import {InputLabel} from '../../input/input-label';
import {parseInput} from '../../../utils/math.utils';
import {BiomeEffectForm} from './biome-effect.form';
import {BiomeCarversForm} from './biome-carvers.form';
import {BiomeFeaturesForm} from './biome-features.form';
import {MultiSelect} from '../../multi-select/multi-select';
import {InputCheckboxLabel} from '../../input/input-checkbox-label';
import {BiomeSpawnerForm} from './biome-spawner.form';
import {InputSelect} from '../../select/input-select';

interface BiomeFormsProps {
  biome: Biome;
  onChange: (biome: Biome) => void;
  onClose: () => void;
}

export const BiomeForm: FC<BiomeFormsProps> = props => {
  const {onClose, biome, onChange} = props;
  return <Card bgColor={'#eef'} onClose={onClose}>
    <InputLabel
      label={'Biome Name'}
      value={biome.name}
      required
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
      <LabelWrapperCaption>
        Any biomes in the category
        <ul>
          <li>ocean will be considered part of the ocean temperature category; other temperature categories are
            controlled by the biome's temperature value. This means that biomes in the ocean category should typically
            be placed near each other.
          </li>
          <li>Biomes in the categories ocean and river will play the underwater music instead of their normal music when
            the player is underwater.
          </li>
          <li>Zombie sieges and patrols will not spawn in biomes in the category mushroom.</li>
          <li>Rabbits spawning in biomes in the category desert will always have the desert skin, unless they are in a
            biome with precipitation set to snow.
          </li>
          <li>Mobs in the water_ambient category spawn much less often in biomes in the category river.</li>
          <li>Ocean monuments will not spawn in any biome which isn't in the category ocean or river.</li>
        </ul>
      </LabelWrapperCaption>
    </LabelWrapper>
    <InputLabel
      label={'depth'}
      caption={'Used for terrain noise generation. Biomes with positive depth are considered land, biomes with negative depth are oceans.'}
      type={'number'}
      step={0.1}
      value={biome.depth}
      required
      onChange={e => onChange({...biome, depth: parseInput(e.target.value)})}
    />
    <InputLabel
      label={'scale'}
      caption={'Used for terrain noise generation. Vertically stretches the terrain. Lower values produce flatter terrain.'}
      type={'number'}
      value={biome.scale}
      required
      onChange={e => onChange({...biome, scale: parseInput(e.target.value)})}
    />
    <InputLabel
      label={'temperature'}
      caption={'Controls gameplay features like grass and foliage color and whether snow golems take damage.'}
      type={'number'}
      value={biome.temperature}
      required
      onChange={e => onChange({...biome, temperature: parseInput(e.target.value)})}
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
      onChange={e => onChange({...biome, downfall: parseInput(e.target.value)})}
    />
    <BiomeEffectForm biomeEffects={biome.effects} onChange={(biomeEffects) => {
      onChange({...biome, effects: biomeEffects})
    }}/>
    <InputSelect
      label={'surface_builder'}
      caption={'The namespaced id of the configured surface builder to use.'}
      options={SurfaceBuilders}
      uid={'surface_builder'}
      value={biome.surface_builder}
      onChange={(v) => onChange({...biome, surface_builder: v})}
      required/>
    <BiomeCarversForm carvers={biome.carvers} onChange={bc => onChange({...biome, carvers: bc})}/>
    <BiomeFeaturesForm biomeFeatures={biome.features} onChange={bf => onChange({...biome, features: bf})}/>
    <MultiSelect label={'starts'} caption={'The structures to generate in this biome.'}
                 values={biome.starts}
                 uid={'starts'}
                 options={StructureFeatures}
                 onChange={values => onChange({...biome, starts: values})}/>
    <BiomeSpawnerForm onChange={bs => onChange({...biome, spawners: bs})} spawners={biome.spawners}/>
    <InputCheckboxLabel
      label={'player_spawn_friendly'} onChange={e => onChange({...biome, player_spawn_friendly: e})}
      value={biome.player_spawn_friendly}/>
    <InputLabel
      label={'creature_spawn_probability'}
      caption={'Spawns passive mobs as long as random value is less than this. Must be between 0 and 1.'}
      value={biome.creature_spawn_probability}
      onChange={event => onChange({...biome, creature_spawn_probability: parseInput(event.target.value, 0, 1)})}
      type={'number'}/>
    {/* todo: Optional parent*/}
    {/* todo:  Spawn cost */}
  </Card>
};
