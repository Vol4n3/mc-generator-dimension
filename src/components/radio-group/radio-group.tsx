import {InputHTMLAttributes} from 'react';
import {Input} from '../input';
import styled from 'styled-components';
import {Option} from '../../interface/ui';



interface RadioGroupProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  options: Option<T>[];
  onChecked: (value: T) => void;
  selected?: T;
  name: string;
}

const Wrapper = styled.div`
  border: 1px solid #ccc;
`;
const Label = styled.label`
  display: block;
`;
export const RadioGroup = <T extends any>(props: RadioGroupProps<T>) => {
  const {children, options, onChecked, selected, ...rest} = props;
  return <Wrapper>
    {
      options.map((o, index) => {
        return <Label key={index}>
          <Input
            {...rest}
            type={'radio'}
            checked={o.value === selected || Object.is(o.value, selected) || false}
            required
            onChange={() =>  onChecked(o.value)}
          />
          <span>{o.label}</span>
        </Label>;
      })}
  </Wrapper>
}