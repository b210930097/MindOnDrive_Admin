'use client';

import { LoadingOutlined } from '@ant-design/icons';
import type { SpinProps } from 'antd';
import { Spin as AntSpin } from 'antd';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

interface ISpinProps extends Omit<SpinProps, 'size' | 'tip' | 'indicator'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  text?: boolean;
}
export function Spin({
  size = 'md',
  text = true,
  className,
  ...props
}: ISpinProps) {
  const SpinVariants = cva(
    'border-tertiary-light rounded-full border-solid bg-transparent [&_.anticon-spin]:text-primary',
    {
      variants: {
        size: {
          xs: 'size-4xl border-[1px] [&_.anticon-spin]:text-[18px] ',
          sm: 'size-[34px] border-xxs [&_.anticon-spin]:text-[32px] ',
          md: 'size-[50px] border-xs [&_.anticon-spin]:text-[48px] ',
          lg: 'size-[58px] border-xs [&_.anticon-spin]:text-[56px] ',
          xl: 'size-[66px] border-xs [&_.anticon-spin]:text-[64px] ',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    },
  );
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3xl">
      <div className={cn(SpinVariants({ size }))}>
        <AntSpin
          {...props}
          className={cn(
            className,
            size === 'xs' && '[&.ant-spin]:ml-[-1px] [&.ant-spin]:mt-[-1px]',
            size === 'sm' && '[&.ant-spin]:ml-[-1px] [&.ant-spin]:mt-[-1px]',
            size === 'md' && '[&.ant-spin]:ml-[-3px] [&.ant-spin]:mt-[-3px]',
            size === 'lg' && '[&.ant-spin]:ml-[-3px] [&.ant-spin]:mt-[-3px]',
            size === 'xl' && '[&.ant-spin]:ml-[-3px] [&.ant-spin]:mt-[-3px]',
          )}
          indicator={<LoadingOutlined />}
        />
      </div>
      {text === true && (
        <div className="text-secondary-contrast font-sans text-text-sm font-regular">
          Loading...
        </div>
      )}
    </div>
  );
}
