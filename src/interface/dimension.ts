import {Structures} from './structures';
import {FeaturesType} from './features';
import {BlocksType} from './blocks';

export interface VanillaLayered {
  large_biomes: boolean;
  legacy_biome_init_layer: boolean;
}

export interface Noise {
  firstOctave: number,
  amplitudes: [number, number]
}

export interface BiomeParameters {
  /** -2.0 2.0*/
  altitude: number;
  /**
   * -2.0 2.0
   */
  weirdness: number;
  /**
   * 0.0 1.0
   */
  offset: number;
  /**
   * for generation near other biome
   */
  temperature: number;
  /**
   * humidity
   */
  humidity: number;
}

export interface Biome {
  biome: string;
  parameters: BiomeParameters;
}

export interface MultiNoise {
  /**
   * minecraft:nether
   */
  preset: string;
  biomes: Biome[];
  humidity_noise: Noise
  altitude_noise: Noise
  weirdness_noise: Noise
  temperature_noise: Noise
}

export interface BiomeSource {
  vanilla_layered?: VanillaLayered;
  multi_noise?: MultiNoise;
  /**
   * minecraft:the_end
   */
  the_end?: string;
  fixed?: {
    biome: string;
  };
  checkerboard?: {
    biomes: string[];
    scale: number;
  }
  seed: number;
  /**
   * biome type
   * minecraft:vanilla_layered,
   * minecraft:fixed, minecraft:checkerboard,
   * minecraft:multi_noise, and minecraft:the_end
   */
  type: string;
}

export interface NoiseSettings {

}

export interface FlatSettings {
  layers: { height: number, block: BlocksType }[];
  biome: string;
  lakes?: boolean;
  features?: FeaturesType[][];
  structures: Structures;
}
export type DimensionGeneratorType = 'minecraft:noise' | 'minecraft:flat' | 'minecraft:debug';
export interface DimensionGenerator {
  /*
    if of generator minecraft: flat,noise,debug
   */
  type: DimensionGeneratorType;
  seed: number;
  /**
   * noise settings id or flat settings
   */
  settings: string | FlatSettings;
  biome_source?: BiomeSource;
}

export interface Dimension {
  /**
   * used for filename
   */
  name: string;
  id: number;
  generator?: DimensionGenerator;
  /**
   * id name   of dimension_type
   */
  type: string;
}