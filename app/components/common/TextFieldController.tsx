import React from "react";
import { Controller, Control, FieldValues, RegisterOptions, Path } from 'react-hook-form';
import { TextField } from "@shopify/polaris";

interface TextFieldControllerProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
  error?: string;
  [key: string]: any;
}

function TextFieldController<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  rules,
  error,
  ...rest
}: TextFieldControllerProps<T>) {
  return (
    <Controller<T>
      name={name}
      control={control}
      rules={rules}
      render={({ field }: { field: any }) => (
        <TextField
          label={label}
          error={error}
          {...field}
          {...rest}
        />
      )}
    />
  );
}

export default TextFieldController;
