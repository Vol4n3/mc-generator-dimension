import {FC} from 'react';
import {BiomeWithParams} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import {parseInput} from '../../utils/math.utils';
import {Card} from '../card/card';

interface BiomeSettingsFormProps {
  onChange: (e: BiomeWithParams) => void;
  value: BiomeWithParams;
  onClose: () => void;
}

export const BiomeSettingsForm: FC<BiomeSettingsFormProps> = props => {
  const {onClose, value, onChange} = props;
  return <Card onClose={onClose} bgColor={"#ccc"}>
      <LabelWrapper label={'Biome'}>
        <Input type={'text'}
               list={'biomes'}
               required
               onChange={e => onChange({...value, biome: e.target.value})}/>
      </LabelWrapper>
      <span>Parameters</span>
      <LabelWrapper label={'altitude'}>
        <Input type={'number'}
               required
               value={value.parameters.altitude}
               onChange={e => onChange({
                 ...value,
                 parameters: {...value.parameters, altitude: parseInput(e.target.value,-2,2)}
               })}/>
      </LabelWrapper>
      <LabelWrapper label={'humidity'}>
        <Input type={'number'}
               required
               value={value.parameters.humidity}
               onChange={e => onChange({
                 ...value,
                 parameters: {...value.parameters, humidity: parseInput(e.target.value)}
               })}/>
      </LabelWrapper>

      <LabelWrapper label={'temperature'}>
        <Input type={'number'}
               required
               value={value.parameters.temperature}
               onChange={e => onChange({
                 ...value,
                 parameters: {...value.parameters, temperature: parseInput(e.target.value)}
               })}/>
      </LabelWrapper>
      <LabelWrapper label={'weirdness'}>
        <Input type={'number'}
               required
               value={value.parameters.weirdness}
               onChange={e => onChange({
                 ...value,
                 parameters: {...value.parameters, weirdness: parseInput(e.target.value,-2,2)}
               })}/>
      </LabelWrapper>
      <LabelWrapper label={'offset '}>
        <Input type={'number'}
               required
               value={value.parameters.offset }
               onChange={e => onChange({
                 ...value,
                 parameters: {...value.parameters, offset : parseInput(e.target.value,0,1)}
               })}/>
      </LabelWrapper>
    </Card>
}