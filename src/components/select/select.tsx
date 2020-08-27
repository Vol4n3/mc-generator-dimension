import {FC, SelectHTMLAttributes} from 'react';
import {Option} from '../../interface/ui';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option<string>[];
  onSelected: (value: string) => void;
}

export const Select: FC<SelectProps> = props => {
  const {children, onSelected, options, ...rest} = props;
  return <select {...rest as any}
                 onChange={e => onSelected(e.target.value)}>
    <option value={''}>--None--</option>
    {options.map((d) => <option
      key={d.value}
      value={d.value}>
      {d.label}
    </option>)}
  </select>
}