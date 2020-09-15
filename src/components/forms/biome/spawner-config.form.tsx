import {FC, useState} from 'react';
import {SpawnerConfig} from '../../../interface/biome';
import {Button} from '../../button';
import {MobConfig} from './mob-config';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';
import {Card} from '../../card/card';

interface SpawnerConfigFormProps {
  configs: SpawnerConfig[];
  onChange: (config: SpawnerConfig[]) => void
}

export const SpawnerConfigForm: FC<SpawnerConfigFormProps> = props => {
  const {configs, onChange} = props;
  const [getId, setId] = useState<number>(1);
  const addConfig = () => {
    onChange([
      {
        id: getId,
        weight: 100,
        minCount: 1,
        maxCount: 10
      }, ...configs
    ]);
    setId(getId + 1);
  };
  return <>
    <Button onClick={addConfig}>+</Button>
    {configs.map((config, index) => <Card
      key={config.id || index}
      onClose={() => onChange(removeItemInArray(configs, index))}
      bgColor={'#ffe4e8'}>
      <MobConfig
        selected={configs.map(c => c.type as string)}
        config={config}
        onChange={sc => onChange(updateItemInArray(configs, index, sc))}/>
    </Card>)}
  </>
};
