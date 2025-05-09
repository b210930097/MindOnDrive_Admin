import type { ColumnsType } from 'antd/es/table';
import type { User } from '@/types';

export const getRegisterColumns = (): ColumnsType<User> => [
  {
    title: 'Үүссэн огноо',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Салбарын нэр',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Овог',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Нэр',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Утасны дугаар',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'И-мэйл',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Төрсөн огноо',
    dataIndex: 'birthdate',
    key: 'birthdate',
  },
];
