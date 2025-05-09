'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, CreateAdminModal, CreateDriverModal } from '@/components';
import RegisterContainer from './components/RegisterContainer';
import { RegisterFilter } from './components/RegisterFilter';
import type dayjs from 'dayjs';

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
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
        date={date}
        onDateChange={setDate}
        role={role}
        onRoleChange={setRole}
      />

      <RegisterContainer
        reloadFlag={reloadFlag}
        search={search}
        date={date}
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
