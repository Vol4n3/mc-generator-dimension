import {FC, useState} from 'react';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {DimensionTypeForm} from './dimension-type.form';
import {DimensionType} from '../../../interface/dimension-type';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';

interface DimensionTypePanelProps {
  dimensionTypes: DimensionType[];
  onChange: (dts: DimensionType[]) => void;
}

export const DimensionTypePanels: FC<DimensionTypePanelProps> = props => {
  const {onChange, dimensionTypes} = props;
  const [getId, setId] = useState<number>(1);
  const createDimensionType = () => {
    onChange([
      {
        id: getId,
        name: 'dimension_type' + getId,
        ambient_light: 0.5,
        bed_works: true,
        coordinate_scale: 1,
        has_skylight: true,
        has_ceiling: true,
        piglin_safe: true,
        has_raids: true,
        infiniburn: 'minecraft:infiniburn_overworld',
        logical_height: 256,
        natural: true,
        ultrawarm: false,
        respawn_anchor_works: true
      },
      ...dimensionTypes
    ]);
    setId(getId + 1);
  };
  return <>
    <Flex justifyContent={['center']}>
      <Button onClick={() => createDimensionType()} style={{marginTop: '10px'}}>+ Add dimension type +</Button>
    </Flex>
    {dimensionTypes.map((dim, index) =>
      <DimensionTypeForm
        onRemove={() => onChange(removeItemInArray(dimensionTypes, index))}
        key={dim.id}
        dimensionType={dim}
        onChange={value => onChange(updateItemInArray(dimensionTypes, index, value))}
      />)}
  </>
};
