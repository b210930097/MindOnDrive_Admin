'use client';

import { useState } from 'react';
import { DashboardFilter, DashboardContainer } from './components/detail';
import type dayjs from 'dayjs';
import type { DetectionStatus, WorkStatus } from '@/types';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus | ''>(
    '',
  );
  const [workStatus, setWorkStatus] = useState<WorkStatus | ''>('');

  return (
    <div className="flex flex-col gap-md">
      <DashboardFilter
        search={search}
        onSearchChange={setSearch}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        detectionStatus={detectionStatus}
        onDetectionStatusChange={setDetectionStatus}
        workStatus={workStatus}
        onWorkStatusChange={setWorkStatus}
      />
      <DashboardContainer
        search={search}
        dateRange={dateRange}
        detectionStatus={detectionStatus}
        workStatus={workStatus}
      />
    </div>
  );
}
