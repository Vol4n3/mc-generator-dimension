import {FC} from 'react';
import {Noise} from '../../interface/dimension';
import {LabelWrapper} from '../label-wrapper';
import {Input} from '../input';
import {parseInput} from '../../utils/math.utils';
import {Flex} from '../flex';
import styled from 'styled-components';

interface MultiNoiseParamsFormParams {
  noise: Noise;
  onChange: (noise: Noise) => void;
  label: string;
}
const Wrapper= styled.div`
border: 1px solid #ccc;
`;
export const MultiNoiseParamsForm: FC<MultiNoiseParamsFormParams> = props => {
  const {noise, onChange,label} = props;
  return <Wrapper>
    <span>{label}</span>
    <LabelWrapper label={'first Octave'}>
      <Input type={'number'} value={noise.firstOctave}
             onChange={e => onChange({...noise, firstOctave: parseInput(e.target.value)})}/>
    </LabelWrapper>
    <LabelWrapper label={'Amplitude'}>
      <Flex>
        <Flex col={[6]}>
          <Input type={'number'}
                 value={noise.amplitudes[0]}
                 required
                 onChange={e => onChange({...noise,
                   amplitudes: [parseInput(e.target.value),noise.amplitudes[1]]
                 })}/>
        </Flex>
        <Flex col={[6]}>
          <Input type={'number'}
                 value={noise.amplitudes[1]}
                 required
                 onChange={e => onChange({...noise,
                   amplitudes: [noise.amplitudes[0],parseInput(e.target.value)]
                 })
                 }/>
        </Flex>
      </Flex>
    </LabelWrapper>

  </Wrapper>
};
