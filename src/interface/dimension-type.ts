export const MinecraftDimensionTypes = ['minecraft:overworld', 'minecraft:overworld_caves', 'minecraft:the_nether', 'minecraft:the_end'];

export interface DimensionType {
  name: string;
  id: number;
  ultrawarm: boolean;
  natural: boolean;
  coordinate_scale: number;
  has_skylight: boolean;
  has_ceiling: boolean;
  ambient_light: number;
  fixed_time?: number;
  piglin_safe: boolean;
  bed_works: boolean;
  respawn_anchor_works: boolean;
  has_raids: boolean;
  logical_height: number;
  infiniburn: string;
}