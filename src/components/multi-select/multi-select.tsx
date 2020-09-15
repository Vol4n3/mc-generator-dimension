import {FC, useState} from 'react';
import {LabelWrapper, LabelWrapperProps} from '../label-wrapper';
import {TagCloud} from '../tag-cloud';
import {InputSelect} from '../select/input-select';
import {Flex} from '../flex';
import {Button} from '../button';

interface MultiSelectProps extends LabelWrapperProps {
  values: string[],
  options: string[],
  onChange: (values: string[]) => void;
  uid: string;
}

export const MultiSelect: FC<MultiSelectProps> = props => {
  const {options, values, onChange, label, caption, uid} = props;
  const [getSelected, setSelected] = useState<string>('');
  const emitAdd = (value: string) => {
    if (value) {
      onChange([...values, value]);
      setSelected('');
    }
  }
  return <LabelWrapper label={label} caption={caption}>
    <Flex alignItems={['center']} noPadding>
      <div>
        <InputSelect
          options={options.filter(item => !values.some(compare => item === compare))}
          value={getSelected}
          uid={uid}
          onChange={setSelected}/>
      </div>
      <div>
        <Button onClick={() => emitAdd(getSelected)}>+</Button>
      </div>
    </Flex>
    <TagCloud
      value={values}
      onChange={onChange}/>
  </LabelWrapper>
}