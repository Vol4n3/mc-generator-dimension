import {ButtonHTMLAttributes, FC} from 'react';
import styled from 'styled-components';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}
const StyledButton = styled.button`
  
`;
export const Button: FC<ButtonProps> = props =>{
  const {children, ...rest} = props;
  return <StyledButton {...rest}>
    {children}
  </StyledButton>
}