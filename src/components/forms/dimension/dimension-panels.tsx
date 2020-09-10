import {FC, useState} from 'react';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {DimensionForm} from './dimension.form';
import {Dimension} from '../../../interface/dimension';
import {generateSeed} from '../../../utils/math.utils';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';

interface DimensionPanelsProps {
  dimensions: Dimension[];
  onChange: (dims: Dimension[]) => void;
  customBiomes: string[];
}

export const DimensionPanels: FC<DimensionPanelsProps> = props => {
  const {onChange, dimensions, customBiomes} = props;
  const [getId, setId] = useState<number>(1);

  const createDimension = () => {
    onChange([
      {
        id: getId,
        name: 'dimension' + getId,
        type: '',
        generator: {
          seed: generateSeed(),
          settings: ''
        }
      },
      ...dimensions
    ]);
    setId(getId + 1);
  };
  return <>
    <Flex justifyContent={['center']}>
      <Button style={{marginTop: '10px'}} onClick={() => createDimension()}>+ Add dimension +</Button>
    </Flex>
    {dimensions.map((dim, index) => {
      return <DimensionForm
        onRemove={() => onChange(removeItemInArray(dimensions, index))}
        key={dim.id}
        dimension={dim}
        customBiomes={customBiomes}
        onChange={value => onChange(updateItemInArray(dimensions, index, value))}
      />
    })}
  </>
};
