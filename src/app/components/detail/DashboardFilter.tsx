'use client';

import { DatePicker, Input, Select } from '@/components';
import type { DetectionStatus, WorkStatus } from '@/types';
import { XClose } from '@untitled-ui/icons-react';
import type dayjs from 'dayjs';

interface DashboardFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDateRangeChange: (range: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  detectionStatus: DetectionStatus | '';
  onDetectionStatusChange: (status: DetectionStatus | '') => void;
  workStatus: WorkStatus | '';
  onWorkStatusChange: (status: WorkStatus | '') => void;
}

export function DashboardFilter({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  detectionStatus,
  onDetectionStatusChange,
  workStatus,
  onWorkStatusChange,
}: DashboardFilterProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-xl">
        <div className="flex w-full flex-col gap-sm sm:w-[280px]">
          <div className="text-text-sm font-medium">Огноо</div>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(range) => onDateRangeChange(range || [null, null])}
            placeholder={['Эхлэх огноо', 'Дуусах огноо']}
            className="w-full"
          />
        </div>

        <div className="flex w-full flex-col gap-sm sm:w-[220px]">
          <div className="text-text-sm font-medium">Нэр</div>
          <Input
            isSearch
            placeholder="Нэр, имэйл, утас..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-xl">
        <div className="flex w-full flex-col gap-sm sm:w-[220px]">
          <div className="text-text-sm font-medium">Ажлын статус</div>
          <Select
            allowClear={{ clearIcon: <XClose className="text-brand" /> }}
            value={workStatus}
            placeholder="Статус сонгох"
            options={[
              { label: 'Бэлэн биш', value: 'Бэлэн биш' },
              { label: 'Бэлэн', value: 'Бэлэн' },
              { label: 'Хүлээгдэж байна', value: 'Хүлээгдэж байна' },
              { label: 'Ажиллах боломжгүй', value: 'Ажиллах боломжгүй' },
            ]}
            onChange={(e) => onWorkStatusChange(e || '')}
          />
        </div>
        <div className="flex w-full flex-col gap-sm sm:w-[220px]">
          <div className="text-text-sm font-medium">Ажлын явц</div>
          <Select
            allowClear={{ clearIcon: <XClose className="text-brand" /> }}
            value={detectionStatus}
            placeholder="Явц сонгох"
            options={[
              { label: 'Тодорхойгүй', value: 'Тодорхойгүй' },
              { label: 'Зүүрмэглэсэн', value: 'Зүүрмэглэсэн' },
              { label: 'Сатаарсан', value: 'Сатаарсан' },
              { label: 'Сэрүүн', value: 'Сэрүүн' },
            ]}
            onChange={(e) => onDetectionStatusChange(e || '')}
          />
        </div>
      </div>
    </div>
  );
}
