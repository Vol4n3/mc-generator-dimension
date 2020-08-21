import {Dimension} from '../../interface/dimension';
import {FC} from 'react';
import {LabelWrapper} from '../label-wrapper';

export interface DimensionFormProps {
  dimension: Dimension;
  onChange: (d: Dimension) => void;
  dimensionsTypes: string[];
}

export const DimensionForm: FC<DimensionFormProps> = props => {
  const {dimension, onChange} = props;
  return <div>
    <LabelWrapper label={'Dimension Name'}>
      <input
        value={dimension.name || ''}
        onChange={(e) => onChange({...dimension, name: e.target.value})}/>
    </LabelWrapper>
  </div>
};