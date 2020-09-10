import {HTMLAttributes} from 'react';

export const FlexDevices = ['xs', 'small', 'tablet', 'desktop'] as const;
export const FlexAlignItems = ['center', 'baseline', 'top', 'flex-end', 'flex-start'] as const;
export const FlexJustifyContents = [
  'space-between',
  'flex-end',
  'space-around',
  'center',
  'flex-start',
] as const;
export type FlexDevice = typeof FlexDevices[number];
export type FlexAlignItem = typeof FlexAlignItems[number];
export type FlexJustifyContent = typeof FlexJustifyContents[number];

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  alignItems?: FlexAlignItem[];
  justifyContent?: FlexJustifyContent[];
  noWrap?: boolean;
  noPadding?: boolean;
  col?: number[] | boolean;
}
