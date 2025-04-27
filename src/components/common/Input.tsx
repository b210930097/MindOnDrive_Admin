'use client';

import { cn } from '@/utils/tailwindMerge';
import { Edit01, XClose } from '@untitled-ui/icons-react';
import { Input as AntInput, ConfigProvider, type InputProps } from 'antd';
import type { FormikHelpers } from 'formik';

interface IInputProps extends InputProps {
  title?: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
  unabled?: boolean;
  errorMessage?: string;
  required?: boolean;
  hasdropdown?: boolean;
  close?: boolean;
  isSearch?: boolean;
  isEdit?: boolean;
  rightIcon?: React.ReactNode;
  rightButton?: React.ReactNode;
  rightSelect?: React.ReactNode;
  setFieldValue?: FormikHelpers<unknown>['setFieldValue'];
  setFieldTouched?: FormikHelpers<unknown>['setFieldTouched'];
}

export function Input({
  type,
  className,
  leftIcon = null,
  unabled = false,
  isSearch = false,
  isEdit = false,
  rightIcon = null,
  rightButton = null,
  rightSelect = null,
  // formik
  name,
  value,
  onChange: $onChange,
  onBlur: $onBlur,
  setFieldValue,
  setFieldTouched,
  ...props
}: IInputProps & { leftIcon?: React.ReactNode }) {
  const hasValue = value !== undefined && value !== null && value !== '';
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            controlHeightXS: 50,
            controlHeightSM: 50,
            controlHeight: 50,
            controlHeightLG: 50,
          },
        },
      }}
    >
      <AntInput
        type={type}
        prefix={
          leftIcon && (
            <div
              className={cn('flex items-center font-sans', {
                '': !unabled,
                '': unabled,
              })}
            >
              {leftIcon}
            </div>
          )
        }
        suffix={
          <>
            {isEdit && !hasValue && !isSearch && (
              <Edit01 className="size-5xl" />
            )}
            {rightIcon && rightIcon}
            {rightButton && rightButton}
            {rightSelect && rightSelect}
          </>
        }
        className={cn(
          'h-[44px] text-text-md font-regular [&_.ant-input-prefix]:text-tertiary [&_input]:font-sans',
          '[&_.ant-input-group-addon]:bg-transparent [&_.ant-input-suffix>span>svg]:h-[20px] [&_.ant-input-suffix>span>svg]:w-[20px]',
          '[&_.ant-input-suffix>span]:m-[0px] [&_.ant-input-suffix>span]:h-[20px] [&_.ant-input-suffix>span]:w-[20px] [&_.ant-input-suffix]:m-[0px] [&_.ant-input-suffix]:text-tertiary',
          className,
        )}
        allowClear={{ clearIcon: <XClose /> }}
        name={name}
        value={value}
        onChange={(event) => {
          $onChange?.(event);
          if (!name) return;
          if (type === 'number')
            setFieldValue?.(name, parseInt(event.target.value, 10));
          else setFieldValue?.(name, event.target.value);

          setFieldTouched?.(name, true, false);
        }}
        onBlur={(event) => {
          $onBlur?.(event);
        }}
        {...props}
      />
    </ConfigProvider>
  );
}
