import * as React from 'react';

export interface AnimType {
  keyframes: Keyframe[];
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface AnimationProps {
  /**
   * décrire une animation en entré
   */
  enter?: AnimType;
  /**
   * décrire une animation en sorti
   */
  exit?: AnimType;
  /**
   * montrer ou cacher le contenu , démarre l'animation enter ou exit
   */
  show: boolean;
  /**
   * applique le css avant le début de l'animation
   * par default ajoute opacity 1
   */
  beforeStyle?: React.CSSProperties;
  /**
   * lance l'animation au premier affichage
   */
  onStarting?: boolean;
}
type stateType = 'before' | 'start' | 'showed' | 'end' | 'hide';

export const Animation: React.FC<AnimationProps> = props => {
  const { children, show, enter, exit, beforeStyle, onStarting } = props;
  const refContainer = React.useRef<HTMLDivElement>();
  const [getState, setState] = React.useState<stateType>(
    show ? (onStarting ? 'before' : 'showed') : 'hide'
  );
  const [getLastShow, setLastShow] = React.useState<boolean>(onStarting ? !show : show);
  const refAnimation = React.useRef<Animation>();
  React.useEffect(() => {
    let element: HTMLDivElement;
    let storeAnim: Animation;
    const animate = (anim: AnimType, isStart?: boolean) => {
      if (refAnimation.current && refAnimation.current.playState !== 'finished') {
        refAnimation.current.finish();
      }
      if (refContainer && refContainer.current) {
        element = refContainer.current as HTMLDivElement;
        let keyframes: Keyframe[] = anim.keyframes;
        let duration: number = 250;
        let easing: string = 'cubic-bezier(0.8, 0, 0.2, 1)';
        if (typeof anim.duration !== 'undefined') {
          duration = anim.duration;
        }
        if (typeof anim.easing !== 'undefined') {
          easing = anim.easing;
        }
        refAnimation.current = element.animate(keyframes, {
          duration,
          easing,
        });
        storeAnim = refAnimation.current;
        storeAnim.addEventListener('finish', () => {
          setState(isStart ? 'showed' : 'hide');
        });
      }
    };
    if (!getLastShow && show) {
      if (enter) {
        setTimeout(() => {
          setState('start');
          animate(enter, true);
        }, enter.delay || 0);
      } else {
        setState('showed');
      }
    } else if (getLastShow && !show) {
      if (exit) {
        setTimeout(() => {
          setState('end');
          animate(exit);
        }, exit.delay || 0);
      } else {
        setState('hide');
      }
    }
    setLastShow(show);
  }, [getLastShow, enter, exit, show, getState]);
  return (
    <div
      ref={refContainer as any}
      style={getState === 'before' ? beforeStyle || { opacity: 0 } : {}}
    >
      {getState !== 'hide' && children}
    </div>
  );
};
