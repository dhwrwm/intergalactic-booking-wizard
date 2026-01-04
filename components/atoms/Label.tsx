import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function Label({ 
  required = false, 
  size = 'md',
  className = '', 
  children, 
  ...props 
}: LabelProps) {
  const baseStyles = 'block text-purple-200 mb-2';
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${className}`.trim();

  return (
    <label className={combinedClassName} {...props}>
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}

