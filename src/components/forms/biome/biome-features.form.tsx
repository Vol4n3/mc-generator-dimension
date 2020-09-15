import {FC} from 'react';
import {MultiSelect} from '../../multi-select/multi-select';
import {BiomeFeaturesLevel} from '../../../interface/biome';
import {updateItemInArray} from '../../../utils/object.manipulation';
import {Flex} from '../../flex';
import {
  LAKES_FEATURES,
  LOCAL_MODIFICATIONS_FEATURES,
  RAW_GENERATION_FEATURES,
  STRONGHOLDS_FEATURES,
  SURFACE_STRUCTURES_FEATURES,
  TOP_LAYER_FEATURES,
  UNDERGROUND_DECORATION_FEATURES,
  UNDERGROUND_ORES_FEATURES,
  UNDERGROUND_STRUCTURES_FEATURES,
  VEGETAL_DECORATION_FEATURES
} from '../../../interface/biome-features';

interface BiomeFeaturesFormProps {
  biomeFeatures: BiomeFeaturesLevel;
  onChange: (bf: BiomeFeaturesLevel) => void
}

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
];
const featuresOptions: string[][] = [
  RAW_GENERATION_FEATURES,
  LAKES_FEATURES,
  LOCAL_MODIFICATIONS_FEATURES,
  UNDERGROUND_STRUCTURES_FEATURES,
  SURFACE_STRUCTURES_FEATURES,
  STRONGHOLDS_FEATURES,
  UNDERGROUND_ORES_FEATURES,
  UNDERGROUND_DECORATION_FEATURES,
  VEGETAL_DECORATION_FEATURES,
  TOP_LAYER_FEATURES
];

export const BiomeFeaturesForm: FC<BiomeFeaturesFormProps> = props => {
  const {biomeFeatures, onChange} = props;
  return <>
    <h4>Features</h4>
    <Flex>
      {featuresPossibleLevel.map((level, index) =>
        <Flex key={level.label} col={[12, 6, 4, 3]}>
          <MultiSelect
            label={level.label}
            caption={level.caption}
            values={biomeFeatures[index]}
            uid={level.label}
            options={featuresOptions[index]}
            onChange={values => onChange(updateItemInArray(biomeFeatures, index, values) as BiomeFeaturesLevel)}/>
        </Flex>
      )}
    </Flex>
  </>;
};
