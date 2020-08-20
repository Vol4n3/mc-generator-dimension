import {FC} from 'react';
import {ExcludeChildrenByType, QueryChildrenByType} from '../../utils/react.utils';
import {LabelWrapperLabel} from './label-wrapper-label';
import {LabelWrapperCaption} from './label-wrapper-caption';

export interface LabelWrapperProps {

}

export const LabelWrapper: FC<LabelWrapperProps> = props => {
  const {children} = props;

  const labelChild = QueryChildrenByType(children, LabelWrapperLabel);
  const captionChild = QueryChildrenByType(children, LabelWrapperCaption);
  const filterChildren = ExcludeChildrenByType(children, [LabelWrapperCaption, LabelWrapperLabel]);
  return <div>
    {labelChild}
    {filterChildren}
    {captionChild}
  </div>
}