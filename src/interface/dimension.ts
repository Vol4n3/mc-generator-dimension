import {Structures} from './structures';
import {BlocksType} from './blocks';
import {BiomesType} from './biome';

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

export interface BiomeWithParams {
  biome: BiomesType | string;
  parameters: BiomeParameters;
  id: number;
}
export type BiomeSourceType =
  "minecraft:vanilla_layered"
  | "minecraft:fixed"
  | "minecraft:checkerboard"
  | "minecraft:multi_noise"
  | "minecraft:the_end";
export interface BiomeSource {
  seed: number;
  type?: BiomeSourceType;
}
export interface BiomeSourceVanillaLayered extends BiomeSource{
  large_biomes: boolean;
  legacy_biome_init_layer: boolean;
}

export interface BiomeSourceMultiNoise extends BiomeSource{
  preset?: 'minecraft:nether';
  biomes: BiomeWithParams[];
  humidity_noise: Noise
  altitude_noise: Noise
  weirdness_noise: Noise
  temperature_noise: Noise
}


export interface BiomeSourceCheckerboard extends BiomeSource {
  biomes: (BiomesType | string)[];
  scale: number;
}
export interface BiomeSourceTheEnd extends BiomeSource{
  the_end: 'minecraft:the_end';
}
export interface BiomeSourceFixed extends BiomeSource{
  biome: BiomesType | string;
}

export interface FlatSettings {
  layers: { height: number, block: BlocksType }[];
  biome: BiomesType | string;
  lakes?: boolean;
  features?: string[][];
  structures: Structures;
}

export type DimensionGeneratorType = 'minecraft:noise' | 'minecraft:flat' | 'minecraft:debug';

export interface DimensionGenerator {
  /*
    if of generator minecraft: flat,noise,debug
   */
  type?: DimensionGeneratorType;
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
  generator: DimensionGenerator;
  /**
   * id name   of dimension_type
   */
  type: string;
}