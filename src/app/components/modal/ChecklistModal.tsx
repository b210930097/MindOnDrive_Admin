'use client';

import { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import type { User } from '@/types';
import { getFullName, checklistStatusLabels } from '@/utils';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export function ChecklistModal({
  record,
  onClose,
}: {
  record: User;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(record.checklistStatus);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = doc(db, 'users', record.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as User;
        setStatus(data.checklistStatus);
      }
    });

    return () => unsubscribe();
  }, [record.uid]);

  useEffect(() => {
    async function fetchAnswers() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'answers'),
          where('userId', '==', record.uid),
        );
        const snapshot = await getDocs(q);
        const data: any[] = snapshot.docs.map((doc) => doc.data() as any);
        setAnswers(data);
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      } finally {
        setLoading(false);
      }
    }

    if (record.uid) fetchAnswers();
  }, [record.uid]);

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
        <strong>Жолоочийн шалгалт:</strong>{' '}
        {checklistStatusLabels[status?.driver ?? 'not_started']}
      </p>
      <p>
        <strong>Тээврийн хэрэгсэл:</strong>{' '}
        {checklistStatusLabels[status?.vehicle ?? 'not_started']}
      </p>
      <p>
        <strong>Баталгаажуулалт:</strong>{' '}
        {checklistStatusLabels[status?.confirmed ?? 'not_started']}
      </p>

      <div className="mt-4">
        <h4 className="mb-2 font-bold">Хариултууд:</h4>
        {loading ? (
          <Spin />
        ) : (
          <ul className="space-y-2">
            {answers.map((a, idx) => (
              <li key={idx}>
                <p>
                  <strong>Асуулт:</strong> {a.question}
                </p>
                <p>
                  <strong>Хариулт:</strong> {a.answer}{' '}
                  {a.isCorrect === true
                    ? '✅'
                    : a.isCorrect === false
                      ? '❌'
                      : '❓'}
                </p>
              </li>
            ))}
            {answers.length === 0 && <p>Хариулт олдсонгүй.</p>}
          </ul>
        )}
      </div>
    </Modal>
  );
}
