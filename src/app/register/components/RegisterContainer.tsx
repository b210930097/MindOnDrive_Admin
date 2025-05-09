'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { fetchUsers } from '@/services/fetch-user';
import type { User } from '@/types';
import { Table } from '@/components';
import { getRegisterColumns } from './RegisterColumns';
import dayjs from 'dayjs';

interface Props {
  reloadFlag?: boolean;
  search: string;
  date: dayjs.Dayjs | null;
  role: string;
}

export default function RegisterContainer({
  reloadFlag,
  search,
  date,
  role,
}: Props) {
  const { data: session } = useSession();
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const users = await fetchUsers(session?.user?.email ?? '');
      setData(users);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (session) loadData();
  }, [session, loadData, reloadFlag]);

  useEffect(() => {
    let result = [...data];

    if (search) {
      const normalized = search.toLowerCase().replace(/['\s]/g, '');
      result = result.filter((u) => {
        const fullname = `${u.firstName ?? ''}${u.lastName ?? ''}`
          .toLowerCase()
          .replace(/['\s]/g, '');
        const reverse = `${u.lastName ?? ''}${u.firstName ?? ''}`
          .toLowerCase()
          .replace(/['\s]/g, '');
        return (
          fullname.includes(normalized) ||
          reverse.includes(normalized) ||
          (u.email ?? '').toLowerCase().includes(normalized) ||
          (u.phone ?? '').toLowerCase().includes(normalized)
        );
      });
    }

    if (date) {
      result = result.filter((u) => dayjs(u.createdAt).isSame(date, 'day'));
    }

    if (role) {
      result = result.filter((u) => u.role === role);
    }

    setFilteredData(result);
  }, [data, search, date, role]);

  return (
    <Table
      data={filteredData}
      loading={loading}
      columns={getRegisterColumns()}
    />
  );
}
