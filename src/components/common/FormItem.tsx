'use client';

import React from 'react';
import { Form } from 'antd';
import type { FormItemProps } from 'antd';
import { styled } from 'styled-components';
import type { FieldProps } from 'formik';
import { Field, getIn } from 'formik';
import { cn } from '@/utils/tailwindMerge';

const StyledFormItem = styled(Form.Item)`
  margin: 0 !important;
  .ant-form-item-explain-error {
    font-family: Rubik, sans-serif;
    // margin-top: ${(props) => props.theme.spacing.xl} !important;
    font-size: ${(props) => props.theme.fontSize['text-xl']} !important;
  }
  .ant-input-affix-wrapper {
    &.ant-input-affix-wrapper-disabled {
      border: 1px solid #dedede !important;
      background-color: #f1f2f6;
      .ant-input-prefix {
        color: #9ca3af;
      }
    }
  }
`;

interface Props extends FormItemProps {
  field?: string | (string | number)[]; // Delete
  children?: React.ReactNode;
}

const cloneChildrenWithProps = (
  children: React.ReactNode,
  props: object,
): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });
};

export function FormItem({
  // field, // Delete
  name: _name,
  label,
  required = false,
  help,
  children,
  className,
  hidden,
  initialValue,
  ...props
}: Props) {
  if (_name) {
    return (
      <Field name={_name}>
        {({
          field: { name, value }, // { name, value, onChange, onBlur }
          meta, //: { error, touched },
          form: { initialErrors = {}, setFieldValue, setFieldTouched },
        }: FieldProps) => {
          const initialError = getIn(initialErrors, name, undefined);
          let isTouched = meta.touched as boolean | boolean[];
          if (Array.isArray(isTouched)) {
            isTouched =
              isTouched.length === 0
                ? true
                : isTouched.reduce((acc, value) => acc || value, false);
          }

          const hasError = meta.error !== undefined && isTouched;
          const hasInitialError = initialError !== undefined;
          const isValid = !meta.error && isTouched;
          const showHelp = hasError || (hasInitialError && !isTouched);

          return (
            <div
              className={cn(
                'fons-sans flex w-full flex-col gap-sm',
                className,
                hidden && 'hidden',
              )}
            >
              {label && (
                <div className="fons-sans flex gap-sm font-medium text-primary">
                  {label}
                  {required && (
                    <div className="fons-sans font-medium text-danger">
                      {' *'}
                    </div>
                  )}
                </div>
              )}
              <StyledFormItem
                validateStatus={
                  hasError || (hasInitialError && !isTouched)
                    ? 'error'
                    : isValid
                      ? 'success'
                      : undefined
                }
                status={
                  hasError || (hasInitialError && !isTouched)
                    ? 'error'
                    : isValid
                      ? 'success'
                      : undefined
                }
                required={required}
                help={showHelp && meta.error}
                shouldUpdate
                initialValue={initialValue}
                {...props}
              >
                {cloneChildrenWithProps(children, {
                  error:
                    meta.error && meta.error.length > 0
                      ? meta.error
                      : undefined,
                  name: name || null,
                  value: value || initialValue || null,
                  setFieldValue,
                  setFieldTouched,
                })}
              </StyledFormItem>
              {help && (
                <div className="fons-sans font-medium text-secondary">{`${help}`}</div>
              )}
            </div>
          );
        }}
      </Field>
    );
  } else
    return (
      <div className={cn('flex w-full flex-col gap-sm font-medium', className)}>
        {label && (
          <div className="flex gap-sm font-sans">
            {label}
            {required && <div className="fons-sans text-danger">{' *'}</div>}
          </div>
        )}
        <StyledFormItem required={required} shouldUpdate {...props}>
          {children}
        </StyledFormItem>
        {help && <div className="font-sans text-secondary">{`${help}`}</div>}
      </div>
    );
}
