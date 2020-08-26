import {InputHTMLAttributes} from 'react';
import {Input} from '../input';
import styled from 'styled-components';

export interface Option<T> {
  value: T;
  label: string;
}

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
  const emitChecked = (value: T) => {
    onChecked(value);
  }
  return <Wrapper>
    {
      options.map((o, index) => <Label key={index}>
        <Input
          {...rest}
          type={'radio'}
          onInput={() => emitChecked(o.value)}
          checked={Object.is(o, selected) || undefined}
          required
        />
        <span>{o.label}</span>
      </Label>)}
  </Wrapper>
}