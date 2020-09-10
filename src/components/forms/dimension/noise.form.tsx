import {FC} from 'react';
import {DimensionGenerator} from '../../../interface/dimension';
import {LabelWrapper} from '../../label-wrapper';
import {Input} from '../../input';
import {parseSeed} from '../../../utils/math.utils';
import {BiomeSourceForm} from './biome-source.form';

interface NoiseFormProps {
  generator: DimensionGenerator;
  onChange: (gen: DimensionGenerator) => void;
  customBiomes: string[]
}

export const NoiseForm: FC<NoiseFormProps> = props => {
  const {generator, onChange, customBiomes} = props;
  return <>
    <LabelWrapper label={'Generator seed'}>
      <Input
        type={'number'}
        required
        value={generator.seed}
        onChange={e => onChange({...generator, seed: parseSeed(e.target.value)})}/>
    </LabelWrapper>
    <LabelWrapper label={'Noise settings'} caption={'you can choose vanilla preset or create one'}>
      <Input
        type={'text'}
        required
        list={'noise_settings'}
        value={generator.settings as string}
        onChange={(e) => onChange({...generator, settings: e.target.value})}/>
    </LabelWrapper>
    {generator.biome_source &&
    <BiomeSourceForm
      biomeSource={generator.biome_source}
      customBiomes={customBiomes}
      onChange={(bs) => onChange({...generator, biome_source: bs})
      }/>}
  </>
}
