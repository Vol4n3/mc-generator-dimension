import {FC, FormEvent, useState} from 'react';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {DimensionTypeForm} from './dimension-type.form';
import {DimensionType} from '../../../interface/dimension-type';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';

interface DimensionTypePanelProps {
  dimensionTypes: DimensionType[];
  onSubmit: (dts: DimensionType[]) => void;
}

export const DimensionTypePanels: FC<DimensionTypePanelProps> = props => {
  const {onSubmit, dimensionTypes} = props;
  const [getId, setId] = useState<number>(dimensionTypes[0] ? dimensionTypes[0].id + 1 : 1);
  const [getDimensionTypes, setDimensionTypes] = useState<DimensionType[]>(dimensionTypes);
  const createDimensionType = () => {
    setDimensionTypes([
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
      ...getDimensionTypes
    ]);
    setId(getId + 1);
  };
  const emitSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(getDimensionTypes);
  }
  return <form onSubmit={emitSubmit}>
    <Flex justifyContent={['center']}>
      <Button onClick={() => createDimensionType()}>Add new dimension type </Button>
      <Button type={'submit'} disabled={!getDimensionTypes.length}>Save</Button>
    </Flex>
    {getDimensionTypes.map((dim, index) =>
      <DimensionTypeForm
        onRemove={() => setDimensionTypes(removeItemInArray(getDimensionTypes, index))}
        key={dim.id}
        dimensionType={dim}
        onChange={value => setDimensionTypes(updateItemInArray(getDimensionTypes, index, value))}
      />)}
  </form>
};
