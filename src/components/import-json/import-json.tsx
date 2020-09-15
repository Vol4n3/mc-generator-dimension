import {FC, FormEvent} from 'react';
import {Input} from '../input';
import {LabelWrapper} from '../label-wrapper';

interface ImportJsonProps {
  onChange: (data: Object) => void
}

export const ImportJson: FC<ImportJsonProps> = props => {
  const {onChange} = props;
  const emitFile = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (!files) {
      return
    }
    const file = files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', () => {
      if (reader.result) {
        const json = JSON.parse(reader.result as string);
        const withName = {...json, name: file.name.replace('.json', '')}
        onChange(withName);
      }
    })
  }
  return <LabelWrapper
    label={'Import from json file'}
    caption={'make sure json have all required fields'}>
    <Input type={'file'} accept={'.json'} onChange={emitFile}/>
  </LabelWrapper>
}