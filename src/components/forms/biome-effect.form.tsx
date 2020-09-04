import {FC} from 'react';
import {BiomeEffects, GrassColorModifier, GrassColorModifiers} from '../../interface/biome';
import {InputLabel} from '../input/input-label';
import {intToHexaColor, parseColor} from '../../utils/math.utils';
import {Select} from '../select/select';
import {LabelWrapper} from '../label-wrapper';

interface BiomeEffectFormProps {
  biomeEffects: BiomeEffects;
  onChange: (biomeEffects: BiomeEffects) => void;
}

export const BiomeEffectForm: FC<BiomeEffectFormProps> = props => {
  const {biomeEffects, onChange} = props;
  return <>
    <InputLabel
      label={'fog_color'}
      defaultValue={intToHexaColor(biomeEffects.fog_color)}
      onChange={event => onChange({...biomeEffects, fog_color: parseColor(event.target.value)})}
      type={'color'}/>
    <InputLabel
      label={'foliage_color'}
      defaultValue={intToHexaColor(biomeEffects.foliage_color)}
      onChange={event => onChange({...biomeEffects, foliage_color: parseColor(event.target.value)})}
      type={'color'}/>
    <InputLabel
      label={'grass_color'}
      defaultValue={intToHexaColor(biomeEffects.grass_color)}
      onChange={event => onChange({...biomeEffects, grass_color: parseColor(event.target.value)})}
      type={'color'}/>
    <InputLabel
      label={'sky_color'}
      defaultValue={intToHexaColor(biomeEffects.sky_color)}
      onChange={event => onChange({...biomeEffects, sky_color: parseColor(event.target.value)})}
      type={'color'}/>
    <InputLabel
      label={'water_color'}
      defaultValue={intToHexaColor(biomeEffects.water_color)}
      onChange={event => onChange({...biomeEffects, water_color: parseColor(event.target.value)})}
      type={'color'}/>
    <InputLabel
      label={'water_fog_color'}
      defaultValue={intToHexaColor(biomeEffects.water_fog_color)}
      onChange={event => onChange({...biomeEffects, water_fog_color: parseColor(event.target.value)})}
      type={'color'}/>
    <LabelWrapper label={"grass_color_modifier"}>
      <Select
        value={biomeEffects.grass_color_modifier === 'none' ? '' : biomeEffects.grass_color_modifier}
        options={GrassColorModifiers.slice(1).map(item => ({label: item, value: item}))}
        onSelected={value => onChange({
          ...biomeEffects,
          grass_color_modifier: (value ? value : 'none') as GrassColorModifier
        })}/>
    </LabelWrapper>
    {/*todo: particle*/}
    {/*todo: ambiant sound*/}
    {/*todo: mood sound*/}
    {/*todo: additional sound*/}
  </>
};