import {FC, useState} from 'react';
import {
  BiomeSource,
  BiomeSourceCheckerboard,
  BiomeSourceFixed,
  BiomeSourceMultiNoise,
  BiomeSourceTheEnd,
  BiomeSourceType,
  BiomeSourceVanillaLayered
} from '../../../interface/dimension';
import {LabelWrapper} from '../../label-wrapper';
import {Select} from '../../select/select';
import {generateRandFloat, parseInput, parseSeed} from '../../../utils/math.utils';
import {Button} from '../../button';
import {MultiNoiseParamsForm} from './multi-noise-params.form';
import {BiomeSettingsForm} from '../biome/biome-settings.form';
import {InputLabel} from '../../input/input-label';
import {InputCheckboxLabel} from '../../input/input-checkbox-label';
import {MultiSelect} from '../../multi-select/multi-select';
import {biomes} from '../../../interface/biome';

type BiomeSourcePossible =
  BiomeSourceTheEnd
  | BiomeSourceFixed
  | BiomeSourceCheckerboard
  | BiomeSourceMultiNoise
  | BiomeSourceVanillaLayered | BiomeSource;

interface BiomeSourceProps {
  biomeSource: BiomeSourcePossible;
  onChange: (bs: BiomeSourcePossible) => void;
  customBiomes: string[];
}

const biomesTypes = [
  "minecraft:vanilla_layered"
  , "minecraft:fixed"
  , "minecraft:checkerboard"
  , "minecraft:multi_noise"
  , "minecraft:the_end"
];
export const BiomeSourceForm: FC<BiomeSourceProps> = props => {
  const {biomeSource, onChange,customBiomes} = props;
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
    <InputLabel
      label={'Biome source seed'}
      type={'number'}
      value={biomeSource.seed}
      required
      onChange={e => onChange({...biomeSource, seed: parseSeed(e.target.value)})}/>
    <LabelWrapper label={'Biome source type'} caption={"The type of biome generation"}>
      <Select
        onSelected={emitChangeBST}
        options={biomesTypes}
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
                biomes: [{
                  biome: '',
                  id: getId,
                  parameters: {
                    altitude: generateRandFloat(),
                    humidity: generateRandFloat(),
                    offset: 0,
                    temperature: generateRandFloat(),
                    weirdness: generateRandFloat()
                  }
                }, ...(biomeSource as BiomeSourceMultiNoise).biomes]
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
        <InputCheckboxLabel
          label={"Large Biome"}
          caption={'Whether the biomes are large. True for biomes generation in the "Large Biomes" world type.'}
          onChange={e => onChange({...biomeSource, large_biomes: e})}
          value={(biomeSource as BiomeSourceVanillaLayered).large_biomes}>
        </InputCheckboxLabel>
        <InputCheckboxLabel
          label={"legacy_biome_init_layer"}
          caption={'Whether the world was default_1_1'}
          onChange={e => onChange({...biomeSource, legacy_biome_init_layer: e})}
          value={(biomeSource as BiomeSourceVanillaLayered).legacy_biome_init_layer}>
        </InputCheckboxLabel>
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
        <InputLabel
          label={"Biome"}
          type={'text'}
          required
          list={'biomes'}
          value={(biomeSource as BiomeSourceFixed).biome}
          onChange={e => onChange({...biomeSource, biome: e.target.value})}/>
      </div>
    }
    {
      biomeSource.type === 'minecraft:checkerboard' && <div>
        Checkerboard: A biome generation in which biomes are square (or close to square) and repeat along the diagonals.
        <InputLabel
          label={'scale'}
          caption={'Determines the size of the squares on an exponential scale.'}
          type={'number'}
          value={(biomeSource as BiomeSourceCheckerboard).scale}
          onChange={e => onChange({...biomeSource, scale: parseInput(e.target.value, 1)})}
          required
        />
        <MultiSelect
          label={'ajouter un biome'}
          values={(biomeSource as BiomeSourceCheckerboard).biomes}
          options={[...customBiomes, ...biomes]}
          uid={'checkerboardBiomes'}
          onChange={value => onChange({...biomeSource, biomes: value})}/>
      </div>
    }
  </>
}
