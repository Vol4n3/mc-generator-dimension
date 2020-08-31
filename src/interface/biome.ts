import {FeaturesType} from './features';
import {MobsType} from './mobs';

export type BiomeCategory =
  "none"
  | "taiga"
  | "extreme_hills"
  | "jungle"
  | "mesa"
  | "plains"
  | "savanna"
  | "icy"
  | "the_end"
  | "beach"
  | "forest"
  | "ocean"
  | "desert"
  | "river"
  | "swamp"
  | "mushroom"
  | "nether";

export type BiomeEffects = {
  fog_color: number;
  foliage_color: number;
  grass_color: number;
  sky_color: number;
  water_color: number;
  water_fog_color: number;
  grass_color_modifier: "none" | "dark_forest" | "swamp";
  particle?: {}
  ambient_sound?: string;
  mood_sound?: {
    sound: string;
    tick_delay: number;
    block_search_extent: number;
    offset: number
  };
  additions_sound?: {
    sound: string;
    tick_chance: string;
  };
  music?: {
    sound: string;
    min_delay: number;
    max_delay: number;
    replace_current_music: boolean;
  }
}
export type SpawnerConfig = {
  type: MobsType,
  weight: number,
  minCount: number,
  maxCount: number
}
export interface Biome {
  /**
   * "none", "rain", or "snow"
   */
  name:string;
  precipitation: "none" | "rain" | "snow";
  category: BiomeCategory;
  depth: number;
  scale: number;
  temperature: number;
  temperature_modifier: "none" | "frozen";
  downfall: number;
  effects: BiomeEffects;
  surface_builder: string;
  carvers: {
    air?: string[],
    liquid?: string[]
  }
  features: FeaturesType[][];
  starts: string[];
  spawners: {
    monster?: SpawnerConfig[];
    creature?: SpawnerConfig[];
    ambient?: SpawnerConfig[];
    water_creature?: SpawnerConfig[];
    water_ambient?: SpawnerConfig;
    misc?: SpawnerConfig;
  }
  player_spawn_friendly: boolean;
  creature_spawn_probability: number;
  parent: BiomesType | string;
  spawn_costs: {
    [key: string]: {
      energy_budget: number;
      charge: number;
    }
  }
}

export const biomes = [
  "minecraft:ocean",
  "minecraft:deep_ocean",
  "minecraft:frozen_ocean",
  "minecraft:deep_frozen_ocean",
  "minecraft:cold_ocean",
  "minecraft:deep_cold_ocean",
  "minecraft:lukewarm_ocean",
  "minecraft:deep_lukewarm_ocean",
  "minecraft:warm_ocean",
  "minecraft:deep_warm_ocean",
  "minecraft:river",
  "minecraft:frozen_river",
  "minecraft:beach",
  "minecraft:stone_shore",
  "minecraft:snowy_beach",
  "minecraft:forest",
  "minecraft:wooded_hills",
  "minecraft:flower_forest",
  "minecraft:birch_forest",
  "minecraft:birch_forest_hills",
  "minecraft:tall_birch_forest",
  "minecraft:tall_birch_hills",
  "minecraft:dark_forest",
  "minecraft:dark_forest_hills",
  "minecraft:jungle",
  "minecraft:jungle_hills",
  "minecraft:modified_jungle",
  "minecraft:jungle_edge",
  "minecraft:modified_jungle_edge",
  "minecraft:bamboo_jungle",
  "minecraft:bamboo_jungle_hills",
  "minecraft:taiga",
  "minecraft:taiga_hills",
  "minecraft:taiga_mountains",
  "minecraft:snowy_taiga",
  "minecraft:snowy_taiga_hills",
  "minecraft:snowy_taiga_mountains",
  "minecraft:giant_tree_taiga",
  "minecraft:giant_tree_taiga_hills",
  "minecraft:giant_spruce_taiga",
  "minecraft:giant_spruce_taiga_hills",
  "minecraft:mushroom_fields",
  "minecraft:mushroom_field_shore",
  "minecraft:swamp",
  "minecraft:swamp_hills",
  "minecraft:savanna",
  "minecraft:savanna_plateau",
  "minecraft:shattered_savanna",
  "minecraft:shattered_savanna_plateau",
  "minecraft:plains",
  "minecraft:sunflower_plains",
  "minecraft:desert",
  "minecraft:desert_hills",
  "minecraft:desert_lakes",
  "minecraft:snowy_tundra",
  "minecraft:snowy_mountains",
  "minecraft:ice_spikes",
  "minecraft:mountains",
  "minecraft:wooded_mountains",
  "minecraft:gravelly_mountains",
  "minecraft:modified_gravelly_mountains",
  "minecraft:mountain_edge",
  "minecraft:badlands",
  "minecraft:badlands_plateau",
  "minecraft:modified_badlands_plateau",
  "minecraft:wooded_badlands_plateau",
  "minecraft:modified_wooded_badlands_plateau",
  "minecraft:eroded_badlands",
  "minecraft:nether_wastes",
  "minecraft:soul_sand_valley",
  "minecraft:crimson_forest",
  "minecraft:warped_forest",
  "minecraft:basalt_deltas",
  "minecraft:the_end",
  "minecraft:small_end_islands",
  "minecraft:end_midlands",
  "minecraft:end_highlands",
  "minecraft:end_barrens",
  "minecraft:the_void"
] as const;

export type BiomesType = typeof biomes[number];