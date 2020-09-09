import {ButtonHTMLAttributes, FC} from 'react';
import styled from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const StyledButton = styled.button<ButtonProps>`
font-size: 1rem;
padding: 3px 10px;
border: none;
cursor: ${({active}) => active ? 'initial' : 'pointer'};
background-color: ${({active}) => active ? '#858585' : '#ff9447'};
color: white;
transition: all ease-in-out 200ms;
&:hover{
background-color: ${({active}) => active ? '#858585' : '#fda060'};
box-shadow: ${({active}) => active ? 'none' : '0 0 3px 3px rgba(0,0,0,0.1)'};
}
`;
export const Button: FC<ButtonProps> = props => {
  const {children, ...rest} = props;
  return <StyledButton type={'button'} {...rest}>
    {children}
  </StyledButton>
}