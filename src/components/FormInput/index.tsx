import React, { InputHTMLAttributes } from 'react';

import { Input, Label, Option, Select } from './styles';
import { Control, Controller } from 'react-hook-form';
import { Text } from '@chakra-ui/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control;
  label: string;
  haveOptions?: boolean;
  optionsValue?: string[];
  error?: string;
}

export function FormInput({
  name,
  control,
  label,
  haveOptions = false,
  optionsValue,
  error,
  ...rest
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) =>
        !haveOptions ? (
          <>
            <Label>{label}</Label>
            <Input
              onChange={onChange}
              value={value}
              {...rest}
            />
            {error && <Text color='red'>{error}</Text>}
          </>
        ) : (
          <>
            <Label>{label}</Label>
            <Select
              onChange={onChange}
              value={value}
            >
              {optionsValue?.map((option) => (
                <Option value={option}>{option}</Option>
              ))}
            </Select>
          </>
        )
      }
    />
  );
}
