import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function Input({ error = false, className = '', ...props }: InputProps) {
  const baseStyles = 'w-full px-4 py-2 rounded-lg bg-slate-700 border text-white focus:outline-none transition-colors';
  const borderStyles = error ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-purple-500';
  
  const combinedClassName = `${baseStyles} ${borderStyles} ${className}`.trim();

  return <input className={combinedClassName} {...props} />;
}

