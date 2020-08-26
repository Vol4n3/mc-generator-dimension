import { FlexProps } from './flex.types';
import * as React from 'react';
import { FlexStyled } from './flex.styled';

export const Flex: React.FC<FlexProps> = props => {
  const { children, ...rest } = props;
  return (
    <FlexStyled className={'lnk-flex'} {...rest}>
      {children}
    </FlexStyled>
  );
};
