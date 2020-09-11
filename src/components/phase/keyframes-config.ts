export type KeyframesName =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInFromRight'
  | 'slideInFromLeft'
  | 'slideInFromTop'
  | 'slideInFromBottom'
  | 'slideOutToRight'
  | 'slideOutToLeft'
  | 'slideOutToTop'
  | 'slideOutToBottom'
  | 'growInToRight';
export const KeyframesConfig: { [key in KeyframesName]: Keyframe[] } = {
  fadeIn: [{ opacity: 0 }, { opacity: 1 }],
  fadeOut: [{ opacity: 1 }, { opacity: 0 }],
  slideInFromRight: [
    {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideInFromLeft: [
    {
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideInFromTop: [
    {
      opacity: 0,
      transform: 'translate3d(0,-100%,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideInFromBottom: [
    {
      opacity: 0,
      transform: 'translate3d(0,100%,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideOutToRight: [
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideOutToLeft: [
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
      transformOrigin: 'top',
    },
  ],
  slideOutToTop: [
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 0,
      transform: 'translate3d(0,-100%,0)',
      transformOrigin: 'top',
    },
  ],
  slideOutToBottom: [
    {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
      transformOrigin: 'top',
    },
    {
      opacity: 0,
      transform: 'translate3d(0,100%,0)',
      transformOrigin: 'top',
    },
  ],
  growInToRight: [
    {
      transform: 'scale(0,1)',
      transformOrigin: 'left',
    },
    {
      transform: 'scale(1,1)',
      transformOrigin: 'left',
    },
  ],
};
