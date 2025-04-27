'use client';

import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { Input } from '@/components';
import type { TabsProps, TabPaneProps } from 'antd';
import { Tabs as AntTabs } from 'antd';
import { cva } from 'class-variance-authority';
import { Plus } from '@untitled-ui/icons-react';
import { cn } from '@/utils';

interface ItemType extends Omit<TabPaneProps, 'tab'> {
  label?: string | ReactNode;
  key: string;
  number?: number;
  rightDropdown?: boolean;
  isAdd?: boolean;
  field?: string;
  handleMoveClick?: () => void;
  extraContent?: React.ReactNode;
}

interface TabProps extends Omit<TabsProps, 'items' | 'type'> {
  items: ItemType[];
  type?: 'button' | 'default';
  isFull?: boolean;
  currentTab?: string;
}

const tabTypeVariant = cva('bg-primary', {
  variants: {
    type: {
      default: cn(
        '[&_.ant-tabs-nav-list]:h-[44px] [&_.ant-tabs-nav-list]:rounded-sm [&_.ant-tabs-nav-list]:border-[1px] [&_.ant-tabs-nav-list]:border-solid [&_.ant-tabs-nav-list]:border-tertiary [&_.ant-tabs-nav-list]:bg-secondary [&_.ant-tabs-nav-list]:p-xs',
        'font-sans [&_.ant-tabs-ink-bar]:hidden [&_.ant-tabs-nav]:before:hidden [&_.ant-tabs-tab-active]:ml-none [&_.ant-tabs-tab-active]:rounded-sm [&_.ant-tabs-tab-active]:bg-primary [&_.ant-tabs-tab]:px-xl [&_.ant-tabs-tab]:py-md',
        '[&_.ant-tabs-nav]:m-[0px] [&_.ant-tabs-tab-active]:shadow-sm [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-secondary-contrast [&_.ant-tabs-tab-btn]:text-secondary [&_.ant-tabs-tab]:ml-none',
      ),
      button: cn(
        'bg-primary [&_.ant-tabs-nav:before]:border-b-[2px] [&_.ant-tabs-nav:before]:border-b-tertiary [&_.ant-tabs-tab]:flex [&_.ant-tabs-tab]:min-w-[150px] [&_.ant-tabs-tab]:justify-center [&_.ant-tabs-tab]:p-xl ',
        '[&_.ant-tabs-ink-bar]:bg-brand [&_.ant-tabs-tab.ant-tabs-tab-active>.ant-tabs-tab-btn]:text-brand [&_.ant-tabs-tab>.ant-tabs-tab-btn]:text-secondary-contrast [&_.ant-tabs-tab]:ml-[0]',
        '[&_.ant-tabs-nav-list]:h-[44px] [&_.ant-tabs-tab.ant-tabs-tab-active:hover]:bg-brand-secondary-light [&_.ant-tabs-tab.ant-tabs-tab-disabled>.ant-tabs-tab-btn]:text-secondary-light [&_.ant-tabs-tab>.ant-tabs-tab-btn>div]:w-full',
        '[&_.ant-tabs-tab:hover>.ant-tabs-tab-btn]:text-brand [&_.ant-tabs-tab:hover]:border-b-[2px] [&_.ant-tabs-tab:hover]:border-solid [&_.ant-tabs-tab:hover]:border-b-brand',
        '[&_.ant-tabs-tab>.ant-tabs-tab-btn>.add]:text-secondary-light [&_.tab-container_svg]:text-secondary ',
        '[&_.ant-tabs-tab.ant-tabs-tab-active>.ant-tabs-tab-btn>.tab-container_svg]:text-brand [&_.ant-tabs-tab:hover>.ant-tabs-tab-btn>.tab-container_svg]:text-brand',
      ),
    },
    isFull: {
      true: cn(
        '[&_.ant-tabs-nav-list]:w-full [&_.ant-tabs-nav-wrap]:w-full',
        '[&_.ant-tabs-tab]:w-full [&_.ant-tabs-tab]:justify-center',
      ),
    },
  },
  defaultVariants: {
    type: 'default',
    isFull: false,
  },
});

export const Tabs: React.FC<TabProps> = ({
  items,
  type = 'default',
  onChange,
  className,
  currentTab,
  isFull,
  ...props
}) => {
  const [changedItems, setChangedItems] = useState(items);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const newItem = {
        key: (Math.floor(Math.random() * 100) + items.length).toString(),
        label: input.value,
        children: changedItems.find((item) => item.isAdd)?.children,
        rightDropdown: changedItems[0]?.rightDropdown,
      };
      const addIndex = changedItems.findIndex((item) => item.isAdd);
      setChangedItems([
        ...changedItems.slice(0, addIndex),
        newItem,
        ...changedItems.slice(addIndex),
      ]);
    }
  };

  return (
    <AntTabs
      {...props}
      activeKey={currentTab}
      onChange={onChange}
      className={cn(
        tabTypeVariant({
          type,
          isFull,
        }),
        className,
      )}
      items={changedItems.map((item) => ({
        key: item.key,
        label:
          type === 'default' ? (
            <div className="flex w-full items-center justify-center gap-md">
              {item.label}
            </div>
          ) : item.isAdd ? (
            <Input
              placeholder={item.label as string}
              leftIcon={<Plus />}
              className="border-none bg-transparent p-none text-secondary shadow-none [&.ant-input-affix-wrapper-focused>.ant-input-prefix_svg]:text-secondary"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="tab-container flex w-full items-center justify-center gap-md">
              {item.label}
            </div>
          ),
        children: item.children,
        disabled: item.disabled,
      }))}
      tabBarExtraContent={
        changedItems.find((tab) => tab.key === currentTab)?.extraContent
      }
    />
  );
};
