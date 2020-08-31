import {FC} from 'react';
import {BiomeSource, BiomeSourceType, Checkerboard, MultiNoise, VanillaLayered} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Select} from '../select/select';
import {Input} from '../input';

interface BiomeSourceProps {
  biomeSource: BiomeSource;
  onChange: (bs: BiomeSource) => void;
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
  const emitChangeBST = (value: string) => {
    const bst = value as BiomeSourceType;
    let addition: any = {};
    if (bst === 'minecraft:multi_noise') {
      addition = {
        multi_noise: {
          preset: 'minecraft:nether',
          humidity_noise: {firstOctave: -7, amplitudes: [1.0, 1.0]},
          altitude_noise: {firstOctave: -7, amplitudes: [1.0, 1.0]},
          weirdness_noise: {firstOctave: -7, amplitudes: [1.0, 1.0]},
          temperature_noise: {firstOctave: -7, amplitudes: [1.0, 1.0]},
          biomes: []
        }
      } as { multi_noise: MultiNoise }
    }
    if (bst === 'minecraft:checkerboard') {
      addition = {
        checkerboard: {
          biomes: [],
          scale: 1
        }
      } as {
        checkerboard: Checkerboard
      }
    }
    if (bst === 'minecraft:fixed') {
      addition = {
        fixed: {
          biome: ''
        }
      }
    }
    if (bst === 'minecraft:the_end') {
      addition = {
        the_end: 'minecraft:the_end'
      }
    }
    if (bst === 'minecraft:vanilla_layered') {
      addition = {
        vanilla_layered: {
          large_biomes: false,
          legacy_biome_init_layer: true,
        } as VanillaLayered
      }
    }
    onChange({
      ...addition,
      seed: biomeSource.seed,
      type: bst,
    })
  }
  return <>
    <LabelWrapper label={'Biome source seed'}>
      <Input type={'number'}
             value={biomeSource.seed}
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
      </div>
    }
    {
      biomeSource.type === 'minecraft:vanilla_layered' && <div>
        Vanilla layered : Default and large biome generation used in the overworld
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
          <Input type={'text'} value={biomeSource.fixed?.biome}
                 list={'biomes'}
                 onChange={e => onChange({...biomeSource, fixed: {biome: e.target.value}})}/>
        </LabelWrapper>
      </div>
    }
    {
      biomeSource.type === 'minecraft:checkerboard' && <div>
        Checkerboard: A biome generation in which biomes are square (or close to square) and repeat along the diagonals.
      </div>
    }
  </>
}