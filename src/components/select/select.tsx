import {FC, SelectHTMLAttributes, useState} from 'react';
import styled from 'styled-components';
import {Flex} from '../flex';
import {Input} from '../input';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, LabelWrapperProps {
  options: string[];
  onSelected: (value: string) => void;
}

const SelectStyled = styled.select`
  width: 100%;
`;
export const Select: FC<SelectProps> = props => {
  const {children, onSelected, options, label, caption, ...rest} = props;
  const [getFilter, setFilter] = useState<string>('');
  const filtered = (filter: string) => {
    return options.filter(item => filter ? item.search(filter) !== -1 : true)
  };
  return <LabelWrapper label={label} caption={caption}>
    <Flex noPadding>
      <Flex noPadding col={[8]}>
        <SelectStyled {...rest as any}
                      onChange={e => onSelected(e.target.value)}>
          <option value={''}>--None--</option>
          {filtered(getFilter).map((d) => <option
            key={d}
            value={d}>
            {d}
          </option>)}
        </SelectStyled></Flex>
      <Flex col={[4]} noPadding>
        <Input value={getFilter} placeholder={'filter'} onChange={event => {
          setFilter(event.target.value);
        }}/>
      </Flex>
    </Flex>
  </LabelWrapper>
}