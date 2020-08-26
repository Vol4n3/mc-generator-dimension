import styled from 'styled-components';
import { FlexProps } from './flex.types';
import { FlexWidth } from './flex-width';
import { FlexItemsPosition } from './flex-position';

export const FlexStyled = styled.div<FlexProps>`
  display: flex;
  position: relative;
  box-sizing: border-box;
  flex-wrap: ${(props): string => (props.noWrap ? 'nowrap' : 'wrap')};
  align-items: ${(props): string => FlexItemsPosition('xs', props.alignItems)};
  justify-content: ${(props): string => FlexItemsPosition('xs', props.justifyContent)};
  ${(props): string => (props.col && !props.noPadding ? 'padding: 0 16px' : '')};
  ${(props): string => FlexWidth('xs', props.col)};

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
    ${(props): string => FlexWidth('small', props.col)};
    align-items: ${(props): string => FlexItemsPosition('small', props.alignItems)};
    justify-content: ${(props): string => FlexItemsPosition('small', props.justifyContent)};
  }
  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    ${(props): string => FlexWidth('tablet', props.col)};
    align-items: ${(props): string => FlexItemsPosition('tablet', props.alignItems)};
    justify-content: ${(props): string => FlexItemsPosition('tablet', props.justifyContent)};
  }
  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    ${(props): string => FlexWidth('desktop', props.col)};
    align-items: ${(props): string => FlexItemsPosition('desktop', props.alignItems)};
    justify-content: ${(props): string => FlexItemsPosition('desktop', props.justifyContent)};
  }
`;
