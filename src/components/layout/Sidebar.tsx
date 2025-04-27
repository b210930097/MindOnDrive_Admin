'use client';

import { useRouter, usePathname } from 'next/navigation'; // ✨
import { cn } from '@/utils/tailwindMerge';
import {
  HomeOutlined,
  UserOutlined,
  FileAddOutlined,
  FileTextOutlined,
  SettingOutlined,
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
  {
    label: 'Тохиргоо',
    path: '/settings',
    icon: <SettingOutlined />,
  },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // ✨

  const handleNavigation = (path: string) => {
    if (path !== pathname) {
      router.push(path);
    }
  };

  return (
    <div className="w-64 py-6 flex min-h-screen flex-col justify-between bg-[#fbe9d4] text-[#5c4033]">
      <div className="space-y-2 flex flex-col">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              'gap-4 flex cursor-pointer items-center gap-6xl px-3xl py-3xl transition-all duration-200',
              pathname === item.path
                ? 'text-lg text-white bg-[#8a5a2d] font-bold'
                : 'text-md font-semibold hover:bg-[#f5d8bc]',
            )}
          >
            {item.icon}
            <span className="text-text-lg w-[150px]">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="gap-3 px-6 py-4 flex items-center">
        <div className="w-8 h-8 rounded-full border border-[#5c4033]" />
        <div className="font-semibold text-[#5c4033]">Admin</div>
      </div>
    </div>
  );
}
