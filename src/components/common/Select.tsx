'use client';

import { styled } from 'styled-components';
import type { SelectProps } from 'antd';
import { Select as AntSelect, ConfigProvider } from 'antd';
import { Check, ChevronDown } from '@untitled-ui/icons-react';
import { cva } from 'class-variance-authority';
import type { FormikHelpers } from 'formik';
import { cn } from '@/utils';
import { useState } from 'react';
import Image from 'next/image';
import { Spin, Tag } from '.';

const selectVariants = cva([''], {
  variants: {
    size: {
      small: '',
      middle: '',
      large: '',
    },
    error: {
      true: '',
      false: [
        'border-none border-solid border-secondary shadow-xs',
        'hover:border-brand-light focus:border-brand-light active:border-brand-light',
      ],
    },
  },
  defaultVariants: {
    size: 'middle',
    error: false,
  },
});

const leftIconVariants = cva(['absolute z-10'], {
  variants: {
    size: {
      small: cn('left-lg top-xl [&_svg]:h-4xl [&_svg]:w-4xl'),
      middle: 'left-xl top-xl [&_svg]:size-5xl',
      large: 'left-2xl top-xl [&_svg]:size-6xl',
    },
    error: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'middle',
    error: false,
  },
});

const SelectWrapper = styled.div`
  position: relative;
  &.left-icon {
    .ant-select-sm .ant-select-selector {
      padding-left: 36px !important;
    }
    .ant-select-selector {
      padding-left: 38px !important;
    }
    .ant-select-lg .ant-select-selector {
      padding-left: 44px !important;
    }

    .ant-select-multiple.ant-select-sm .ant-select-selection-placeholder {
      inset-inline: 36px !important;
    }
    .ant-select-multiple .ant-select-selection-placeholder {
      inset-inline: 38px !important;
    }
    .ant-select-multiple.ant-select-lg .ant-select-selection-placeholder {
      inset-inline: 44px !important;
    }
  }
  .ant-select-sm .ant-select-selector::after {
    line-height: 34px;
  }
  .ant-select-selector::after {
    line-height: 38px;
  }
  .ant-select-lg .ant-select-selector::after {
    line-height: 42px;
  }
`;

interface ISelectProps extends Omit<SelectProps, 'type' | 'mode'> {
  type?: 'default' | 'search' | 'tag';
  name?: string;
  error?: boolean;
  disabled?: boolean;
  isMultiple?: boolean;
  tagRenderCustom?: boolean;
  leftIcon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue?: FormikHelpers<any>['setFieldValue'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldTouched?: FormikHelpers<any>['setFieldTouched'];
}

export function Select({
  size,
  leftIcon,
  className,
  error = false,
  type = 'default',
  tagRenderCustom,
  isMultiple = false,
  // formik
  name,
  value,
  loading = false,
  onChange: $onChange,
  onBlur: $onBlur,
  setFieldValue,
  setFieldTouched,
  ...props
}: ISelectProps) {
  const [submitted, setSubmitted] = useState(false);

  const selectProps: SelectProps = {
    ...props,
    mode: type === 'tag' ? 'tags' : isMultiple ? 'multiple' : undefined,
    size,
    status: submitted && error ? 'error' : undefined,
    value: value === '' || value === null ? undefined : value,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type OptionType = NonNullable<SelectProps<unknown, any>['options']>[number];
  const filterOption = (input: string, option?: OptionType) => {
    if (!option || !option.label) return false;

    // Ensure label is a string if possible and perform the lowercase comparison
    const labelString =
      typeof option.label === 'string'
        ? option.label
        : option.label?.toString() || '';
    return labelString.toLowerCase().includes(input.toLowerCase());
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            controlHeightXS: 36,
            controlHeightSM: 40,
            controlHeight: 44,
            controlHeightLG: 48,
          },
        },
      }}
    >
      <SelectWrapper
        className={cn(
          leftIcon ? 'left-icon' : '',
          '[&_.ant-select-clear]:mr-[8px] [&_.ant-select-clear]:mt-[-9px] [&_.ant-select-selection-item]:text-text-md',
          '[&_.ant-select-selection-item]:font-regular [&_.ant-select-selection-overflow-item>_span]:flex [&_.ant-select-selection-overflow]:gap-xs',
          '[&_.ant-select-selection-overflow]:px-xs [&_.ant-select-selection-overflow]:py-md [&_.ant-select-selection-placeholder]:font-sans [&_input]:font-sans',
        )}
      >
        {leftIcon && (
          <div
            className={cn(
              leftIconVariants({
                size,
                error,
              }),
            )}
          >
            {leftIcon}
          </div>
        )}
        <AntSelect
          {...selectProps}
          className={cn(
            className,
            'w-full rounded-md font-sans',
            selectVariants({ size, error }),
          )}
          suffixIcon={
            loading ? (
              <Spin size="xs" text={false} />
            ) : (
              <ChevronDown className="text-primary" />
            )
          }
          menuItemSelectedIcon={<Check className="text-brand size-5xl" />}
          popupClassName={cn(
            'font-sans [&_.ant-select-item-option]:px-xxs [&_.ant-select-item-option]:py-xxs',
          )}
          filterOption={filterOption}
          {...(!tagRenderCustom && {
            tagRender: (tagProps) => {
              const { label, closable, ..._tagProps } = tagProps;
              return (
                <Tag {..._tagProps} isClose={closable}>
                  {label}
                </Tag>
              );
            },
          })}
          onChange={async (value, option) => {
            setSubmitted(true);
            $onChange?.(value, option);
            if (name) {
              await setFieldValue?.(name, value);
              setFieldTouched?.(name, true, true);
            }
          }}
          onBlur={(event) => {
            setSubmitted(true);
            $onBlur?.(event);
            if (name) setFieldTouched?.(name);
          }}
          optionRender={(option) => (
            <div className="flex flex-row items-center justify-start gap-md p-lg py-md font-sans">
              {option.data?.avatar && (
                <Image
                  alt=""
                  src={option.data.avatar}
                  className="size-6xl rounded-full object-cover"
                />
              )}
              {option.data?.icon && (
                <div className="flex items-center [&_svg]:size-4xl">
                  {option.data.icon}
                </div>
              )}
              <div className="relative font-sans text-text-md font-regular leading-[24px]">
                {option.label}
              </div>
              {option.data?.email && (
                <div className="text-text-secondary relative font-sans leading-[24px]">
                  {option.data.email}
                </div>
              )}
            </div>
          )}
        />
      </SelectWrapper>
    </ConfigProvider>
  );
}
