import {ButtonHTMLAttributes, FC} from 'react';
import styled from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const StyledButton = styled.button<ButtonProps>`
font-size: 1rem;
padding: 3px 10px;
border: none;
margin: 5px;
cursor: ${({active}) => active ? 'initial' : 'pointer'};
background-color: ${({active}) => active ? '#e04d15' : '#ff9447'};
color: white;
transition: all ease-in-out 200ms;
&:not(:disabled):hover{
background-color: ${({active}) => active ? '#e04d15' : '#e04d15'};
box-shadow: ${({active}) => active ? 'none' : '0 0 3px 3px rgba(0,0,0,0.1)'};
}
&:disabled{
  background-color: #ccc;
  cursor: initial;
}
`;
export const Button: FC<ButtonProps> = props => {
  const {children, ...rest} = props;
  return <StyledButton type={'button'} {...rest}>
    {children}
  </StyledButton>
};
