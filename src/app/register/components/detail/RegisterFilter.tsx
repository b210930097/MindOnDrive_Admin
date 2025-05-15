'use client';

import { Input, DatePicker, Select } from '@/components';
import { XClose } from '@untitled-ui/icons-react';
import type dayjs from 'dayjs';

interface RegisterFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  date: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  role: string;
  onRoleChange: (val: string) => void;
}

export function RegisterFilter({
  search,
  onSearchChange,
  date,
  onDateChange,
  role,
  onRoleChange,
}: RegisterFilterProps) {
  return (
    <div className="mb-4 flex w-full flex-wrap items-start gap-xl">
      <div className="flex w-full flex-col gap-sm sm:w-[220px]">
        <div className="text-text-sm font-medium">Огноо</div>
        <DatePicker
          value={date}
          onChange={onDateChange}
          placeholder="Огноо сонгох"
          className="w-full"
        />
      </div>
      <div className="flex w-full flex-col gap-sm sm:w-[220px]">
        <div className="text-text-sm font-medium">Role</div>
        <Select
          allowClear={{ clearIcon: <XClose className="text-brand" /> }}
          value={role}
          placeholder="Role сонгох"
          options={[
            { label: 'Admin', value: 'Admin' },
            { label: 'Driver', value: 'Driver' },
          ]}
          onChange={(e) => onRoleChange(e || '')}
        />
      </div>

      <div className="flex w-full flex-col gap-sm sm:w-[220px]">
        <div className="text-text-sm font-medium">Хайлт</div>
        <Input
          isSearch
          placeholder="Нэр, имэйл, утас..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
