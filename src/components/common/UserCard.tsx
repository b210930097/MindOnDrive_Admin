'use client';

import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { User } from '@/types';
import { getFullName } from '@/utils';

type Props = {
  user: User;
  children?: React.ReactNode;
};

export function UserCard({ user, children }: Props) {
  return (
    <Card
      style={{
        backgroundColor: '#fff7f0',
        border: '1px solid #ffe3cd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        zIndex: 2,
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Avatar icon={<UserOutlined />} />
        <div>
          <div style={{ fontSize: 14, color: '#888' }}>Жолооч</div>
          <div style={{ fontWeight: 600 }}>{getFullName(user)}</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {children}
      </div>
    </Card>
  );
}
