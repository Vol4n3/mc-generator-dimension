import {FC} from 'react';
import {Flex} from '../flex';
import {Tag} from './tag';

interface TagCloudProps {
  value: string[];
  onChange: (value: string[]) => void
}

export const TagCloud: FC<TagCloudProps> = props => {
  const {value, onChange} = props;
  const emitChange = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }
  return <Flex alignItems={['center']}>
    {value.map((item, index) => <Tag onClose={() => emitChange(index)} key={item} label={item}/>)}
  </Flex>
}