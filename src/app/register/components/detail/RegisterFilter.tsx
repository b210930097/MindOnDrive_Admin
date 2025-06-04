'use client';

import { Input, DatePicker, Select } from '@/components';
import { XClose } from '@untitled-ui/icons-react';
import type dayjs from 'dayjs';
import { useSession } from 'next-auth/react';

interface RegisterFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDateRangeChange: (range: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  role: string;
  onRoleChange: (val: string) => void;
}

export function RegisterFilter({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  role,
  onRoleChange,
}: RegisterFilterProps) {
  const { data: session } = useSession();
  return (
    <div className="mb-4 flex w-full flex-wrap items-start gap-xl">
      <div className="flex w-full flex-col gap-sm sm:w-[280px]">
        <div className="text-text-sm font-medium">Огноо</div>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={(range) => onDateRangeChange(range || [null, null])}
          placeholder={['Эхлэх огноо', 'Дуусах огноо']}
          className="w-full"
        />
      </div>
      {session?.user.email === 'super@admin.com' && (
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
      )}

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
