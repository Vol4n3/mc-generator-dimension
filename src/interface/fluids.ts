export const fluids = [
  "minecraft:empty",
"minecraft:flowing_lava",
"minecraft:flowing_water",
"minecraft:lava",
"minecraft:water"
] as const;

export type FluidsType = typeof fluids[number];