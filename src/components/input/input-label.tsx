import {FC} from 'react';
import {Input, InputProps} from './input';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';

interface InputLabelProps extends InputProps,LabelWrapperProps {
}

export const InputLabel: FC<InputLabelProps> = props =>{
  const {label,caption,children,...rest} = props;
  return <LabelWrapper {...{label,caption}}>
    <Input {...rest}/>
  </LabelWrapper>
}