import {FC, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const StyledInput = styled.input`
&[type="text"],&[type="number"],&:not([type]){
  width: 100%;
}
`;
export const Input: FC<InputProps> = props => {
  const {children, ...rest} = props;
  return <>
    <StyledInput {...rest}/>
  </>
}