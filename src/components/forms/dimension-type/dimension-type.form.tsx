import {FC} from 'react';
import {DimensionType} from '../../../interface/dimension-type';
import {Card} from '../../card/card';
import {LabelWrapper} from '../../label-wrapper';
import {Input} from '../../input';
import {parseInput} from '../../../utils/math.utils';
import {Select} from '../../select/select';
import {InputLabel} from '../../input/input-label';
import {InputCheckboxLabel} from '../../input/input-checkbox-label';

export interface DimensionTypeFormProps {
  dimensionType: DimensionType;
  onChange: (d: DimensionType) => void;
  onRemove: () => void;
}

export const DimensionTypeForm: FC<DimensionTypeFormProps> = props => {
  const {dimensionType, onChange, onRemove} = props;
  return <Card onClose={onRemove} bgColor={'#dff'}>
    <InputLabel
      label={"Name"}
      type={'text'}
      required
      value={dimensionType.name}
      onChange={e => onChange({...dimensionType, name: e.target.value})}/>
    <InputCheckboxLabel
      label={'Ultrawarm'}
      caption={"Whether the dimensions behaves like the nether (water evaporates and sponges dry) or not. Also causes lava to spread thinner."}
      onChange={e => onChange({...dimensionType, ultrawarm: e})}
      value={dimensionType.ultrawarm}>
    </InputCheckboxLabel>
    <InputCheckboxLabel
      label={'Natural'}
      caption={"When false, compasses spin randomly. When true, nether portals can spawn zombified piglins."}
      onChange={e => onChange({...dimensionType, natural: e})}
      value={dimensionType.natural}>
    </InputCheckboxLabel>
    <InputLabel
      label={"coordinate_scale"}
      caption={'The multiplier applied to coordinates when traveling to the dimension.'}
      type={'number'}
      required
      value={dimensionType.coordinate_scale}
      onChange={e => onChange({...dimensionType, coordinate_scale: parseInput(e.target.value, 1)})}/>
    <InputCheckboxLabel
      label={'has_skylight'}
      caption={"Whether the dimension has skylight access or not."}
      onChange={e => onChange({...dimensionType, has_skylight: e})}
      value={dimensionType.has_skylight}>
    </InputCheckboxLabel>
    <InputCheckboxLabel
      label={'has_ceiling'}
      caption={"Whether the dimension has a bedrock ceiling or not. When true, causes lava to spread faster."}
      onChange={e => onChange({...dimensionType, has_ceiling: e})}
      value={dimensionType.has_ceiling}>
    </InputCheckboxLabel>
    <InputLabel
      label={"ambient_light"}
      caption={' How much light the dimension has, default is 0.5 in the demo file (for upper and lower bounds as well as precise effect'}
      type={'number'}
      required
      value={dimensionType.ambient_light}
      onChange={e => onChange({...dimensionType, ambient_light: parseInput(e.target.value, 0)})}/>

    <LabelWrapper
      caption={"Can be false or any integer from 0 to 24000. If this is set to a number, the time of the day is the specified value. However, in at least some worlds,[needs testing] false is interpreted as 0, giving constant sunrise. To ensure a normal time cycle, leave the attribute undefined (i.e, do not include it)."}>
      <label>
        <Input type={'checkbox'}
               value={"fixed_time "}
               checked={typeof dimensionType.fixed_time !== 'undefined'}
               onChange={e => {
                 if (e.target.checked) {
                   onChange({...dimensionType, fixed_time: 0});
                 } else {
                   const {fixed_time, ...extract} = dimensionType;
                   onChange(extract);
                 }
               }}/>
        <span>fixed_time </span>
      </label>{
      typeof dimensionType.fixed_time !== 'undefined' && <Input
        type={'number'}
        required
        value={dimensionType.fixed_time}
        onChange={e => onChange({
          ...dimensionType,
          fixed_time: parseInput(e.target.value, 0, 24000)
        })}/>}
    </LabelWrapper>
    <InputCheckboxLabel
      label={'piglin_safe'}
      caption={"Whether piglins shake and transform to zombified piglins."}
      onChange={e => onChange({...dimensionType, piglin_safe: e})}
      value={dimensionType.piglin_safe}>
    </InputCheckboxLabel>
    <InputCheckboxLabel
      label={'bed_works'}
      caption={"Whether players can use a bed to sleep."}
      onChange={e => onChange({...dimensionType, bed_works: e})}
      value={dimensionType.bed_works}>
    </InputCheckboxLabel>
    <InputCheckboxLabel
      label={'respawn_anchor_works'}
      caption={"Whether players can charge and use respawn anchors."}
      onChange={e => onChange({...dimensionType, respawn_anchor_works: e})}
      value={dimensionType.respawn_anchor_works}>
    </InputCheckboxLabel>
    <InputCheckboxLabel
      label={'has_raids'}
      caption={"Whether players with the Bad Omen effect can cause a raid"}
      onChange={e => onChange({...dimensionType, has_raids: e})}
      value={dimensionType.has_raids}>
    </InputCheckboxLabel>
    <InputLabel
      label={"logical_height"}
      caption={'The maximum height to which chorus fruits and nether portals can bring players within this dimension. This excludes portals that were already built above the limit as they still connect normally.'}
      type={'number'}
      required
      value={dimensionType.logical_height}
      onChange={e => onChange({...dimensionType, logical_height: parseInput(e.target.value, 1, 256)})}/>
    <LabelWrapper
      caption={" A resource location defining what block tag to use for infiniburn"}>
      <Select value={dimensionType.infiniburn}
              options={[
                {value: "minecraft:infiniburn_end", label: 'infiniburn End'},
                {value: "minecraft:infiniburn_nether", label: 'infiniburn Nether'},
                {value: "minecraft:infiniburn_overworld", label: 'infiniburn overworld'},
              ]}
              required
              onSelected={e => onChange({...dimensionType, infiniburn: e})}/>
    </LabelWrapper>
  </Card>
}
