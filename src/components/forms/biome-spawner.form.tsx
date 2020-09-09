import {FC} from 'react';
import {BiomeSpawners} from '../../interface/biome';
import {LabelWrapper} from '../label-wrapper';

interface BiomeSpawnerFormProps {
  spawners: BiomeSpawners;
  onChange: (bs: BiomeSpawners) => void;
}

const spawnerPossible: { label: string, caption: string, id: string }[] = [
  {label: 'monster', id: 'monster', caption: 'add monster entity'},
  {label: 'creature', id: 'creature', caption: 'add creature entity'},
  {label: 'ambient', id: 'ambient', caption: 'add ambient entity'},
  {label: 'water_creature', id: 'water_creature', caption: 'add water_creature entity'},
  {label: 'water_ambient', id: 'water_ambient', caption: 'add water_ambient entity'},
  {label: 'misc', id: 'misc', caption: 'add misc entity'}
]
export const BiomeSpawnerForm: FC<BiomeSpawnerFormProps> = props => {
  const {} = props;
  return <>
    {
      spawnerPossible.map(item => <LabelWrapper
        label={item.label} caption={item.caption} key={item.id}>
      </LabelWrapper>)
    }
  </>
}