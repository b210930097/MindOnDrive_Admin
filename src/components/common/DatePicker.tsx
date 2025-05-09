'use client';

import React from 'react';
import { styled } from 'styled-components';
import { DatePicker as $DatePicker } from 'antd';
import { cva } from 'class-variance-authority';
import type {
  DatePickerProps as $DatePickerProps,
  // MonthPickerProps as $MonthPickerProps,
  RangePickerProps as $RangePickerProps,
  // WeekPickerProps as $WeekPickerProps,
} from 'antd/lib/date-picker';
import { cn } from '@/utils/tailwindMerge';
import type { FormikHelpers } from 'formik';
import {
  ArrowNarrowRight,
  ChevronLeft,
  ChevronRight,
  XClose,
} from '@untitled-ui/icons-react';
import { Button } from '@/components';

const DatePickerWrapper = styled.div`
  position: relative;
  &.left-icon {
    .ant-picker-input {
      padding-left: 30px !important;
    }
  }
`;

const {
  // MonthPicker: $MonthPicker,
  RangePicker: $RangePicker,
  // WeekPicker: $WeekPicker,
} = $DatePicker;

const datePickerVariants = cva(
  [
    'h-[44px] [&_.ant-picker-active-bar]:hidden [&_.ant-picker-input>input]:w-[110px] [&_.ant-picker-range-separator]:p-none',
    'flex w-full items-center justify-center gap-xl font-sans [&_input]:text-[16px] [&_input]:font-regular',
  ],
  {
    variants: {
      error: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const popupClassName = cn(
  '[&_.ant-picker-body]:font-sans',
  '[&_.ant-picker-content>tbody>tr>.ant-picker-cell-range-start>.ant-picker-cell-inner]:bg-brand',
  '[&_.ant-picker-content>tbody>tr>.ant-picker-cell-range-start>.ant-picker-cell-inner]:text-[#FFFFFF]',
  '[&_.ant-picker-content>tbody>tr>.ant-picker-cell-range-end>.ant-picker-cell-inner]:bg-brand',
  '[&_.ant-picker-content>tbody>tr>.ant-picker-cell-range-end>.ant-picker-cell-inner]:text-[#FFFFFF]',
  '[&_.ant-picker-content>tbody>tr>.ant-picker-cell-selected>.ant-picker-cell-inner]:bg-brand',
  '[&_.ant-picker-header]:h-[36px] [&_.ant-picker-header]:border-[0px] [&_.ant-picker-panel>.ant-picker-date-panel]:w-[280px] [&_.ant-picker-panel]:w-[328px]',
  '[&_.ant-picker-cell-today_.ant-picker-cell-inner]:border-brand [&_.ant-picker-cell-today_.ant-picker-cell-inner]:rounded-[24px] [&_.ant-picker-cell-today_.ant-picker-cell-inner]:border-solid',
  '[&_.ant-picker-content_thead]:flex [&_.ant-picker-content_thead_tr_th]:h-[40px] [&_.ant-picker-content_thead_tr_th]:w-[40px]',
  '[&_.ant-picker-body]:p-[0px] [&_.ant-picker-cell]:p-[0px] [&_.ant-picker-header]:p-[0px] [&_.ant-picker-panel]:px-[24px] [&_.ant-picker-panel]:py-[20px]',
  '[&_.ant-picker-content_tbody]:flex [&_.ant-picker-content_tbody]:flex-col [&_.ant-picker-content_tbody]:gap-[4px]',
  '[&_.ant-picker-cell-inner]:flex [&_.ant-picker-cell-inner]:items-center [&_.ant-picker-cell-inner]:justify-center [&_.ant-picker-cell-inner]:rounded-[24px]',
  '[&_.ant-picker-cell-today_.ant-picker-cell-inner]:before:border-none [&_.ant-picker-content_tbody_tr]:flex [&_.ant-picker-content_tr_td]:before:bg-none',
  '[&_.ant-picker-content_tr_td:is(:last-child).ant-picker-cell-in-range]:rounded-r-[24px]',
  '[&_.ant-picker-content_tr_td:is(:first-child).ant-picker-cell-in-range]:rounded-l-[24px]',
  '[&_.ant-picker-panel>.ant-picker-date-panel>.ant-picker-header>.ant-picker-header-super-prev-btn]:hidden',
  '[&_.ant-picker-panel>.ant-picker-date-panel>.ant-picker-header>.ant-picker-header-super-next-btn]:hidden',
  '[&_.ant-picker-panel>.ant-picker-date-panel>.ant-picker-body>.ant-picker-content>tbody>tr>td>.ant-picker-cell-inner]:w-[40px]',
  '[&_.ant-picker-panel>.ant-picker-date-panel>.ant-picker-body>.ant-picker-content>tbody>tr>td>.ant-picker-cell-inner]:h-[40px]',
  '[&_.ant-picker-cell-in-range]:bg-tertiary [&_.ant-picker-cell-in-range_.ant-picker-cell-inner]:rounded-none [&_.ant-picker-footer]:hidden',
  '[&_.ant-picker-content_tr_td.ant-picker-cell-range-start]:bg-tertiary [&_.ant-picker-content_tr_td.ant-picker-cell-range-start]:rounded-l-[24px]',
  '[&_.ant-picker-content_tr_td.ant-picker-cell-range-end]:bg-tertiary [&_.ant-picker-content_tr_td.ant-picker-cell-range-end]:rounded-r-[24px]',
  '[&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:h-[36px] [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:h-[36px] [&_.ant-picker-header>.ant-picker-header-view]:flex [&_.ant-picker-header>.ant-picker-header-view]:h-[36px] [&_.ant-picker-header>.ant-picker-header-view]:w-full [&_.ant-picker-header>.ant-picker-header-view]:items-center [&_.ant-picker-header>.ant-picker-header-view]:justify-center [&_.ant-picker-header]:flex [&_.ant-picker-header]:w-full [&_.ant-picker-header]:items-center [&_.ant-picker-header]:justify-between',
  '[&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:flex [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:items-center [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:flex [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:items-center',
  '[&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:text-secondary-contrast [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:text-secondary-contrast [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:font-sans [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:text-text-md [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-month-btn]:font-medium [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:font-sans [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:text-text-md [&_.ant-picker-header>.ant-picker-header-view>.ant-picker-year-btn]:font-medium',
  '[&_table>tbody>tr>td]:w-full [&_table>tbody>tr]:h-full [&_table>tbody]:h-full [&_table>tbody]:w-full',
  '[&_table>tbody>tr>td]:flex [&_table>tbody>tr>td]:items-center [&_table>tbody>tr>td]:justify-center',
  '[&_.ant-picker-decade-panel>.ant-picker-header>.ant-picker-header-view]:text-secondary-contrast [&_.ant-picker-decade-panel>.ant-picker-header>.ant-picker-header-view]:font-sans [&_.ant-picker-decade-panel>.ant-picker-header>.ant-picker-header-view]:text-text-md [&_.ant-picker-decade-panel>.ant-picker-header>.ant-picker-header-view]:font-medium',
  '[&_button]:text-secondary-contrast [&_button]:font-sans [&_button]:text-text-md [&_button]:font-medium',
);

export type DatePickerProps = $DatePickerProps & {
  name?: string;
  leftIcon?: React.ReactNode | boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue?: FormikHelpers<any>['setFieldValue'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldTouched?: FormikHelpers<any>['setFieldTouched'];
};

export function DatePicker({
  leftIcon,
  className,
  name,
  value,
  onChange: $onChange,
  setFieldValue,
  setFieldTouched,
  ...props
}: DatePickerProps) {
  return (
    <DatePickerWrapper
      className={cn(
        leftIcon ? 'left-icon' : '',
        '[&_.ant-picker:focus]:border-brand [&_.ant-picker:hover]:border-brand h-[44px] [&>svg]:text-secondary [&_svg]:h-[20px] [&_svg]:w-[20px]',
        className,
      )}
    >
      {leftIcon && (
        <div
          className={cn('text-tertiary absolute  z-10', 'ml-[12px] mt-[12px]')}
        >
          {leftIcon}
        </div>
      )}
      <$DatePicker
        suffixIcon={false}
        allowClear={{ clearIcon: <XClose className="text-brand" /> }}
        className={cn(datePickerVariants({ error: false }))}
        popupClassName={cn(popupClassName)}
        name={name}
        value={value}
        onChange={(date, dateString) => {
          $onChange?.(date, dateString);
          if (name) {
            setFieldValue?.(name, date);
            setFieldTouched?.(name, true, false);
          }
        }}
        superPrevIcon={
          <Button
            type="secondary"
            icon={<ChevronLeft className="size-5xl" />}
          />
        }
        superNextIcon={
          <Button
            type="secondary"
            icon={<ChevronRight className="size-5xl" />}
          />
        }
        prevIcon={
          <Button
            type="secondary"
            icon={<ChevronLeft className="size-5xl" />}
          />
        }
        nextIcon={
          <Button
            type="secondary"
            icon={<ChevronRight className="size-5xl" />}
          />
        }
        {...props}
      />
    </DatePickerWrapper>
  );
}
// export type WeekPickerProps =  $WeekPickerProps;
export type RangePickerProps = $RangePickerProps & {
  leftIcon?: React.ReactNode | boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue?: FormikHelpers<any>['setFieldValue'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldTouched?: FormikHelpers<any>['setFieldTouched'];
};
// export type MonthPickerProps = $MonthPickerProps & { keepOffset?: boolean };
function RangePicker({
  leftIcon,
  className,

  name,
  value,
  onChange: $onChange,
  setFieldValue,
  setFieldTouched,
  ...props
}: RangePickerProps) {
  return (
    <DatePickerWrapper
      className={cn(
        leftIcon ? 'left-icon' : '',
        '[&_.ant-picker:focus]:border-brand [&_.ant-picker:hover]:border-brand [&_svg]:h-[20px] [&_svg]:w-[20px]',
        className,
      )}
    >
      {leftIcon && (
        <div
          className={cn('text-tertiary absolute  z-10', 'ml-[12px] mt-[12px]')}
        >
          {leftIcon}
        </div>
      )}
      <$RangePicker
        mode={['date', 'date']}
        suffixIcon={false}
        separator={<ArrowNarrowRight />}
        allowClear={{ clearIcon: <XClose className="text-brand" /> }}
        className={cn(datePickerVariants({ error: false }), className)}
        popupClassName={cn(popupClassName)}
        name={name}
        value={value}
        onChange={(date, dateString) => {
          $onChange?.(date, dateString);
          if (name) {
            setFieldValue?.(name, date);
            setFieldTouched?.(name, true, false);
          }
        }}
        allowEmpty={[true, true]}
        superNextIcon={false}
        superPrevIcon={false}
        prevIcon={
          <Button
            type="secondary"
            icon={<ChevronLeft className="size-5xl" />}
          />
        }
        nextIcon={
          <Button
            type="secondary"
            icon={<ChevronRight className="size-5xl" />}
          />
        }
        {...props}
      />
    </DatePickerWrapper>
  );
}
DatePicker.RangePicker = RangePicker;
RangePicker.displayName = 'DatePicker.RangePicker';
DatePicker.RangePicker.displayName = 'DatePicker.RangePicker';
