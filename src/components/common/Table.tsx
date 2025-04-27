'use client';

import { Table as AntTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import type { Driver, BranchAdmin } from '@/types';
import { fetchBranchAdmins, fetchDriversByBranch } from '@/services/fetch-user';
import { useSession } from 'next-auth/react';

interface TableProps {
  reloadFlag: boolean;
}

export function Table({ reloadFlag }: TableProps) {
  const { data: session } = useSession();
  const [data, setData] = useState<(Driver | BranchAdmin)[]>([]);
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = session?.user?.email === 'super@admin.com';

  const loadData = async () => {
    setLoading(true);
    try {
      if (isSuperAdmin) {
        const branchAdmins = await fetchBranchAdmins();
        setData(branchAdmins);
      } else if (session?.user?.email) {
        const drivers = await fetchDriversByBranch(session.user.email);
        setData(drivers);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session, reloadFlag]);

  const columns: ColumnsType<Driver | BranchAdmin> = [
    {
      title: isSuperAdmin ? 'Салбарын нэр' : 'Жолоочийн нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Имэйл',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Утас',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Үүссэн огноо',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (timestamp) =>
        timestamp
          ? new Date((timestamp?.seconds ?? 0) * 1000).toLocaleDateString()
          : '-',
    },
  ];

  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.id}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}
