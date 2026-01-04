import React from 'react';

export type TextVariant = 'body' | 'caption' | 'label' | 'error' | 'success';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TextProps {
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  body: 'text-white',
  caption: 'text-purple-200',
  label: 'text-purple-300',
  error: 'text-red-400',
  success: 'text-green-400',
};

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function Text({ 
  variant = 'body', 
  size = 'md', 
  className = '', 
  children 
}: TextProps) {
  const combinedClassName = `${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  return <p className={combinedClassName}>{children}</p>;
}

