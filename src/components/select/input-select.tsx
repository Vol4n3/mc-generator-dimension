import {FC, InputHTMLAttributes} from 'react';
import {Input} from '../input';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';

export interface InputSelectProps extends LabelWrapperProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  onChange: (value: string) => void;
  options: string[];
  uid: string;
  value: string
}

export const InputSelect: FC<InputSelectProps> = props => {
  const {children, value, options, caption, label, onChange, uid, ...rest} = props;
  return <LabelWrapper label={label} caption={caption}>
    <Input {...rest} list={uid} type={'text'} value={value} onChange={(event => onChange(event.target.value))}/>
    <datalist id={uid}>
      {options.map((item, i) => <option key={i} value={item}/>)}
    </datalist>
  </LabelWrapper>
}