'use client';

import { useRouter, usePathname } from 'next/navigation'; // ✨
import { cn } from '@/utils/tailwindMerge';
import {
  HomeOutlined,
  UserOutlined,
  FileAddOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const menuItems = [
  {
    label: 'Хянах самбар',
    path: '/dashboard',
    icon: <HomeOutlined />,
  },
  {
    label: 'Жолоочид',
    path: '/',
    icon: <UserOutlined />,
  },
  {
    label: 'Бүртгэл үүсгэх',
    path: '/register',
    icon: <FileAddOutlined />,
  },
  {
    label: 'Шалгах хуудас',
    path: '/checklist',
    icon: <FileTextOutlined />,
  },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    if (path !== pathname) {
      router.push(path);
    }
  };

  return (
    <div className="w-64 py-6 flex min-h-screen flex-col justify-between bg-primary text-[#5c4033]">
      <div className="flex flex-col gap-md">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              'gap-4 flex cursor-pointer items-center gap-6xl px-3xl py-3xl transition-all duration-200',
              pathname === item.path
                ? 'text-lg bg-brand font-bold text-white'
                : 'text-md font-semibold hover:bg-[#f5d8bc]',
            )}
          >
            {item.icon}
            <span className="w-[150px] text-text-lg">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
