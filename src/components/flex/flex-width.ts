import { FlexDevice } from './flex.types';

export const FlexWidth = (device: FlexDevice, col?: number[] | boolean | null): string => {
  const cssWidth = 'width: ';
  if (!col) {
    return cssWidth + '100%';
  }
  if (!Array.isArray(col)) {
    return '';
  }
  switch (device) {
    case 'desktop':
      return (
        cssWidth +
        (col[3] && col[3] < 0
          ? 'initial'
          : (100 * (col[3] || col[2] || col[1] || col[0])) / 12 + '%')
      );
    case 'tablet':
      return (
        cssWidth +
        (col[2] && col[2] < 0 ? 'initial' : (100 * (col[2] || col[1] || col[0])) / 12 + '%')
      );
    case 'small':
      return cssWidth + (col[1] && col[1] < 0 ? 'initial' : (100 * (col[1] || col[0])) / 12 + '%');
    case 'xs':
    default:
      return cssWidth + (col[0] < 0 ? 'initial' : (100 * col[0]) / 12 + '%');
  }
};
