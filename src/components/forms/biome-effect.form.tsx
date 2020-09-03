import {FC} from 'react';
import {BiomeEffects} from '../../interface/biome';

interface BiomeEffectFormProps {
  biomeEffects: BiomeEffects;
  onChange: (biomeEffects: BiomeEffects)=>void;
}

export const BiomeEffectForm: FC<BiomeEffectFormProps> = props => {
  const {} = props;
  return <div/>
};