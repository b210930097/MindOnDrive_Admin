'use client';

import { Modal } from 'antd';
import type { User } from '@/types';
import { getFullName, checklistStatusLabels } from '@/utils';

export function ChecklistModal({
  record,
  onClose,
}: {
  record: User;
  onClose: () => void;
}) {
  const status = record.checklistStatus;

  return (
    <Modal
      open={true}
      onCancel={onClose}
      onOk={onClose}
      title="Шалгах хуудасны явц"
    >
      <p>
        <strong>Хэрэглэгч:</strong> {getFullName(record)}
      </p>

      <p>
        <strong>Жолоочийн шалгалт (Driver Checklist):</strong>{' '}
        {checklistStatusLabels[status?.driver ?? 'not_started']}
      </p>
      <p>
        <strong>Тээврийн хэрэгсэл (Vehicle Checklist):</strong>{' '}
        {checklistStatusLabels[status?.vehicle ?? 'not_started']}
      </p>
      <p>
        <strong>Баталгаажуулалт (Confirmation):</strong>{' '}
        {checklistStatusLabels[status?.confirmed ?? 'not_started']}
      </p>
    </Modal>
  );
}
