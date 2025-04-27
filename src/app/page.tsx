'use client';

import { Table, Button } from '@/components';
import { signOut } from 'next-auth/react';
import { message } from 'antd';

export default function HomePage() {
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

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#5c4033]">
          Жолоочдын жагсаалт
        </h1>

        <Button
          type="secondary-gray"
          size="large"
          onClick={handleLogout}
          className="rounded-full font-bold text-[#5c4033]"
        >
          Гарах
        </Button>
      </div>

      <Table />
    </div>
  );
}
