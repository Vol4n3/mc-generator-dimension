import {FC, SelectHTMLAttributes, useState} from 'react';
import {Option} from '../../interface/ui';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Input} from '../input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option<string>[];
  onSelected: (value: string) => void;
}

const SelectStyled = styled.select`
  width: 100%;
`;
export const Select: FC<SelectProps> = props => {
  const {children, onSelected, options, ...rest} = props;
  const [getFilter, setFilter] = useState<string>('');
  const filtered = (filter: string) => {
    return options.filter(item => filter ? item.label.search(filter) !== -1 : true)
  };
  return <Flex>
    <Flex noPadding col={[6]}>
      <SelectStyled {...rest as any}
                    onChange={e => onSelected(e.target.value)}>
        <option value={''}>--None--</option>
        {filtered(getFilter).map((d) => <option
          key={d.value}
          value={d.value}>
          {d.label}
        </option>)}
      </SelectStyled></Flex>
    <Flex col={[6]} noPadding>
      <Input value={getFilter} placeholder={'filter'} onChange={event => {
        setFilter(event.target.value);
      }}/>
    </Flex>

  </Flex>
}