import {Dimension} from './dimension';
import {DimensionType} from './dimension-type';

export interface Data {
  dimensions: Dimension[];
  dimensionType: DimensionType[];
  namespace: string;
}
