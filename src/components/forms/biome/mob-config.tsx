import {FC} from 'react';
import {SpawnerConfig} from '../../../interface/biome';
import {InputLabel} from '../../input/input-label';
import {Select} from '../../select/select';
import {LabelWrapper} from '../../label-wrapper';
import {mobs, MobsType} from '../../../interface/mobs';
import {parseInput} from '../../../utils/math.utils';

interface MobConfigProps {
  config: SpawnerConfig;
  onChange: (sc: SpawnerConfig) => void;
  selected: string[];
}

export const MobConfig: FC<MobConfigProps> = props => {
  const {config, onChange, selected} = props;
  console.log(selected);
  return <>
    <LabelWrapper label={'type'} caption={'entity id of the mob'}>
      <Select
        options={mobs.filter(m => selected.filter(s => s !== config.type).indexOf(m) === -1).map(item => ({
          label: item,
          value: item
        }))}
        value={config.type}
        required
        onSelected={value => onChange({...config, type: value as MobsType})}/>
    </LabelWrapper>
    <InputLabel
      type={'number'}
      required
      onChange={event => onChange({...config, weight: parseInput(event.target.value, 1, 100)})}
      value={config.weight}
      label={'weight'}
      caption={'How often this mob should spawn, higher values produce more spawns.'}/>
    <InputLabel
      type={'number'}
      required
      onChange={event => onChange({...config, minCount: parseInput(event.target.value, 1)})}
      value={config.minCount}
      label={'minCount'}/>
    <InputLabel
      type={'number'}
      required
      min={config.minCount || 0}
      onChange={event => onChange({...config, weight: parseInput(event.target.value, config.minCount || 0)})}
      value={config.maxCount}
      label={'maxCount'}/>
  </>
};
