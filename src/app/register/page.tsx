'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, CreateAdminModal, CreateDriverModal } from '@/components';
import type dayjs from 'dayjs';
import { RegisterFilter, RegisterContainer } from './components/detail';

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [role, setRole] = useState('');
  const { data: session } = useSession();

  const isSuperAdmin = session?.user?.email === 'super@admin.com';

  const handleReload = () => {
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Бүртгэл үүсгэх</Button>
      </div>
      <RegisterFilter
        search={search}
        onSearchChange={setSearch}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        role={role}
        onRoleChange={setRole}
      />

      <RegisterContainer
        reloadFlag={reloadFlag}
        search={search}
        dateRange={dateRange}
        role={role}
      />

      {isSuperAdmin ? (
        <CreateAdminModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={handleReload}
        />
      ) : (
        <CreateDriverModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={handleReload}
        />
      )}
    </div>
  );
}
