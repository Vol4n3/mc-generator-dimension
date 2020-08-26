export const features = [
  "no_op",
  "chorus_plant",
  "void_start_platform",
  "desert_well",
  "fossil",
  "ice_spike",
  "glowstone_blob",
  "freeze_top_layer",
  "vines",
  "monster_room",
  "blue_ice",
  "end_island",
  "kelp",
  "coral_tree",
  "coral_mushroom",
  "coral_claw",
  "weeping_vines",
  "twisting_vines",
  "bonus_chest",
  "basalt_pillar",
  "tree",
  "flower",
  "random_patch",
  "block_pile",
  "nether_forest_vegetation",
  "spring_feature",
  "emerald_ore",
  "huge_red_mushroom",
  "huge_brown_mushroom",
  "iceberg",
  "forest_rock",
  "lake",
  "disk",
  "ice_patch",
  "ore",
  "no_surface_ore",
  "end_spike",
  "end_gateway",
  "seagrass",
  "bamboo",
  "sea_pickle",
  "simple_block",
  "huge_fungus",
  "basalt_columns",
  "delta_feature",
  "netherrack_replace_blobs",
  "fill_layer",
  "random_selector",
  "simple_random_selector",
  "random_boolean_selector",
  "decorated",
  "decorated_flower",
] as const;
export type FeaturesType = typeof features[number];