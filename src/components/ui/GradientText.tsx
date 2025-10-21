import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: 'cta' | 'warm' | 'custom';
  customGradient?: string;
}

export function GradientText({
  children,
  className = '',
  gradient = 'cta',
  customGradient
}: GradientTextProps) {
  const gradients = {
    cta: 'from-wellco-accent-vibrant to-wellco-accent-magenta',
    warm: 'from-wellco-primary to-wellco-warm',
    custom: ''
  };

  const gradientClass = customGradient
    ? ''
    : `bg-gradient-to-r ${gradients[gradient]}`;

  const customStyle = customGradient
    ? { background: customGradient }
    : {};

  return (
    <span
      className={`${gradientClass} bg-clip-text text-transparent ${className}`}
      style={customStyle}
    >
      {children}
    </span>
  );
}
