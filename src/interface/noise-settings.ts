import {Structures} from './structures';
import {BlocksType} from './mc-blocks';
import {FluidsType} from './fluids';

export const noiseSettingsDefault = [
  'minecraft:overworld',
  'minecraft:amplified',
  'minecraft:nether',
  'minecraft:caves',
  'minecraft:end',
  'minecraft:floating_islands'
]
export interface NoiseSettings {
  name: string;
  default_fluid: {
    Name: FluidsType;
    Properties: {
      level?: string
    },
  }
  bedrock_roof_position: number;
  bedrock_floor_position: number;
  sea_level: number;
  disable_mob_generation: boolean;
  structures: Structures;
  noise: {
    top_slide: {
      target: number,
      size: number,
      offset: number
    }
    bottom_slide: {
      target: number,
      size: number,
      offset: number
    },
    sampling: {
      xz_scale: number,
      y_scale: number,
      xz_factor: number,
      y_factor: number
    },
    size_vertical: number;
    size_horizontal: number;
    height: number;
    density_factor: number;
    density_offset: number;
    random_density_offset?: boolean;
    simplex_surface_noise: boolean;
    island_noise_override?: boolean;
    amplified: boolean;
  },
  default_block: {
    Name: BlocksType,
    Properties?: {
      state?: string
      level?: string;
    }
  },
  id: number;
}