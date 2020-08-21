import {FC} from 'react';
import {ExcludeChildrenByType, QueryChildrenByType} from '../../utils/react.utils';
import {LabelWrapperLabel} from './label-wrapper-label';
import {LabelWrapperCaption} from './label-wrapper-caption';

export interface LabelWrapperProps {
  label?: string;
  caption?: string;
}

export const LabelWrapper: FC<LabelWrapperProps> = props => {
  const {children, label, caption} = props;

  const labelChild = QueryChildrenByType(children, LabelWrapperLabel);
  const captionChild = QueryChildrenByType(children, LabelWrapperCaption);
  const filterChildren = ExcludeChildrenByType(children, [LabelWrapperCaption, LabelWrapperLabel]);
  return <div>
    {labelChild || <LabelWrapperLabel>{label}</LabelWrapperLabel>}
    {filterChildren}
    {captionChild || <LabelWrapperCaption>{caption}</LabelWrapperCaption>}
  </div>
}