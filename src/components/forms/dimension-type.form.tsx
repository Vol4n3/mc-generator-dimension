import {FC} from 'react';
import {DimensionType} from '../../interface/dimension-type';
import {Card} from '../card/card';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import {parseInput} from '../../utils/math.utils';
import {Select} from '../select/select';

export interface DimensionTypeFormProps {
  dimensionType: DimensionType;
  onChange: (d: DimensionType) => void;
  onRemove: () => void;
}

export const DimensionTypeForm: FC<DimensionTypeFormProps> = props => {
  const {dimensionType, onChange, onRemove} = props;
  return <Card onClose={onRemove} bgColor={'#aee'}>
    <LabelWrapper label={"Name"}>
      <Input type={'text'}
             required
             value={dimensionType.name}
             onChange={e => onChange({...dimensionType, name: e.target.value})}/>
    </LabelWrapper>
    <LabelWrapper
      caption={"Whether the dimensions behaves like the nether (water evaporates and sponges dry) or not. Also causes lava to spread thinner."}>
      <label>
        <Input type={'checkbox'}
               value={"ultrawarm"}
               checked={dimensionType.ultrawarm}
               onChange={e => onChange({...dimensionType, ultrawarm: e.target.checked})}/>
        <span>Ultrawarm</span>
      </label>
    </LabelWrapper>
    <LabelWrapper
      caption={"When false, compasses spin randomly. When true, nether portals can spawn zombified piglins."}>
      <label>
        <Input type={'checkbox'}
               value={"natural"}
               checked={dimensionType.natural}
               onChange={e => onChange({...dimensionType, natural: e.target.checked})}/>
        <span>Natural</span>
      </label>
    </LabelWrapper>
    <LabelWrapper label={"coordinate_scale"}
                  caption={'The multiplier applied to coordinates when traveling to the dimension.'}>
      <Input type={'number'}
             required
             value={dimensionType.coordinate_scale}
             onChange={e => onChange({...dimensionType, coordinate_scale: parseInput(e.target.value, 1)})}/>
    </LabelWrapper>
    <LabelWrapper
      caption={"Whether the dimension has skylight access or not."}>
      <label>
        <Input type={'checkbox'}
               value={"has_skylight"}
               checked={dimensionType.has_skylight}
               onChange={e => onChange({...dimensionType, has_skylight: e.target.checked})}/>
        <span>has_skylight</span>
      </label>
    </LabelWrapper>
    <LabelWrapper
      caption={"Whether the dimension has a bedrock ceiling or not. When true, causes lava to spread faster."}>
      <label>
        <Input type={'checkbox'}
               value={"has_ceiling"}
               checked={dimensionType.has_ceiling}
               onChange={e => onChange({...dimensionType, has_ceiling: e.target.checked})}/>
        <span>has_ceiling</span>
      </label>
    </LabelWrapper>

    <LabelWrapper label={"ambient_light"}
                  caption={' How much light the dimension has, default is 0.5 in the demo file (for upper and lower bounds as well as precise effect'}>
      <Input type={'number'}
             required
             value={dimensionType.ambient_light}
             onChange={e => onChange({...dimensionType, ambient_light: parseInput(e.target.value, 0)})}/>
    </LabelWrapper>

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

    <LabelWrapper
      caption={"Whether piglins shake and transform to zombified piglins."}>
      <label>
        <Input type={'checkbox'}
               value={"piglin_safe"}
               checked={dimensionType.piglin_safe}
               onChange={e => onChange({...dimensionType, piglin_safe: e.target.checked})}/>
        <span>piglin_safe</span>
      </label>
    </LabelWrapper>

    <LabelWrapper
      caption={"Whether players can use a bed to sleep."}>
      <label>
        <Input type={'checkbox'}
               value={"bed_works"}
               checked={dimensionType.bed_works}
               onChange={e => onChange({...dimensionType, bed_works: e.target.checked})}/>
        <span>bed_works</span>
      </label>
    </LabelWrapper>

    <LabelWrapper
      caption={"Whether players can charge and use respawn anchors."}>
      <label>
        <Input type={'checkbox'}
               value={"respawn_anchor_works"}
               checked={dimensionType.respawn_anchor_works}
               onChange={e => onChange({...dimensionType, respawn_anchor_works: e.target.checked})}/>
        <span>respawn_anchor_works</span>
      </label>
    </LabelWrapper>

    <LabelWrapper
      caption={"Whether players with the Bad Omen effect can cause a raid"}>
      <label>
        <Input type={'checkbox'}
               value={"has_raids"}
               checked={dimensionType.has_raids}
               onChange={e => onChange({...dimensionType, has_raids: e.target.checked})}/>
        <span>has_raids</span>
      </label>
    </LabelWrapper>


    <LabelWrapper label={"logical_height"}
                  caption={'The maximum height to which chorus fruits and nether portals can bring players within this dimension. This excludes portals that were already built above the limit as they still connect normally.'}>
      <Input type={'number'}
             required
             value={dimensionType.logical_height}
             onChange={e => onChange({...dimensionType, logical_height: parseInput(e.target.value, 1, 256)})}/>
    </LabelWrapper>
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