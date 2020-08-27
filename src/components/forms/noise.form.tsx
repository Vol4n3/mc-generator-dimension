import {FC} from 'react';
import {DimensionGenerator} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import {setInRange} from '../../utils/math.utils';
import {BiomeSourceForm} from './biome-source.form';

interface NoiseFormProps {
  generator: DimensionGenerator;
  onChange: (gen: DimensionGenerator) => void;
}

export const NoiseForm: FC<NoiseFormProps> = props => {
  const {generator, onChange} = props;
  const parseSeed = (value: string): number => {
    const result = parseInt(value, 10);
    return setInRange(result, -Math.pow(2, 32), Math.pow(2, 32));
  }
  return <>
    <LabelWrapper label={'Generator seed'}>
      <Input
        type={'number'}
        min={-Math.pow(2, 32)}
        max={Math.pow(2, 32)}
        value={generator.seed}
        onChange={e => onChange({...generator, seed: parseSeed(e.target.value)})}/>
    </LabelWrapper>
    {generator.biome_source &&
    <BiomeSourceForm
      biomeSource={generator.biome_source}
      onChange={(bs) => onChange({...generator, biome_source: bs})
      }/>}
  </>
}