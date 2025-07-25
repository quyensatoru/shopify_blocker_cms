import React from "react";
import { Controller, Control, FieldValues, RegisterOptions, Path } from 'react-hook-form';
import { Select } from "@shopify/polaris";

interface SelectControllerProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { label: string; value: string }[];
  rules?: RegisterOptions<T>;
  error?: string;
  [key: string]: any;
}

function SelectController<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  error,
  ...rest
}: SelectControllerProps<T>) {
  return <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }: { field: any }) => (
      <Select
        label={label}
        options={options}
        error={error}
        {...field}
        {...rest}
      />
    )}
  />
};

export default SelectController;
