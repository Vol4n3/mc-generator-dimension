import {FC, FormEvent, useState} from 'react';
import {Flex} from '../../flex';
import {Button} from '../../button';
import {removeItemInArray, updateItemInArray} from '../../../utils/object.manipulation';
import {NoiseSettings} from '../../../interface/noise-settings';
import {NoiseSettingsForm} from './noise-settings.form';
import {ImportJson} from '../../import-json/import-json';

interface NoiseSettingsPanelsProps {
  noiseSettings: NoiseSettings[];
  onSubmit: (nss: NoiseSettings[]) => void;
}

export const NoiseSettingsPanels: FC<NoiseSettingsPanelsProps> = props => {
  const {onSubmit, noiseSettings} = props;
  const [getId, setId] = useState<number>(noiseSettings[0] ? noiseSettings[0].id + 1 : 1);
  const [getNoiseSettings, setNoiseSettings] = useState<NoiseSettings[]>(noiseSettings);
  const create = () => {
    setNoiseSettings([
      {
        id: getId,
        name: 'noise_settings' + getId,
        bedrock_floor_position: 0,
        bedrock_roof_position: 0,
        default_block: {
          Name: 'minecraft:stone'
        },
        default_fluid: {
          Properties: {
            level: "0"
          },
          Name: 'minecraft:water'
        },
        disable_mob_generation: false,
        noise: {
          amplified: false,
          random_density_offset: true,
          density_factor: 1.0,
          density_offset: -0.46875,
          simplex_surface_noise: true,
          bottom_slide: {
            target: -30,
            size: 0,
            offset: 0
          },
          size_horizontal: 1,
          size_vertical: 2,
          height: 256,
          sampling: {
            xz_scale: 0.9999999814507745,
            y_scale: 0.9999999814507745,
            xz_factor: 80.0,
            y_factor: 160.0
          },
          top_slide: {
            target: -10,
            size: 3,
            offset: 0
          }
        },
        sea_level: 63,
        structures: {
          "stronghold": {
            "distance": 32,
            "spread": 3,
            "count": 128
          },
          "structures": {
            "minecraft:buried_treasure": {
              "spacing": 1,
              "separation": 0,
              "salt": 0
            },
            "minecraft:ruined_portal": {
              "spacing": 40,
              "separation": 15,
              "salt": 34222645
            },
            "minecraft:mansion": {
              "spacing": 80,
              "separation": 20,
              "salt": 10387319
            },
            "minecraft:nether_fossil": {
              "spacing": 2,
              "separation": 1,
              "salt": 14357921
            },
            "minecraft:endcity": {
              "spacing": 20,
              "separation": 11,
              "salt": 10387313
            },
            "minecraft:igloo": {
              "spacing": 32,
              "separation": 8,
              "salt": 14357618
            },
            "minecraft:fortress": {
              "spacing": 27,
              "separation": 4,
              "salt": 30084232
            },
            "minecraft:bastion_remnant": {
              "spacing": 27,
              "separation": 4,
              "salt": 30084232
            },
            "minecraft:swamp_hut": {
              "spacing": 32,
              "separation": 8,
              "salt": 14357620
            },
            "minecraft:monument": {
              "spacing": 32,
              "separation": 5,
              "salt": 10387313
            },
            "minecraft:pillager_outpost": {
              "spacing": 32,
              "separation": 8,
              "salt": 165745296
            },
            "minecraft:ocean_ruin": {
              "spacing": 20,
              "separation": 8,
              "salt": 14357621
            },
            "minecraft:mineshaft": {
              "spacing": 1,
              "separation": 0,
              "salt": 0
            },
            "minecraft:village": {
              "spacing": 32,
              "separation": 8,
              "salt": 10387312
            },
            "minecraft:shipwreck": {
              "spacing": 24,
              "separation": 4,
              "salt": 165745295
            },
            "minecraft:desert_pyramid": {
              "spacing": 32,
              "separation": 8,
              "salt": 14357617
            },
            "minecraft:stronghold": {
              "spacing": 1,
              "separation": 0,
              "salt": 0
            },
            "minecraft:jungle_pyramid": {
              "spacing": 32,
              "separation": 8,
              "salt": 14357619
            }
          }
        },
      },
      ...getNoiseSettings
    ]);
    setId(getId + 1);
  };

  const emitSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(getNoiseSettings);
  }
  const fromFile = (json: Object) => {
    setNoiseSettings([{
      ...json,
      id: getId
    } as NoiseSettings,
      ...getNoiseSettings]);
    setId(getId + 1);
  }
  return <form onSubmit={emitSubmit}>
    <ImportJson onChange={fromFile}/>
    <Flex justifyContent={['center']}>
      <Button onClick={create}>add new Noises</Button>
      <Button type={'submit'} disabled={!getNoiseSettings.length}>Save</Button>
    </Flex>
    {getNoiseSettings.map((noiseSettings, index) => <NoiseSettingsForm
      key={noiseSettings.id}
      noiseSettings={noiseSettings}
      onRemove={() => setNoiseSettings(removeItemInArray(getNoiseSettings, index))}
      onChange={ns => setNoiseSettings(updateItemInArray(getNoiseSettings, index, ns))}
    />)}
  </form>
};
