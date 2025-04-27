'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Button,
  CreateAdminModal,
  CreateDriverModal,
  Table,
} from '@/components';

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);
  const { data: session } = useSession();

  const isSuperAdmin = session?.user?.email === 'super@admin.com';

  const handleReload = () => {
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold text-[#5c4033]">
          Бүртгэл үүсгэх
        </h1>

        <div className="mb-4 flex justify-end">
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full bg-[#fbd2af] font-bold text-[#5c4033]"
          >
            Бүртгэл үүсгэх
          </Button>
        </div>

        <Table reloadFlag={reloadFlag} />

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
    </div>
  );
}
