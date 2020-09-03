import {FormEvent, useState} from 'react';
import {Data} from '../../../interface/data';
import {Button} from '../../../components/button';
import {DimensionForm} from '../../../components/forms';
import {MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';
import {Flex} from '../../../components/flex';
import {generateSeed} from '../../../utils/math.utils';
import styled from 'styled-components';
import {MainTemplate} from '../../../components/template/main.template';
import {biomes} from '../../../interface/biome';
import {noiseSettingsDefault} from '../../../interface/noise-settings';
import {DimensionTypeForm} from '../../../components/forms/dimension-type.form';
import {BiomeForm} from '../../../components/forms/biome.form';
import {removeItemInArray, updateItemInArray, updateItemInObject} from '../../../utils/object.manipulation';
import {InputLabel} from '../../../components/input/input-label';

const ExtendedDiv = styled.div`
width: 100%;
position: relative;
`;
const DimensionsPage = () => {
  const [getData, setData] = useState<Data>({
    dimensions: [],
    dimensionType: [],
    namespace: 'generator',
    noiseSettings: [],
    biomes: []
  });
  const [getId, setId] = useState<number>(1);
  const submitData = (event: FormEvent) => {
    event.preventDefault();
    exportFiles(getData);
  }
  const createBiome = () => {
    setData({
      ...getData,
      biomes: [
        {
          id: getId,
          name: '',
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
          effects:{
            fog_color: 0,
            foliage_color: 0,
            grass_color: 0,
            sky_color: 0,
            water_color:0,
            water_fog_color:0,
            grass_color_modifier: 'none',
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
        , ...getData.biomes
      ]
    })
    setId(getId + 1);
  }
  const createDimensionType = () => {
    setData({
      ...getData,
      dimensionType: [
        ...getData.dimensionType,
        {
          id: getId,
          name: '',
          ambient_light: 0.5,
          bed_works: true,
          coordinate_scale: 1,
          has_skylight: true,
          has_ceiling: true,
          piglin_safe: false,
          has_raids: true,
          infiniburn: 'minecraft:infiniburn_overworld',
          logical_height: 256,
          natural: true,
          ultrawarm: false,
          respawn_anchor_works: true
        }
      ]
    });
    setId(getId + 1);
  }
  const createDimension = () => {
    setData({
      ...getData,
      dimensions: [
        {
          id: getId,
          name: '',
          type: '',
          generator: {
            seed: generateSeed(),
            settings: ''
          }
        },
        ...getData.dimensions
      ]
    });
    setId(getId + 1);
  };
  const updateInData = (key: keyof Data, index: number, value: any) => {
    setData(
      updateItemInObject<Data>(getData, key,
        updateItemInArray<keyof Data>(getData[key] as any[], index, value)));
  }
  const removeInData = (key: keyof Data, index: number) => {
    setData(
      updateItemInObject<Data>(getData, key,
        removeItemInArray<keyof Data>(getData[key] as any[], index)));
  }
  return <MainTemplate title={'Minecraft Generator dimension 1.16.2'}>
    <form onSubmit={submitData}>
      <InputLabel
        label={'Namespace'}
        caption={'Namespace is used to found custom dimension , dimension_type , noise_settings or biomes'}
        required
        value={getData.namespace}
        onChange={(ev) => setData({...getData, namespace: ev.target.value})}/>
      <Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button onClick={() => createDimension()}>Add dimension</Button>
            {getData.dimensions.map((dim, index) => {
              return <DimensionForm
                onRemove={() => removeInData('dimensions', index)}
                key={dim.id}
                dimension={dim}
                customBiomes={getData.biomes.map(b => `${getData.namespace}:${b.name}`)}
                onChange={value => updateInData('dimensions', index, value)}
              />
            })}
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button onClick={() => createDimensionType()}>Add dimension type</Button>
            {getData.dimensionType.map((dim, index) =>
              <DimensionTypeForm
                onRemove={() => removeInData('dimensionType', index)}
                key={dim.id}
                dimensionType={dim}
                onChange={value => updateInData('dimensionType', index, value)}
              />)}
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button>Add noise settings</Button>
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button onClick={createBiome}>Add biome</Button>
            {getData.biomes.map((biome, index) => <BiomeForm
              key={biome.id}
              biome={biome}
              onClose={() => removeInData('biomes', index)}
              onChange={(value) => updateInData('biomes', index, value)}/>)}
          </ExtendedDiv>
        </Flex>
      </Flex>
      <hr style={{marginTop: '50px'}}/>
      <Button type={'submit'}>Export</Button>
    </form>
    <datalist id={'biomes'}>
      {[...biomes, ...getData.biomes.map(b => `${getData.namespace}:${b.name}`)].map((b) => <option key={b}
                                                                                                    value={b}/>)}
    </datalist>
    <datalist id={'noise_settings'}>
      {[...noiseSettingsDefault, ...getData.noiseSettings.map(ns => `${getData.namespace}:${ns.name}`)].map(nsn =>
        <option key={nsn} value={nsn}/>)}
    </datalist>
    <datalist id={'dimension_type'}>
      {[...MinecraftDimensionTypes, ...getData.dimensionType.map(dt => `${getData.namespace}:${dt.name}`)].map(dtn =>
        <option key={dtn} value={dtn}/>)}
    </datalist>
  </MainTemplate>
}
export default DimensionsPage;