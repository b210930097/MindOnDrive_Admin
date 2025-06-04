'use client';
import { Modal, Select, message } from 'antd';
import { useState } from 'react';
import type { User, WorkStatus } from '@/types';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { UserCard } from '@/components';

const statusOptions: WorkStatus[] = [
  'Бэлэн биш',
  'Бэлэн',
  'Хүлээгдэж байна',
  'Ажиллах боломжгүй',
];

export function WorkStatusModal({
  record,
  onClose,
  onUpdated,
}: {
  record: User;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState<WorkStatus>(
    record.workStatus ?? 'Бэлэн биш',
  );

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!status) return;

    setLoading(true);
    try {
      const ref = doc(db, 'users', record.uid);
      await updateDoc(ref, { workStatus: status });

      message.success('Ажлын статус амжилттай шинэчлэгдлээ.');
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      message.error('Шинэчлэхэд алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onCancel={onClose}
      onOk={handleSave}
      okText="Хадгалах"
      cancelText="Буцах"
      confirmLoading={loading}
      title="Ажлын статус засах"
    >
      <div className="gap-md">
        <UserCard user={record} />
        <Select
          className="w-full"
          value={status}
          onChange={(val) => setStatus(val)}
          placeholder="Статус сонгох"
          options={statusOptions.map((s) => ({ label: s, value: s }))}
        />
      </div>
    </Modal>
  );
}
