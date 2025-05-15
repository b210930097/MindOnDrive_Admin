'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { fetchUsers } from '@/services/fetch-user';
import { Table } from '@/components';
import { getDashboardColumns } from './DashboardColumns';
import type { User, WorkStatus, DetectionStatus } from '@/types';
import dayjs from 'dayjs';
import {
  ChecklistModal,
  WorkStatusModal,
  DetectionStatusModal,
} from '../modal';

interface Props {
  search: string;
  date: dayjs.Dayjs | null;
  detectionStatus: DetectionStatus | '';
  workStatus: WorkStatus | '';
}

export function DashboardContainer({
  search,
  date,
  detectionStatus,
  workStatus,
}: Props) {
  const { data: session } = useSession();
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<{
    type: 'status' | 'detection' | 'checklist' | null;
    record: User | null;
  }>({ type: null, record: null });

  const handleModalOpen = (
    type: 'status' | 'detection' | 'checklist',
    record: User,
  ) => {
    setModalData({ type, record });
  };

  const handleModalClose = () => {
    setModalData({ type: null, record: null });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const drivers = await fetchUsers(session?.user?.email ?? '');
      setData(drivers);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (session) loadData();
  }, [session, loadData]);

  useEffect(() => {
    let result = [...data];

    if (search) {
      const normalized = search.toLowerCase().replace(/['\s]/g, '');
      result = result.filter((u) => {
        const fullName = `${u.firstName ?? ''}${u.lastName ?? ''}`
          .toLowerCase()
          .replace(/['\s]/g, '');
        const reversed = `${u.lastName ?? ''}${u.firstName ?? ''}`
          .toLowerCase()
          .replace(/['\s]/g, '');
        const uid = (u.uid ?? '').toLowerCase();
        const email = (u.email ?? '').toLowerCase();

        return (
          fullName.includes(normalized) ||
          reversed.includes(normalized) ||
          uid.includes(normalized) ||
          email.includes(normalized)
        );
      });
    }

    if (date) {
      result = result.filter((u) => dayjs(u.createdAt).isSame(date, 'day'));
    }

    if (detectionStatus) {
      result = result.filter((u) => u.detectionStatus === detectionStatus);
    }

    if (workStatus) {
      result = result.filter((u) => u.workStatus === workStatus);
    }

    setFilteredData(result);
  }, [data, search, date, detectionStatus, workStatus]);

  return (
    <>
      <Table
        data={filteredData}
        loading={loading}
        columns={getDashboardColumns(handleModalOpen)}
      />

      {modalData.type === 'status' && modalData.record && (
        <WorkStatusModal
          record={modalData.record}
          onClose={handleModalClose}
          onUpdated={loadData}
        />
      )}
      {modalData.type === 'detection' && modalData.record && (
        <DetectionStatusModal
          record={modalData.record}
          onClose={handleModalClose}
        />
      )}
      {modalData.type === 'checklist' && modalData.record && (
        <ChecklistModal record={modalData.record} onClose={handleModalClose} />
      )}
    </>
  );
}
