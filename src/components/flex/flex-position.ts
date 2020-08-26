import { FlexAlignItem, FlexDevice, FlexJustifyContent } from './flex.types';

export const FlexItemsPosition = (
  device: FlexDevice,
  props?: FlexAlignItem[] | FlexJustifyContent[] | null
): string => {
  if (!props) {
    return '';
  }
  switch (device) {
    case 'desktop':
      return props[3] || props[2] || props[1] || props[0];
    case 'small':
      return props[2] || props[1] || props[0];
    case 'tablet':
      return props[1] || props[0];
    default:
    case 'xs':
      return props[0];
  }
};
