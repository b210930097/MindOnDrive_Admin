'use client';

import { styled } from 'styled-components';
import type { ButtonProps } from 'antd';
import { Button as AntButton, ConfigProvider, Spin } from 'antd';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { LoadingOutlined } from '@ant-design/icons';

export interface IButtonProps extends Omit<ButtonProps, 'type' | 'color'> {
  type?: 'primary' | 'secondary' | 'link';
  destructive?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const StyledButton = styled(AntButton)`
  &.link {
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
    'rounded-4xl font-sans text-text-sm shadow-xs [&.ant-btn-loading_.ant-btn-loading-icon]:hidden',
    {
      variants: {
        type: {
          primary: destructive
            ? cn('border-none bg-danger shadow-xs hover:bg-danger-light')
            : cn(
                'border-primary bg-primary shadow-xs',
                'hover:border hover:border-primary hover:bg-[#f5d8bc] disabled:border-gray disabled:bg-disabled',
              ),
          secondary: destructive
            ? cn(
                'border-danger-light bg-white',
                'hover:bg-danger-secondary disabled:bg-danger-secondary',
              )
            : cn(
                'border-black bg-secondary shadow-xs',
                'hover:bg-secondary-light',
                'disabled:border-disabled disabled:bg-disabled',
              ),
          link: destructive
            ? cn('border-none shadow-none ', 'disabled:bg-transparent')
            : cn('border-none shadow-none', 'disabled:bg-transparent'),
        },
        size: {
          small: 'px-8xl py-md',
          middle: 'px-8xl py-md',
          large: 'px-4xl',
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
    'flex flex-row items-center justify-center gap-md bg-transparent',
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
          large: 'text-text-xl font-medium',
        },
        type: {
          primary: destructive
            ? cn('text-white')
            : cn('text-primary', 'aria-disabled:text-disabled'),
          secondary: destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-primary', 'aria-disabled:text-disabled'),
          link: destructive
            ? cn('text-danger', 'aria-disabled:text-danger-light')
            : cn('text-primary', 'aria-disabled:text-tertiary'),
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
            controlHeightSM: 40,
            controlHeight: 40,
            controlHeightLG: 50,
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
