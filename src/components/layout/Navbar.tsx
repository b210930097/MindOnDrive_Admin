'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export function Navbar() {
  return (
    <div className="bg-white p-4 flex items-center justify-between shadow-sm">
      <Input
        prefix={<SearchOutlined />}
        placeholder="Хайлт хийх..."
        className="w-96"
      />

      <div className="space-x-4 flex items-center">
        <button className="px-4 py-2 rounded-lg bg-[#4c94f0] text-white">
          Стафф бүртгэх
        </button>
        <button className="px-4 py-2 rounded-lg bg-[#4c94f0] text-white">
          Олон бүртгэл татах
        </button>
      </div>
    </div>
  );
}
