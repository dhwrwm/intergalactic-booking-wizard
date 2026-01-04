import React from 'react';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-slate-700/50 border border-slate-600',
  elevated: 'bg-slate-800 shadow-xl',
  bordered: 'bg-slate-800/50 border border-slate-700',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-8',
};

export default function Card({ 
  variant = 'default', 
  padding = 'md', 
  className = '', 
  children 
}: CardProps) {
  const baseStyles = 'rounded-lg';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`.trim();

  return <div className={combinedClassName}>{children}</div>;
}

