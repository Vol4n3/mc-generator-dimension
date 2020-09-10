import {FC, useState} from 'react';
import {Biome} from '../../../interface/biome';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {BiomeForm} from './biome.form';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';

interface BiomesPanelsProps {
  biomes: Biome[];
  onChange: (b: Biome[]) => void;
}

export const BiomesPanels: FC<BiomesPanelsProps> = props => {
  const {biomes, onChange} = props;
  const [getId, setId] = useState<number>(1);
  const createBiome = () => {
    onChange([
      {
        id: getId,
        name: 'biome' + getId,
        depth: 0.2,
        precipitation: 'none',
        category: 'none',
        creature_spawn_probability: 1,
        player_spawn_friendly: false,
        downfall: 0.8,
        scale: 0.4,
        surface_builder: 'minecraft:grass',
        temperature: 2,
        temperature_modifier: 'none',
        starts: [],
        features: [[], [], [], [], [], [], [], [], [], []],
        spawn_costs: {},
        effects: {
          fog_color: 0,
          foliage_color: 0,
          grass_color: 0,
          sky_color: 0,
          water_color: 0,
          water_fog_color: 0,
          grass_color_modifier: 'none',
        },
        carvers: {
          air: [], liquid: []
        },
        spawners: {
          ambient: [],
          creature: [],
          misc: [],
          monster: [],
          water_ambient: [],
          water_creature: []
        }
      }
      , ...biomes
    ]);
    setId(getId + 1);
  };
  return <>
    <Flex justifyContent={['center']}>
      <Button style={{marginTop: '10px'}} onClick={createBiome}>+ Add biome +</Button>
    </Flex>
    {biomes.map((biome, index) => <BiomeForm
      key={biome.id}
      biome={biome}
      onClose={() => onChange(removeItemInArray(biomes, index))}
      onChange={(value) => onChange(updateItemInArray(biomes, index, value))}/>)}
  </>
};
