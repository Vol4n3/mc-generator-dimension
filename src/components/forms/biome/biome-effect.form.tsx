import {FC, FormEvent, useRef} from 'react';
import {BiomeEffects, GrassColorModifier, GrassColorModifiers} from '../../../interface/biome';
import {InputLabel} from '../../input/input-label';
import {intToHexaColor, parseColor} from '../../../utils/math.utils';
import {Select} from '../../select/select';
import {Flex} from '../../flex';

interface BiomeEffectFormProps {
  biomeEffects: BiomeEffects;
  onChange: (biomeEffects: BiomeEffects) => void;
}

const optionGrass = GrassColorModifiers.slice(1);
export const BiomeEffectForm: FC<BiomeEffectFormProps> = props => {
  const {biomeEffects, onChange} = props;
  const refTimeout = useRef<number>(0);
  const debounceChangeColor = (event: FormEvent, key: string) => {
    const target = event.target as HTMLInputElement;
    clearInterval(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      onChange({...biomeEffects, [key]: parseColor(target.value)})
    }, 300)
  };
  return <>
    <Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'fog_color'}
          defaultValue={intToHexaColor(biomeEffects.fog_color)}
          onChange={event => debounceChangeColor(event, 'fog_color')}
          type={'color'}/>
      </Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'foliage_color'}
          defaultValue={intToHexaColor(biomeEffects.foliage_color)}
          onChange={event => debounceChangeColor(event, 'foliage_color')}
          type={'color'}/>
      </Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'grass_color'}
          defaultValue={intToHexaColor(biomeEffects.grass_color)}
          onChange={event => debounceChangeColor(event, 'grass_color')}
          type={'color'}/>
      </Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'sky_color'}
          defaultValue={intToHexaColor(biomeEffects.sky_color)}
          onChange={event => debounceChangeColor(event, 'sky_color')}
          type={'color'}/>
      </Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'water_color'}
          defaultValue={intToHexaColor(biomeEffects.water_color)}
          onChange={event => debounceChangeColor(event, 'water_color')}
          type={'color'}/>
      </Flex>
      <Flex col={[6, 4]}>
        <InputLabel
          label={'water_fog_color'}
          defaultValue={intToHexaColor(biomeEffects.water_fog_color)}
          onChange={event => debounceChangeColor(event, 'water_fog_color')}
          type={'color'}/>
      </Flex>
    </Flex>
      <Select
        label={"grass_color_modifier"}
        value={biomeEffects.grass_color_modifier === 'none' ? '' : biomeEffects.grass_color_modifier}
        options={optionGrass}
        onSelected={value => onChange({
          ...biomeEffects,
          grass_color_modifier: (value ? value : 'none') as GrassColorModifier
        })}/>
    {/*todo: particle*/}
    {/*todo: ambiant sound*/}
    {/*todo: mood sound*/}
    {/*todo: additional sound*/}
  </>
};
