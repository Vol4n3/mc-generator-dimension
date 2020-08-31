import {Dimension} from './dimension';
import {DimensionType} from './dimension-type';
import {NoiseSettings} from './noise-settings';
import {Biome} from './biome';

export interface Data {
  dimensions: Dimension[];
  dimensionType: DimensionType[];
  noiseSettings: NoiseSettings[];
  namespace: string;
  biomes: Biome[]
}
