import {FC, FormEvent, useState} from 'react';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {DimensionForm} from './dimension.form';
import {Dimension} from '../../../interface/dimension';
import {generateSeed} from '../../../utils/math.utils';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';
import {ImportJson} from '../../import-json/import-json';

interface DimensionPanelsProps {
  dimensions: Dimension[];
  onSubmit: (dims: Dimension[]) => void;
  customBiomes: string[];
}

export const DimensionPanels: FC<DimensionPanelsProps> = props => {
  const {onSubmit, customBiomes, dimensions} = props;
  const [getId, setId] = useState<number>(dimensions[0] ? dimensions[0].id + 1 : 1);
  const [getDimensions, setDimensions] = useState<Dimension[]>(dimensions);
  const createDimension = () => {
    setDimensions([
      {
        id: getId,
        name: 'dimension' + getId,
        type: '',
        generator: {
          seed: generateSeed(),
          settings: ''
        }
      },
      ...getDimensions
    ]);
    setId(getId + 1);
  };

  const emitSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(getDimensions);
  }
  const fromFile = (json: Object) => {
    setDimensions([{
      ...json,
      id: getId
    } as Dimension,
      ...getDimensions]);
    setId(getId + 1);
  }
  return <form onSubmit={emitSubmit}>
    <ImportJson onChange={fromFile}/>
    <Flex justifyContent={['center']}>
      <Button onClick={createDimension}>add new dimension</Button>
      <Button type={'submit'} disabled={!getDimensions.length}>Save</Button>
    </Flex>
    {getDimensions.map((dim, index) => <DimensionForm
      key={dim.id}
      dimension={dim}
      onRemove={() => setDimensions(removeItemInArray(getDimensions, index))}
      customBiomes={customBiomes}
      onChange={d => setDimensions(updateItemInArray(getDimensions, index, d))}
    />)}
  </form>
};
