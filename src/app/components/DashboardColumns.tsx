import type { ColumnsType } from 'antd/es/table';
import type { User } from '@/types';
import { Steps } from 'antd';
import { ArrowRight } from '@untitled-ui/icons-react';
import { Button } from '@/components';

export const getDashboardColumns = (): ColumnsType<User> => [
  {
    title: 'Огноо',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: 'Нэр',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (_, record) => (
      <div className="flex items-center justify-between">
        {record.lastName ?? ''} {record.firstName ?? ''}
        <Button
          className="rounded-none"
          type="secondary"
          size="small"
          icon={<ArrowRight />}
        />
      </div>
    ),
  },
  {
    title: 'Шалгах хуудасны явц',
    key: 'checklistStatus',
    render: () => (
      <div className="flex items-center justify-between">
        <Steps
          current={1}
          size="small"
          items={[
            { status: 'finish' },
            { status: 'process' },
            { status: 'wait' },
          ]}
        />
        <Button
          className="rounded-none"
          type="secondary"
          size="small"
          icon={<ArrowRight />}
        />
      </div>
    ),
  },
  {
    title: 'Ажлын явц',
    key: 'detectionStatus',
    render: (_, record) => {
      const color =
        record.detectionStatus === 'Сэрүүн'
          ? 'green'
          : record.detectionStatus === 'Зүүрмэглэсэн'
            ? 'red'
            : 'orange';
      return (
        <div className="flex items-center justify-between">
          <span style={{ color }}>Сатаарсан</span>
          <Button type="secondary" size="small" icon={<ArrowRight />} />
        </div>
      );
    },
  },
  {
    title: 'Статус',
    key: 'workStatus',
    render: (_, record) => {
      const color =
        record.workStatus === 'Бэлэн'
          ? 'green'
          : record.workStatus === 'Хүлээгдэж байна'
            ? 'orange'
            : 'red';
      return (
        <div className="flex items-center justify-between">
          <span style={{ color }}>Ажиллах боломжгүй</span>
          <Button type="secondary" size="small" icon={<ArrowRight />} />
        </div>
      );
    },
  },
];
