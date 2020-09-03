import {FC, FormEvent} from 'react';
import {Input, InputProps} from './input';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';


interface InputCheckboxLabelProps extends Omit<InputProps, 'onChange' | 'value'>, LabelWrapperProps {
  onChange: (e: boolean) => void;
  value: boolean;
}

export const InputCheckboxLabel: FC<InputCheckboxLabelProps> = props => {
  const {label, caption, onChange, value, type, ...rest} = props;
  const emitChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    onChange(target.checked);
  }
  return <LabelWrapper {...{caption}}>
    <label>
      <Input {...rest}
             type={'checkbox'}
             onChange={emitChange}
             checked={value}/>
      <span>{label}</span>
    </label>
  </LabelWrapper>
}