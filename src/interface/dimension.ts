
export interface DimensionGenerator {
  type: string;
  seed: string;
  /**
   * noise settings
   */
  settings: string;
}
export interface Dimension {
  name: string;
  generator?: DimensionGenerator;
  dimensionTypeId?: string;
}