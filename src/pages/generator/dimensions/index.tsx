import {useState} from 'react';
import {Data} from '../../../interface/data';
import {Button} from '../../../components/button/button';
import {Dimension} from '../../../interface/dimension';
import {DimensionForm} from '../../../components/dimension/dimension.form';
import {MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';

const DimensionsPage = () => {
  const [getData, setData] = useState<Data>({
    dimensions: [],
    dimensionType: [],
    namespace: 'generator'
  })
  const createDimension = () => {
    setData({
      ...getData,
      dimensions: [
        ...getData.dimensions,
        {
          name: ''
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
  }
  return <div>
    <Button onClick={() => createDimension()}>Ajouter une dimension</Button>
    {getData.dimensions.map((dim, index) => {
      return <DimensionForm
        key={index}
        dimension={dim}
        onChange={(d) => updateDimension(index, d)}
        dimensionsTypes={[...MinecraftDimensionTypes,...getData.dimensionType.map(dt=>`${getData.namespace}:${dt.name}`)]}
      >{dim.name}</DimensionForm>
    })}
    <Button onClick={()=>exportFiles(getData)}>Export</Button>
  </div>
}
export default DimensionsPage;