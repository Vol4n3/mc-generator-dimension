import {FC} from 'react';
import {BiomeWithParams} from '../../interface/dimension';
import {parseInput} from '../../utils/math.utils';
import {Card} from '../card/card';
import {InputLabel} from '../input/input-label';

interface BiomeSettingsFormProps {
  onChange: (e: BiomeWithParams) => void;
  value: BiomeWithParams;
  onClose: () => void;
}

export const BiomeSettingsForm: FC<BiomeSettingsFormProps> = props => {
  const {onClose, value, onChange} = props;
  return <Card onClose={onClose} bgColor={"#ccc"}>
    <InputLabel
      label={'Biome'}
      type={'text'}
      list={'biomes'}
      required
      onChange={e => onChange({...value, biome: e.target.value})}/>
    <span>Parameters</span>
    <InputLabel label={'altitude'} type={'number'}
                required
                value={value.parameters.altitude}
                onChange={e => onChange({
                  ...value,
                  parameters: {...value.parameters, altitude: parseInput(e.target.value, -2, 2)}
                })}/>
    <InputLabel
      label={'humidity'}
      type={'number'}
      required
      value={value.parameters.humidity}
      onChange={e => onChange({
        ...value,
        parameters: {...value.parameters, humidity: parseInput(e.target.value)}
      })}/>
    <InputLabel
      label={'temperature'}
      type={'number'}
      required
      value={value.parameters.temperature}
      onChange={e => onChange({
        ...value,
        parameters: {...value.parameters, temperature: parseInput(e.target.value)}
      })}/>
    <InputLabel
      label={'weirdness'}
      type={'number'}
      required
      value={value.parameters.weirdness}
      onChange={e => onChange({
        ...value,
        parameters: {...value.parameters, weirdness: parseInput(e.target.value, -2, 2)}
      })}/>
    <InputLabel
      label={'offset'}
      type={'number'}
      required
      value={value.parameters.offset}
      onChange={e => onChange({
        ...value,
        parameters: {...value.parameters, offset: parseInput(e.target.value, 0, 1)}
      })}/>
  </Card>
}