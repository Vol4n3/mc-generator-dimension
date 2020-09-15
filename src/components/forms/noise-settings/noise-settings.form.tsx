import {FC} from 'react';
import {Card} from '../../card/card';
import {NoiseSettings} from '../../../interface/noise-settings';
import {InputLabel} from '../../input/input-label';
import {parseInput} from '../../../utils/math.utils';
import {InputCheckboxLabel} from '../../input/input-checkbox-label';
import {Select} from '../../select/select';
import {McBlocks} from '../../../interface/mc-blocks';
import {fluids} from '../../../interface/fluids';

export interface NoiseSettingsFormProps {
  noiseSettings: NoiseSettings;
  onChange: (d: NoiseSettings) => void;
  onRemove: () => void;
}


export const NoiseSettingsForm: FC<NoiseSettingsFormProps> = props => {
  const {onChange, onRemove, noiseSettings} = props;

  return <Card onClose={onRemove} bgColor={'#ecc'}>
    <InputLabel
      value={noiseSettings.bedrock_roof_position}
      required
      onChange={event => onChange({...noiseSettings, bedrock_roof_position: parseInput(event.target.value)})}
      caption={'The distance from the world height for the top coordinate of the bedrock roof, if out of world bounds (0-255) the roof does not appear, example: "-1". e.g. setting this to 32 puts the top of the roof at y=224. If the bedrock roof is low enough, natural terrain still generates above it.'}
      label={'bedrock_roof_position'}/>
    <InputLabel
      value={noiseSettings.bedrock_floor_position}
      required
      onChange={event => onChange({...noiseSettings, bedrock_floor_position: parseInput(event.target.value)})}
      caption={'The y coordinate of the bedrock floor, similar to bedrock_roof_position – setting both floor and roof to 255 generates a single layer of flat bedrock for each of them.'}
      label={'bedrock_floor_position'}/>
    <InputLabel
      value={noiseSettings.sea_level}
      required
      onChange={event => onChange({...noiseSettings, sea_level: parseInput(event.target.value, 0, 255)})}
      caption={'The sea level in this dimension between 0 and 255'}
      label={'sea_level'}/>
    <InputCheckboxLabel
      label={'disable_mob_generation'}
      onChange={e => onChange({...noiseSettings, disable_mob_generation: e})}
      value={noiseSettings.disable_mob_generation}/>
    {/*todo: structure*/}
    {/* noise*/}
    <Select
      label={'The block that appears below the top blocks of the world'}
      options={McBlocks}
      onSelected={(value) => onChange({...noiseSettings, default_block: {Name: value}})}
      value={noiseSettings.default_block.Name}/>
    <Select
      label={'The block used for seas and lakes'}
      options={fluids}
      onSelected={(value) => onChange({...noiseSettings, default_fluid: {...noiseSettings.default_fluid, Name: value}})}
      value={noiseSettings.default_block.Name}/>
  </Card>
};
