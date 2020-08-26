import {FormEvent, useState} from 'react';
import {Data} from '../../../interface/data';
import {Button} from '../../../components/button';
import {Dimension, DimensionGenerator, DimensionGeneratorType} from '../../../interface/dimension';
import {DimensionForm} from '../../../components/forms';
import {MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';
import {LabelWrapper} from '../../../components/label-wrapper';
import {Input} from '../../../components/input';
import {generateSeed} from '../../../utils/math.utils';
import {Flex} from '../../../components/flex';

const DimensionsPage = () => {
  const [getData, setData] = useState<Data>({
    dimensions: [],
    dimensionType: [],
    namespace: 'generator'
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
  const createDimension = (type: DimensionGeneratorType) => {
    let generator: DimensionGenerator = {
      seed: generateSeed(),
      settings: '',
      type,
    }
    const currentId = getId;
    setId(currentId + 1);
    if (type === 'minecraft:flat') {
      generator = {
        ...generator,
        settings: {
          biome: '',
          features: [],
          layers: [],
          structures: {}
        }
      }
    } else {
      generator = {
        ...generator,
        biome_source: {
          seed: generateSeed(),
          type: ''
        }

      }
    }
    setData({
      ...getData,
      dimensions: [
        ...getData.dimensions,
        {
          id: currentId,
          name: '',
          type: '',
          generator
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
  return <form onSubmit={submitData}>
    <LabelWrapper label={'Namespace'} caption={'Choisir un namespace'}>
      <Input
        required
        value={getData.namespace}
        onChange={(ev) => setData({...getData, namespace: ev.target.value})}/>
    </LabelWrapper>
    <Flex>
      <Flex col>
        <Button onClick={() => createDimension('minecraft:noise')}>Ajouter une dimension Noise</Button>
      </Flex>
      <Flex col>
        <Button onClick={() => createDimension('minecraft:flat')}>Ajouter une dimension Flat</Button>
      </Flex>
      <Flex col>
        <Button onClick={() => createDimensionType()}>Ajouter une config de dim</Button>
      </Flex>
      <Flex col>
        <Button onClick={() => createDimension('minecraft:flat')}>Ajouter une dimension Flat</Button>
      </Flex>
    </Flex>
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
        dimensionsTypes={[...MinecraftDimensionTypes, ...getData.dimensionType.map(dt => `${getData.namespace}:${dt.name}`)]}
      />
    })}
    <Button type={'submit'}>Export</Button>
  </form>
}
export default DimensionsPage;