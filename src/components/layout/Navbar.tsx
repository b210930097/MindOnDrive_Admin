'use client';

import { Avatar, Dropdown, Menu, Space, Typography, message } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { alertModal } from '../UseAlertModal';
import { useRouter } from 'next/navigation';
import { Routes } from '@/config/routes';

export function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/auth',
      });
      message.success('Амжилттай гарлаа!');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Гарахад алдаа гарлаа!');
    }
  };

  const showConfirmLogout = () => {
    alertModal.confirm({
      closable: true,
      icon: <LogoutOutlined className="text-danger" />,
      title: 'Гарах',
      description: 'Та системээс гарахдаа итгэлтэй байна уу?',
      okText: 'Тийм',
      cancelText: 'Үгүй',
      onOk: handleLogout,
    });
  };

  const menuItems = [
    {
      key: 'profile',
      label: (
        <div className="flex items-center gap-lg rounded-md font-medium text-primary transition-all">
          <UserOutlined className="text-text-lg" />
          <span className="text-text-sm">Хувийн профайл</span>
        </div>
      ),
      onClick: () => router.push(Routes.Profile.Index.route),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-lg rounded-md font-medium text-danger transition-all">
          <LogoutOutlined className="text-text-lg" />
          <span className="text-text-sm">Гарах</span>
        </div>
      ),
      onClick: showConfirmLogout,
    },
  ];

  return (
    <div className="flex items-center justify-between bg-primary p-xl shadow-sm">
      <div className="flex items-center gap-md">
        <Avatar src="/admin-profile.jpg" size="large" />
        <span className="text-text-xl font-bold">Mind On Driver</span>
      </div>

      <Dropdown
        overlay={<Menu items={menuItems} className="p-2 rounded-lg" />}
        trigger={['hover']}
        placement="bottomRight"
        mouseEnterDelay={0.2}
        mouseLeaveDelay={0.2}
      >
        <div className="flex items-center gap-md rounded-md p-md hover:bg-[#f5d8bc]">
          <Avatar src="/admin-profile.jpg" size="small" />
          <Space size="small">
            <Typography.Text className="font-medium">
              {session?.user.lastName && session?.user.firstName
                ? session.user.lastName + ' ' + session.user.firstName
                : session?.user.email}
            </Typography.Text>
            <DownOutlined style={{ fontSize: '12px', color: 'gray' }} />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
}
