'use client';

import { useState } from 'react';
import DashboardContainer from './components/DashboardContainer';
import { DashboardFilter } from './components/DashboardFilter';
import type dayjs from 'dayjs';
import type { DetectionStatus, WorkStatus } from '@/types';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus | ''>(
    '',
  );
  const [workStatus, setWorkStatus] = useState<WorkStatus | ''>('');

  return (
    <div className="flex flex-col gap-md">
      <DashboardFilter
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        detectionStatus={detectionStatus}
        onDetectionStatusChange={setDetectionStatus}
        workStatus={workStatus}
        onWorkStatusChange={setWorkStatus}
      />
      <DashboardContainer
        search={search}
        date={date}
        detectionStatus={detectionStatus}
        workStatus={workStatus}
      />
    </div>
  );
}
