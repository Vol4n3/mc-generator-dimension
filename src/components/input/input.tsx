import {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input: FC<InputProps> = props => {
  const {children, ...rest} = props;
  return <>
    <input {...rest}/>
  </>
}