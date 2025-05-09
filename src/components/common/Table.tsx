'use client';

import { Table as AntTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '@/types';

interface TableProps {
  data: User[];
  loading: boolean;
  columns: ColumnsType<User>;
}

export function Table({ data, loading, columns }: TableProps) {
  return (
    <AntTable
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.uid}
      loading={loading}
      pagination={{ pageSize: 10 }}
      locale={{
        triggerDesc: 'Буурахаар эрэмбэлэх',
        triggerAsc: 'Өсөхөөр эрэмбэлэх',
        cancelSort: 'Эрэмбэлэлтийг цуцлах',
      }}
    />
  );
}
