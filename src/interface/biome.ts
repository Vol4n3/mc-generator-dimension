import {MobsType} from './mobs';


export const BiomeCategories = ["none", "taiga", "extreme_hills", "jungle", "mesa", "plains", "savanna"
  , "icy", "the_end", "beach", "forest", "ocean", "desert", "river",
  "swamp", "mushroom", "nether"] as const;
export type BiomeCategory = typeof BiomeCategories[number];
export const GrassColorModifiers = ["none", "dark_forest", "swamp"];
export type GrassColorModifier = typeof GrassColorModifiers[number];
export type BiomeEffects = {
  fog_color: number;
  foliage_color: number;
  grass_color: number;
  sky_color: number;
  water_color: number;
  water_fog_color: number;
  grass_color_modifier: GrassColorModifier;
  particle?: {
    probability: number,
    options: {
      type: string;
      r?: number;
      g?: number;
      b?: number;
      scale?: number;
    }
  }
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
  type?: MobsType,
  id: number;
  weight: number,
  minCount: number,
  maxCount: number
}
export const Precipitations = ['none', 'rain', 'snow'] as const;
export type Precipitation = typeof Precipitations[number];

export const TempModifiers = ["none", "frozen"] as const;
export type TempModifier = typeof TempModifiers[number];
export const SurfaceBuilders = [
  "minecraft:badlands",
  "minecraft:basalt_deltas",
  "minecraft:crimson_forest",
  "minecraft:desert",
  "minecraft:end",
  "minecraft:eroded_badlands",
  "minecraft:frozen_ocean",
  "minecraft:full_sand",
  "minecraft:giant_tree_taiga",
  "minecraft:grass",
  "minecraft:gravelly_mountain",
  "minecraft:ice_spikes",
  "minecraft:mountain",
  "minecraft:mycelium",
  "minecraft:nether",
  "minecraft:nope",
  "minecraft:ocean_sand",
  "minecraft:shattered_savanna",
  "minecraft:soul_sand_valley",
  "minecraft:stone",
  "minecraft:swamp",
  "minecraft:warped_forest",
  "minecraft:wooded_badlands",
];
export const StructureFeatures = [
  "minecraft:bastion_remnant",
  "minecraft:buried_treasure",
  "minecraft:desert_pyramid",
  "minecraft:end_city",
  "minecraft:fortress",
  "minecraft:igloo",
  "minecraft:jungle_pyramid",
  "minecraft:mansion",
  "minecraft:mineshaft",
  "minecraft:mineshaft_mesa",
  "minecraft:monument",
  "minecraft:nether_fossil",
  "minecraft:ocean_ruin_cold",
  "minecraft:ocean_ruin_warm",
  "minecraft:pillager_outpost",
  "minecraft:ruined_portal",
  "minecraft:ruined_portal_desert",
  "minecraft:ruined_portal_jungle",
  "minecraft:ruined_portal_mountain",
  "minecraft:ruined_portal_nether",
  "minecraft:ruined_portal_ocean",
  "minecraft:ruined_portal_swamp",
  "minecraft:shipwreck",
  "minecraft:shipwreck_beached",
  "minecraft:stronghold",
  "minecraft:swamp_hut",
  "minecraft:village_desert",
  "minecraft:village_plains",
  "minecraft:village_savanna",
  "minecraft:village_snowy",
  "minecraft:village_taiga",
];
export const CarversAir = [
  "minecraft:cave",
  "minecraft:canyon",
  "minecraft:ocean_cave",
  "minecraft:nether_cave"
];
export const CarversLiquid = [
  "minecraft:underwater_canyon",
  "minecraft:underwater_cave"
];

export interface BiomeCarvers {
  air: string[],
  liquid: string[]
}

export type BiomeFeaturesLevel = [string[], string[], string[], string[], string[], string[], string[], string[], string[], string[]];

export interface BiomeSpawners {
  monster: SpawnerConfig[];
  creature: SpawnerConfig[];
  ambient: SpawnerConfig[];
  water_creature: SpawnerConfig[];
  water_ambient: SpawnerConfig[];
  misc: SpawnerConfig[];
}

export interface Biome {
  /**
   * "none", "rain", or "snow"
   */
  name: string;
  id: number;
  precipitation: Precipitation | string;
  category: BiomeCategory | string;
  depth: number;
  scale: number;
  temperature: number;
  temperature_modifier: TempModifier | string;
  downfall: number;
  effects: BiomeEffects;
  starts: string[];
  carvers: BiomeCarvers;
  features: BiomeFeaturesLevel;
  surface_builder: string;
  spawners: BiomeSpawners;
  player_spawn_friendly: boolean;
  creature_spawn_probability: number;
  parent?: BiomesType | string;
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
