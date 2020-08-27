import {FC} from 'react';
import {BiomeSource, BiomeSourceType, Checkerboard, MultiNoise} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Select} from '../select/select';

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
  const emitChange = (bs: string) => {
    let addition: any = {};
    if (bs as BiomeSourceType === 'minecraft:multi_noise') {
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
    if(bs as BiomeSourceType === 'minecraft:checkerboard'){
      addition = {
        checkerboard: {
          biomes: [],
          scale: 1
        }
      } as {
        checkerboard: Checkerboard
      }
    }
    onChange({
      ...addition,
      seed: biomeSource.seed,
      type: bs as BiomeSourceType,
    })
  }
  return <>
    <LabelWrapper label={'Biome type'}>
      <Select
        onSelected={emitChange}
        options={biomesTypes.map((bt) => ({
          label: bt.replace('minecraft:', ''),
          value: bt
        }))}
        value={biomeSource.type}
        required/>
    </LabelWrapper>
    {}
  </>
}