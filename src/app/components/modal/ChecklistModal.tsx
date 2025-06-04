'use client';

import { useEffect, useState, useRef } from 'react';
import { Modal, Card, Badge, Spin, Button } from 'antd';
import type { Answer, User } from '@/types';
import {
  checklistStatusLabels,
  statusToBadgeStatus,
  templatePDF,
} from '@/utils';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { Tabs, UserCard } from '@/components';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = (pdfFonts as any).vfs;

enum TabType {
  DRIVER = 'driver',
  VEHICLE = 'vehicle',
}

export function ChecklistModal({
  record,
  onClose,
}: {
  record: User;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(record.checklistStatus);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.DRIVER);
  const contentRef = useRef<HTMLDivElement>(null);

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
        const data: Answer[] = snapshot.docs.map((doc) => doc.data() as Answer);
        setAnswers(data);
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      } finally {
        setLoading(false);
      }
    }

    if (record.uid) fetchAnswers();
  }, [record.uid]);

  const handleExportPDF = () => {
    const docData = templatePDF(record, answers);
    pdfMake.createPdf(docData).download(record.workerId + '.pdf');
  };

  return (
    <Modal
      width="80%"
      open={true}
      onCancel={onClose}
      onOk={onClose}
      okText="Хаах"
      cancelText="Болих"
      title="Шалгах хуудасны явц"
      footer={[
        <Button key="export" onClick={handleExportPDF}>
          PDF-р татах
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Болих
        </Button>,
        <Button key="ok" type="primary" onClick={onClose}>
          Хаах
        </Button>,
      ]}
    >
      <div ref={contentRef}>
        <UserCard user={record}>
          <Badge
            status={statusToBadgeStatus[status?.driver ?? 'not_started']}
            text={`Жолоочийн шалгалт: ${checklistStatusLabels[status?.driver ?? 'not_started']}`}
          />
          <Badge
            status={statusToBadgeStatus[status?.vehicle ?? 'not_started']}
            text={`Тээврийн хэрэгсэлийн шалгалт: ${checklistStatusLabels[status?.vehicle ?? 'not_started']}`}
          />
          <Badge
            status={statusToBadgeStatus[status?.confirmed ?? 'not_started']}
            text={`Шалгалтын баталгаажуулалт: ${checklistStatusLabels[status?.confirmed ?? 'not_started']}`}
          />
        </UserCard>

        <div style={{ marginTop: 16 }}>
          <h4 style={{ fontWeight: 'bold' }}>Хариултууд:</h4>
          <div className="w-[400px]">
            <Tabs
              currentTab={currentTab}
              onChange={(key) => setCurrentTab(key as TabType)}
              isFull
              items={[
                { key: TabType.DRIVER, label: 'Жолооч' },
                { key: TabType.VEHICLE, label: 'Тээврийн хэрэгсэл' },
              ]}
            />
          </div>

          {loading ? (
            <Spin />
          ) : answers.length === 0 ? (
            <p>Хариулт олдсонгүй.</p>
          ) : (
            <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: 16 }}>
              {answers
                .filter((a) =>
                  currentTab === TabType.DRIVER
                    ? a.vehiclePlate === null
                    : a.vehiclePlate !== null,
                )
                .map((a, idx) => (
                  <Card
                    key={idx}
                    type="inner"
                    title={`Асуулт ${idx + 1}`}
                    style={{ marginBottom: 12 }}
                  >
                    <p>
                      <strong>Асуулт:</strong> {a.question}
                    </p>
                    <p>
                      <strong>Хариулт:</strong> {a.answer}{' '}
                      {a.isCorrect === true
                        ? '✅'
                        : a.isCorrect === false
                          ? '❌'
                          : a.isFix === true && '🛠️'}
                    </p>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
