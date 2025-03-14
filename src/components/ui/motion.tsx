
import React from 'react';
import { cn } from '@/lib/utils';

export interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  duration?: number;
  animate?: 'fade-in' | 'slide-up' | 'slide-down' | 'float' | 'none';
}

export const Motion = ({
  children,
  as: Component = 'div',
  delay = 0,
  duration = 300,
  animate = 'fade-in',
  className,
  style,
  ...props
}: MotionProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimation = () => {
    switch (animate) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'float':
        return 'animate-float';
      default:
        return '';
    }
  };

  return (
    <Component
      className={cn(
        isVisible ? getAnimation() : 'opacity-0',
        className
      )}
      style={{
        ...style,
        animationDuration: animate !== 'none' ? `${duration}ms` : undefined,
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export const FadeIn = (props: Omit<MotionProps, 'animate'>) => {
  return <Motion animate="fade-in" {...props} />;
};

export const SlideUp = (props: Omit<MotionProps, 'animate'>) => {
  return <Motion animate="slide-up" {...props} />;
};

export const SlideDown = (props: Omit<MotionProps, 'animate'>) => {
  return <Motion animate="slide-down" {...props} />;
};

export const Float = (props: Omit<MotionProps, 'animate'>) => {
  return <Motion animate="float" {...props} />;
};
