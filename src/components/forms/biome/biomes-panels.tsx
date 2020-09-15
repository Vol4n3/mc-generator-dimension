import {FC, FormEvent, useState} from 'react';
import {Biome} from '../../../interface/biome';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {BiomeForm} from './biome.form';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';
import {ImportJson} from '../../import-json/import-json';

interface BiomesPanelsProps {
  biomes: Biome[];
  onSubmit: (b: Biome[]) => void;
}

export const BiomesPanels: FC<BiomesPanelsProps> = props => {
  const {biomes, onSubmit} = props;
  const [getId, setId] = useState<number>(biomes[0] ? biomes[0].id + 1 : 1);
  const [getBiomes, setBiomes] = useState<Biome[]>(biomes);
  const createBiome = () => {
    setBiomes([
      {
        id: getId,
        name: 'biome' + getId,
        depth: 0,
        precipitation: 'none',
        category: 'none',
        creature_spawn_probability: 1,
        player_spawn_friendly: false,
        downfall: 0,
        scale: 1,
        surface_builder: 'minecraft:grass',
        temperature: 0,
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
      , ...getBiomes
    ]);
    setId(getId + 1);
  };
  const emitSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(getBiomes);
  }
  const fromFile = (json: Object) => {
    console.log(json);
    setBiomes([{
      ...json,
      id: getId
    } as Biome,
      ...getBiomes]);
    setId(getId + 1);
  }
  return <form onSubmit={emitSubmit}>
    <ImportJson onChange={fromFile}/>
    <Flex justifyContent={['center']}>
      <Button onClick={createBiome}>Add new biome </Button>
      <Button type={'submit'} disabled={!getBiomes.length}>Save biomes</Button>
    </Flex>
    {getBiomes.map((biome, index) => <BiomeForm
      key={biome.id}
      biome={biome}
      onClose={() => setBiomes(removeItemInArray(getBiomes, index))}
      onChange={(value) => setBiomes(updateItemInArray(getBiomes, index, value))}/>)}
  </form>
};
