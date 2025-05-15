import type { ColumnsType } from 'antd/es/table';
import type { User } from '@/types';
import { Steps } from 'antd';
import { ArrowRight } from '@untitled-ui/icons-react';
import { Button } from '@/components';
import { getFullName } from '@/utils';

export const getDashboardColumns = (
  onModalOpen: (
    type: 'status' | 'detection' | 'checklist',
    record: User,
  ) => void,
): ColumnsType<User> => [
  {
    title: 'Огноо',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: 'Нэр',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => getFullName(record),
  },
  {
    title: 'Шалгах хуудасны явц',
    key: 'checklistStatus',
    render: (_, record) => (
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
          onClick={() => onModalOpen('checklist', record)}
        />
      </div>
    ),
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
            : record.workStatus === 'Ажиллах боломжгүй'
              ? 'red'
              : 'black';

      return (
        <div className="flex items-center justify-between">
          <span style={{ color }}>{record.workStatus}</span>
          <Button
            type="secondary"
            size="small"
            icon={<ArrowRight />}
            onClick={() => onModalOpen('status', record)}
          />
        </div>
      );
    },
  },
  {
    title: 'Ажлын явц',
    key: 'detectionStatus',
    render: (_, record) => {
      const color =
        record.detectionStatus === 'Сэрүүн'
          ? 'green'
          : record.detectionStatus === 'Сатаарсан'
            ? 'orange'
            : record.detectionStatus === 'Зүүрмэглэсэн'
              ? 'red'
              : 'black';

      return (
        <div className="flex items-center justify-between">
          <span style={{ color }}>
            {record.detectionStatus ?? 'Хоосон байна.'}
          </span>
          <Button
            type="secondary"
            size="small"
            icon={<ArrowRight />}
            onClick={() => onModalOpen('detection', record)}
          />
        </div>
      );
    },
  },
];
