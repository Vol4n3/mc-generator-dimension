import {FC} from 'react';
import {MultiSelect} from '../multi-select/multi-select';
import {BiomeFeaturesLevel} from '../../interface/biome';
import {BiomeFeatures} from '../../interface/biome-features';
import {Option} from '../../interface/ui';
import {updateItemInArray} from '../../utils/object.manipulation';

interface BiomeFeaturesFormProps {
  biomeFeatures: BiomeFeaturesLevel;
  onChange: (bf: BiomeFeaturesLevel) => void
}

export const BiomeFeaturesForm: FC<BiomeFeaturesFormProps> = props => {
  const {biomeFeatures, onChange} = props;
  const featuresOption: Option<string>[] = BiomeFeatures.map(item => ({label: item, value: item}));
  const featuresPossibleLevel: { label: string, caption: string }[] = [
    {label: 'RAW_GENERATION', caption: 'Used by miniature end island features by default.'},
    {label: 'LAKES', caption: 'Used by water and lava lakes by default'},
    {label: 'LOCAL_MODIFICATIONS', caption: 'Used for rocks in taigas and icebergs by default.'},
    {label: 'UNDERGROUND_STRUCTURES', caption: 'Used for rocks in taigas and icebergs by default.'},
    {label: 'SURFACE_STRUCTURES', caption: 'Used for desert wells and blue ice patches by default.'},
    {label: 'STRONGHOLDS', caption: 'Not used for any features by default.'},
    {
      label: 'UNDERGROUND_ORES',
      caption: 'Used for overworld ore veins, overworld dirt/gravel/stone variant patches, and sand/gravel/clay disks by default.'
    },
    {
      label: 'UNDERGROUND_DECORATION',
      caption: 'Used for infested block veins, nether gravel and blackstone veins, and all nether ore veins by default.'
    },
    {
      label: 'VEGETAL_DECORATION',
      caption: 'Used for trees, bamboo, cacti, kelp, and other ground and ocean vegetation, as well as lava and water springs by default.'
    },
    {label: 'TOP_LAYER_MODIFICATION', caption: 'Used for surface freezing by default.'},
  ]
  return <>
    <h4>Features</h4>
    {featuresPossibleLevel.map((level, index) =>
      <MultiSelect
        key={level.label}
        label={level.label}
        caption={level.caption}
        values={biomeFeatures[index]}
        options={featuresOption}
        onChange={values => onChange(updateItemInArray(biomeFeatures, index, values) as BiomeFeaturesLevel)}/>
    )}
  </>;

}