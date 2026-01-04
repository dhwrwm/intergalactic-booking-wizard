import React from 'react';
import Label from '@/components/atoms/Label';
import Input, { InputProps } from '@/components/atoms/Input';
import ErrorMessage from '@/components/atoms/ErrorMessage';

export interface FormFieldProps extends Omit<InputProps, 'error'> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormField({ 
  label, 
  error, 
  required = false,
  id,
  ...inputProps 
}: FormFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <Input id={fieldId} error={!!error} {...inputProps} />
      <ErrorMessage message={error} />
    </div>
  );
}

