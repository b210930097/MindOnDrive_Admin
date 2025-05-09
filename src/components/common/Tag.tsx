'use client';
import React, { useState } from 'react';
import { cn } from '@/utils';
import type { TagProps } from 'antd/lib';
import { Tag as AntTag } from 'antd';
import { cva } from 'class-variance-authority';

interface ITagProps extends Omit<TagProps, 'size'> {
  isClose?: boolean;
  onClose?: () => void;
  type?: 'filter' | 'tags';
}

const tagTypeVariant = cva('font-sans text-text-sm font-medium', {
  variants: {
    type: {
      filter: 'h-[36px] w-auto rounded-2xl px-xl py-md text-secondary',
      tags: 'h-[36px] w-[85px] rounded-2xl px-xl py-md',
    },
    defaultVariants: {
      type: 'filter',
    },
  },
});

export function Tag(props: ITagProps) {
  const { children, className, type, icon, isClose, ..._props } = props;
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const pressedStyle = isPressed
    ? type === 'filter'
      ? 'bg-tertiary text-primary'
      : 'border-brand-light bg-brand-secondary-light text-brand'
    : '';

  return (
    <AntTag
      {..._props}
      className={cn(
        className,
        'h-6xl gap-xs rounded-xs px-md py-xxs',
        'inline-flex flex-row items-center',
        'm-[0px] [&_svg]:h-3xl [&_svg]:w-3xl',
        '[&_.ant-tag-close-icon]:h-xl [&_.ant-tag-close-icon]:w-xl',
        tagTypeVariant({
          type,
        }),
        pressedStyle,
      )}
      icon={icon}
      closable={isClose}
      onClick={handlePress}
    >
      <div className="text-secondary-contrast font-sans text-text-sm font-regular">
        {children}
      </div>
    </AntTag>
  );
}
