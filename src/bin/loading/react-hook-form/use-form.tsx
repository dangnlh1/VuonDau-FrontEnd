/**
 * @app VietDangDental
 * @author TruongTV
 */

import {yupResolver} from '@hookform/resolvers/yup';
import {useController} from 'react-hook-form';
import React, {ReactNode} from 'react';
import {
  FormProvider as FormProviderBase,
  useForm as useBaseForm,
  UseFormReturn,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';

export type Props<T extends FieldValues> = {
  valuesPosition?: string[];
  validationSchema?: any;
  oldData?: any;
} & UseFormProps<T>;

type useFormProp<T extends FieldValues> = {
  valuesPosition?: string[];
  returnOldData: any;
} & UseFormReturn<T>;

export type FormProviderType<T extends FieldValues> = {
  children: ReactNode;
} & useFormProp<T>;

export type FormContextType = {};

export type FormPropsWithCorrelationErrors<T> = {
  isEqual?: boolean;
} & T;

const FormContext = React.createContext<FormContextType>({
  isEqual: false,
});

const FormProvider = <T extends FieldValues = FieldValues>(
  methods: FormProviderType<T>,
) => {
  return (
    <FormContext.Provider value={{}}>
      <FormProviderBase {...methods}>{methods.children}</FormProviderBase>
    </FormContext.Provider>
  );
};

const useForm = <T extends FieldValues = FieldValues>({
  reValidateMode = 'onChange',
  validationSchema,
  valuesPosition,
  oldData,
  ...props
}: Props<T>): useFormProp<FormPropsWithCorrelationErrors<T>> => {
  const form = useBaseForm<FormPropsWithCorrelationErrors<T>>({
    ...props,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    reValidateMode,
  });

  return {
    ...form,
    valuesPosition: valuesPosition || [],
    returnOldData: oldData,
  };
};

export {FormProvider, useForm, useController};
export type {useFormProp};
