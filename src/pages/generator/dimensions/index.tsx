import {FormEvent, useState} from 'react';
import {Data} from '../../../interface/data';
import {Button} from '../../../components/button';
import {Dimension} from '../../../interface/dimension';
import {DimensionForm} from '../../../components/forms';
import {MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';
import {LabelWrapper} from '../../../components/label-wrapper';
import {Input} from '../../../components/input';
import {Flex} from '../../../components/flex';
import {generateSeed} from '../../../utils/math.utils';
import styled from 'styled-components';
import {MainTemplate} from '../../../components/template/main.template';
import {biomes} from '../../../interface/biome';
import {noiseSettingsDefault} from '../../../interface/noise-settings';

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
  const createDimensionType = () => {
    const currentId = getId;
    setId(currentId + 1);
    setData({
      ...getData,
      dimensionType: [
        ...getData.dimensionType,
        {
          id: currentId,
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
    })
  }
  const createDimension = () => {
    const currentId = getId;
    setId(currentId + 1);
    setData({
      ...getData,
      dimensions: [
        ...getData.dimensions,
        {
          id: currentId,
          name: '',
          type: '',
          generator: {
            seed: generateSeed(),
            settings: ''
          }
        }
      ]
    })
  };
  const updateDimension = (index: number, dimension: Dimension) => {
    setData({
      ...getData,
      dimensions: [
        ...getData.dimensions.map((dim, i) => i === index ? dimension : dim),
      ]
    })
  };
  return <MainTemplate title={'Minecraft Generator dimension 1.16.2'}>
    <form onSubmit={submitData}>
      <LabelWrapper label={'Namespace'} caption={'Namespace'}>
        <Input
          required
          value={getData.namespace}
          onChange={(ev) => setData({...getData, namespace: ev.target.value})}/>
      </LabelWrapper>
      <Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button onClick={() => createDimension()}>Add dimension</Button>
            {getData.dimensions.map((dim, index) => {
              return <DimensionForm
                onRemove={() => setData({
                  ...getData, dimensions: [
                    ...getData.dimensions.filter((_, i) => i !== index),
                  ]
                })}
                key={dim.id}
                dimension={dim}
                onChange={(d) => updateDimension(index, d)}
              />
            })}
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button onClick={() => createDimensionType()}>Add dimension type</Button>
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button>Add noise settings</Button>
          </ExtendedDiv>
        </Flex>
        <Flex col={[12, 12, 3]}>
          <ExtendedDiv>
            <Button>Add biome</Button>
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