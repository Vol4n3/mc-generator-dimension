import {FC, useState} from 'react';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';
import {Select} from '../select/select';
import {Option} from '../../interface/ui';
import {Flex} from '../flex';
import {TagCloud} from '../tag-cloud';

interface MultiSelectProps extends LabelWrapperProps {
  values: string[],
  options: Option<string>[],
  onChange: (values: string[]) => void;

}

export const MultiSelect: FC<MultiSelectProps> = props => {
  const {options, values, onChange, label, caption} = props;
  const [getSelected, setSelected] = useState<string>('');
  const emitAdd = (value: string) => {
    if(value){
      onChange([...values, value]);
      setSelected('');
    }
  }
  return <LabelWrapper label={label} caption={caption}>
    <Flex>
        <Select
          options={options.filter(item => !values.some(compare => item.value === compare))}
          value={getSelected}
          onSelected={(value) => emitAdd(value)}/>
    </Flex>
    <hr/>
    <TagCloud
      value={values}
      onChange={(val) => onChange(val)}/>
  </LabelWrapper>
}