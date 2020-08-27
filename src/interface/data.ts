import {Dimension} from './dimension';
import {DimensionType} from './dimension-type';
import {NoiseSettings} from './noise-settings';

export interface Data {
  dimensions: Dimension[];
  dimensionType: DimensionType[];
  noiseSettings: NoiseSettings[];
  namespace: string;
}
