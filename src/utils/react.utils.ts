import {Children, FC, isValidElement, ReactNode} from 'react';

export const QueryChildrenByType = (
  children: ReactNode | ReactNode[],
  type: FC
): ReactNode => {
  const arrayChildren = Children.toArray(children);
  return arrayChildren.find((element): boolean => {
    if (isValidElement(element)) {
      return element.type === type;
    }
    return false;
  });
};
export const ExcludeChildrenByType = (
  children: ReactNode | ReactNode[],
  types: FC[]
): ReactNode[] => {
  const arrayChildren = Children.toArray(children);
  return arrayChildren.filter((element): boolean => {
    if (isValidElement(element)) {
      return !types.some(type => element.type === type);
    }
    return true;
  });
};