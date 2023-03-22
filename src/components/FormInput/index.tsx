import React, { InputHTMLAttributes } from 'react';

import { Input, Label, Option, Select } from './styles';
import { Control, Controller } from 'react-hook-form';
import { Text } from '@chakra-ui/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control;
  label?: string;
  error?: string;
}

export function FormInput({
  name,
  control,
  label,
  error,
  ...rest
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) =>
          <>
            <Label>{label}</Label>
            <Input
              onChange={onChange}
              value={value}
              {...rest}
            />
            {error && <Text color='red'>{error}</Text>}
          </>
      }
    />
  );
}
