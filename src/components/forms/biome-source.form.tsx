import {FC, useState} from 'react';
import {
  BiomeSource,
  BiomeSourceCheckerboard,
  BiomeSourceFixed,
  BiomeSourceMultiNoise,
  BiomeSourceTheEnd,
  BiomeSourceType,
  BiomeSourceVanillaLayered
} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Select} from '../select/select';
import {Input} from '../input';
import {generateRandFloat, parseInput} from '../../utils/math.utils';
import {Button} from '../button';
import {TagCloud} from '../tag-cloud';
import {MultiNoiseParamsForm} from './multi-noise-params.form';
import {BiomeSettingsForm} from './biome-settings.form';

type BiomeSourcePossible =
  BiomeSourceTheEnd
  | BiomeSourceFixed
  | BiomeSourceCheckerboard
  | BiomeSourceMultiNoise
  | BiomeSourceVanillaLayered | BiomeSource;

interface BiomeSourceProps {
  biomeSource: BiomeSourcePossible;
  onChange: (bs: BiomeSourcePossible) => void;
}

const biomesTypes = [
  "minecraft:vanilla_layered"
  , "minecraft:fixed"
  , "minecraft:checkerboard"
  , "minecraft:multi_noise"
  , "minecraft:the_end"
];
export const BiomeSourceForm: FC<BiomeSourceProps> = props => {
  const {biomeSource, onChange} = props;
  const [getCheckerBiomeInput, setCheckerBiomeInput] = useState<string>('');
  const [getId, setId] = useState<number>(1);
  const emitChangeBST = (value: string) => {
    const bst = value as BiomeSourceType;
    let addition;
    if (bst === 'minecraft:multi_noise') {
      addition = {

        humidity_noise: {firstOctave: -6, amplitudes: [1.0, 1.0]},
        altitude_noise: {firstOctave: -6, amplitudes: [1.0, 1.0]},
        weirdness_noise: {firstOctave: -6, amplitudes: [1.0, 1.0]},
        temperature_noise: {firstOctave: -6, amplitudes: [1.0, 1.0]},
        biomes: [],
      } as Partial<BiomeSourceMultiNoise>
    }
    if (bst === 'minecraft:checkerboard') {
      addition = {
        biomes: [],
        scale: 1
      } as Partial<BiomeSourceCheckerboard>
    }
    if (bst === 'minecraft:fixed') {
      addition = {
        biome: ''
      } as Partial<BiomeSourceFixed>
    }
    if (bst === 'minecraft:the_end') {
      addition = {
        the_end: 'minecraft:the_end'
      } as Partial<BiomeSourceTheEnd>
    }
    if (bst === 'minecraft:vanilla_layered') {
      addition = {
        large_biomes: true,
        legacy_biome_init_layer: true,
      } as Partial<BiomeSourceVanillaLayered>
    }
    onChange({
      ...addition,
      seed: biomeSource.seed,
      type: bst,
    } as BiomeSourcePossible)
  }
  return <>
    <LabelWrapper label={'Biome source seed'}>
      <Input type={'number'}
             value={biomeSource.seed}
             required
             onChange={e => onChange({...biomeSource, seed: parseInt(e.target.value)})}/>
    </LabelWrapper>
    <LabelWrapper label={'Biome source type'} caption={"The type of biome generation"}>
      <Select
        onSelected={emitChangeBST}
        options={biomesTypes.map((bt) => ({
          label: bt.replace('minecraft:', ''),
          value: bt
        }))}
        value={biomeSource.type}
        required/>
    </LabelWrapper>
    {
      biomeSource.type === 'minecraft:multi_noise' && <div>
        Multi noise : 3D biome generation used in the nether.
        <Button
          onClick={() => {
            onChange(
              {
                ...biomeSource,
                biomes: [ {
                  biome: '',
                  id: getId,
                  parameters: {
                    altitude: generateRandFloat(),
                    humidity: generateRandFloat(),
                    offset: 0,
                    temperature: generateRandFloat(),
                    weirdness: generateRandFloat()
                  }
                },...(biomeSource as BiomeSourceMultiNoise).biomes]
              });
            setId(getId + 1);
          }}>
          Add Biome setting
        </Button>
        {(biomeSource as BiomeSourceMultiNoise).biomes.map((b, index) =>
          <BiomeSettingsForm
            key={b.id}
            onChange={
            e => onChange({
              ...biomeSource,
              biomes: (biomeSource as BiomeSourceMultiNoise).biomes.map(
                (item, i) => i === index ? e : item)
            })
          } value={b}
            onClose={() => {
              onChange({
                ...biomeSource, biomes: (biomeSource as BiomeSourceMultiNoise).biomes.filter(
                  (_, i) => i !== index
                )
              })
            }}/>)}
        <hr/>
        global multi noise settings
        <hr/>
        <MultiNoiseParamsForm
          label={'Altitude'}
          noise={(biomeSource as BiomeSourceMultiNoise).altitude_noise}
          onChange={(n) => onChange({...biomeSource, altitude_noise: n})}/>
        <MultiNoiseParamsForm
          label={'Humidity'}
          noise={(biomeSource as BiomeSourceMultiNoise).humidity_noise}
          onChange={(n) => onChange({...biomeSource, humidity_noise: n})}/>
        <MultiNoiseParamsForm
          label={'Temperature'}
          noise={(biomeSource as BiomeSourceMultiNoise).temperature_noise}
          onChange={(n) => onChange({...biomeSource, temperature_noise: n})}/>
        <MultiNoiseParamsForm
          label={'Weirdness'}
          noise={(biomeSource as BiomeSourceMultiNoise).weirdness_noise}
          onChange={(n) => onChange({...biomeSource, weirdness_noise: n})}/>
      </div>
    }
    {
      biomeSource.type === 'minecraft:vanilla_layered' && <div>
        Vanilla layered : Default and large biome generation used in the overworld
        <LabelWrapper
          caption={'Whether the biomes are large. True for biomes generation in the "Large Biomes" world type.'}>
          <label>
            <Input type={'checkbox'}
                   value={'large_biome'}
                   checked={(biomeSource as BiomeSourceVanillaLayered).large_biomes}
                   onChange={e => onChange({...biomeSource, large_biomes: e.target.checked})}/>
            <span>Large Biome</span>
          </label>
        </LabelWrapper>
        <LabelWrapper
          caption={'Whether the world was default_1_1'}>
          <label>
            <Input type={'checkbox'}
                   value={'large_biome'}
                   checked={(biomeSource as BiomeSourceVanillaLayered).legacy_biome_init_layer}
                   onChange={e => onChange({...biomeSource, legacy_biome_init_layer: e.target.checked})}/>
            <span>legacy_biome_init_layer</span>
          </label>
        </LabelWrapper>
      </div>
    }
    {
      biomeSource.type === 'minecraft:the_end' && <div>
        The end : Biome generation used in the end with biome minecraft:the_end in the center and other end biomes
        around.
      </div>
    }
    {
      biomeSource.type === 'minecraft:fixed' && <div>
        A single biome
        <LabelWrapper label={"Biome"}>
          <Input type={'text'}
                 required
                 list={'biomes'}
                 value={(biomeSource as BiomeSourceFixed).biome}
                 onChange={e => onChange({...biomeSource, biome: e.target.value})}/>
        </LabelWrapper>
      </div>
    }
    {
      biomeSource.type === 'minecraft:checkerboard' && <div>
        Checkerboard: A biome generation in which biomes are square (or close to square) and repeat along the diagonals.
        <LabelWrapper label={'scale'} caption={'Determines the size of the squares on an exponential scale.'}>
          <Input
            type={'number'}
            value={(biomeSource as BiomeSourceCheckerboard).scale}
            onChange={e => onChange({...biomeSource, scale: parseInput(e.target.value, 1)})}
            required
          />
        </LabelWrapper>
        <LabelWrapper>
          <Input
            type={'text'}
            list={'biomes'}
            value={getCheckerBiomeInput}
            onChange={(e) => setCheckerBiomeInput(e.target.value)}/>
          <Button
            onClick={() => {
              getCheckerBiomeInput &&
              !(biomeSource as BiomeSourceCheckerboard).biomes.some((item) => getCheckerBiomeInput === item) &&
              onChange({
                ...biomeSource,
                biomes:
                  [
                    ...(biomeSource as BiomeSourceCheckerboard).biomes,
                    getCheckerBiomeInput
                  ]
              } as BiomeSourceCheckerboard);
              setCheckerBiomeInput('');
            }}>
            Add
          </Button>
          <hr/>
          <TagCloud
            value={(biomeSource as BiomeSourceCheckerboard).biomes}
            onChange={(val) => onChange({...biomeSource, biomes: val} as BiomeSourceCheckerboard)}/>
        </LabelWrapper>
      </div>
    }
  </>
}