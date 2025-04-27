'use client';

import { styled } from 'styled-components';
import type { ButtonProps } from 'antd';
import { Button as AntButton, ConfigProvider, Spin } from 'antd';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';

export interface IButtonProps extends Omit<ButtonProps, 'type' | 'color'> {
  type?:
    | 'primary'
    | 'secondary-gray'
    | 'secondary-color'
    | 'tertiary-gray'
    | 'tertiary-color'
    | 'link-gray'
    | 'link-color';
  destructive?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const StyledButton = styled(AntButton)`
  &.link-gray,
  &.link-color {
    padding: 0px !important;
    height: fit-content !important;
  }
`;

export function Button({
  children,
  className,
  size = 'middle',
  disabled,

  type = 'primary',
  destructive = false,
  icon,
  rightIcon,
  leftIcon,
  loading,
  ...props
}: IButtonProps) {
  const buttonVariant = cva(
    'rounded-sm font-sans text-text-sm shadow-xs [&.ant-btn-loading_.ant-btn-loading-icon]:hidden',
    {
      variants: {
        type: {
          primary: destructive
            ? cn(
                'border-none bg-danger shadow-xs',
                'hover:bg-danger-contrast disabled:bg-danger-light',
              )
            : cn(
                'border-none bg-brand shadow-xs',
                'hover:bg-brand-contrast disabled:bg-tertiary',
              ),
          'secondary-gray': destructive
            ? cn(
                'border-danger-light bg-primary shadow-xs',
                'hover:bg-danger-secondary',
              )
            : cn(
                'border-secondary bg-primary shadow-xs',
                'hover:border-secondary hover:bg-secondary',
                'disabled:border-tertiary disabled:bg-primary',
              ),
          'secondary-color': destructive
            ? cn(
                'border-danger-light bg-danger-secondary shadow-xs',
                'hover:bg-danger-secondary-contrast',
              )
            : cn(
                'border-brand-light bg-brand-secondary-light shadow-xs',
                'hover:border-brand-light hover:bg-brand-secondary',
                'disabled:border-brand-secondary-light disabled:bg-brand-secondary-light',
              ),
          'tertiary-gray': destructive
            ? cn(
                'border-none shadow-none',
                'hover:border-none hover:bg-danger-secondary ',
                'disabled:bg-primary',
              )
            : cn(
                'border-none shadow-none',
                'hover:bg-secondary disabled:bg-primary',
              ),
          'tertiary-color': destructive
            ? cn(
                'border-none shadow-none',
                'hover:border-none hover:bg-danger-secondary disabled:bg-primary',
              )
            : cn(
                'border-none shadow-none',
                'hover:bg-brand-secondary-contrast disabled:bg-brand-secondary-light',
              ),
          'link-gray': destructive
            ? cn('border-none shadow-none ', 'disabled:bg-transparent')
            : cn('border-none shadow-none', 'disabled:bg-transparent'),
          'link-color': destructive
            ? cn('border-none shadow-none', 'disabled:bg-transparent')
            : cn(
                'border-none bg-transparent shadow-none',
                'disabled:bg-transparent',
              ),
        },
        size: {
          small: 'px-2xl py-sm',
          middle: 'px-3xl py-md',
          large: 'px-4xl py-lg',
        },
        destructive: {
          true: 'focus-visible:shadow-4px-error-100 active:shadow-4px-error-100',
          false:
            'focus-visible:shadow-4px-primary-100 active:shadow-4px-primary-100',
        },
        icon: {
          true: '',
          false: '',
        },
      },
      compoundVariants: [
        { icon: true, size: 'small', className: 'px-sm' },
        { icon: true, size: 'middle', className: 'px-md' },
        { icon: true, size: 'large', className: 'px-lg' },
      ],
      defaultVariants: {
        type: 'primary',
        size: 'middle',
        destructive: false,
        icon: false,
      },
    },
  );
  const textVariant = cva(
    'flex flex-row items-center justify-center gap-md bg-transparent ',
    {
      variants: {
        size: {
          small: cn(
            'text-text-sm font-medium',
            '[&_.ant-btn-icon_svg]:h-[20px] [&_.ant-btn-icon_svg]:w-[20px]',
          ),
          middle: cn(
            'text-text-sm font-medium',
            '[&_.ant-btn-icon_svg]:h-[22px] [&_.ant-btn-icon_svg]:w-[22px]',
          ),
          large: 'text-text-sm font-medium',
        },
        type: {
          primary: destructive
            ? cn('text-invert')
            : cn(
                'text-invert',
                'hover:text-invert aria-disabled:text-secondary-light',
              ),
          'secondary-gray': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-primary', 'aria-disabled:text-secondary-light'),
          'secondary-color': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-brand', 'aria-disabled:text-brand-light'),
          'tertiary-gray': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-primary ', 'aria-disabled:text-tertiary'),
          'tertiary-color': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-brand ', 'aria-disabled:text-tertiary'),
          'link-gray': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-primary', 'aria-disabled:text-tertiary'),
          'link-color': destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-brand', 'aria-disabled:text-tertiary'),
        },
      },
      defaultVariants: {
        size: 'middle',
        type: 'primary',
      },
    },
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeightSM: 36,
            controlHeight: 40,
            controlHeightLG: 44,
          },
        },
      }}
    >
      <StyledButton
        {...props}
        className={cn(
          className,
          type,
          buttonVariant({
            size,
            type,
            destructive,
            icon: !!icon,
          }),
        )}
        size={size}
        disabled={disabled}
        loading={loading}
      >
        <div
          className={cn(
            'btn-container ',
            textVariant({
              size,
              type,
            }),
            className,
          )}
          aria-disabled={disabled}
        >
          {loading ? (
            <Spin indicator={<LoadingOutlined spin />} size="small" />
          ) : (
            <>
              {icon && icon}
              {!icon && leftIcon}
            </>
          )}

          {children}
          {rightIcon && rightIcon}
        </div>
      </StyledButton>
    </ConfigProvider>
  );
}
