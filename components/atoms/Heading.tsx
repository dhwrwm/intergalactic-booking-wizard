import React from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  level?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl font-bold text-white',
  h2: 'text-2xl font-bold text-white',
  h3: 'text-xl font-semibold text-purple-200',
  h4: 'text-lg font-semibold text-purple-200',
  h5: 'text-base font-semibold text-purple-200',
  h6: 'text-sm font-semibold text-purple-200',
};

export default function Heading({ level = 'h2', className = '', children }: HeadingProps) {
  const Component = level;
  const combinedClassName = `${levelStyles[level]} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}

