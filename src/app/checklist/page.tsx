'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Tabs } from '@/components';
import { Input, message, Modal } from 'antd';
import { useSession } from 'next-auth/react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

enum TabType {
  DRIVER = 'driver',
  VEHICLE = 'vehicle',
}

interface ChecklistItem {
  id: string;
  question: string;
  type: TabType;
  createdBy: string;
  createdAt: string;
}

export default function ChecklistPage() {
  const { data: session } = useSession();
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.DRIVER);
  const [driverQuestions, setDriverQuestions] = useState<ChecklistItem[]>([]);
  const [vehicleQuestions, setVehicleQuestions] = useState<ChecklistItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

  const fetchChecklist = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/checklist/read?email=${session?.user.email}`,
      );
      const data = await response.json();

      if (data.success) {
        const driver = data.checklists
          .filter((item: ChecklistItem) => item.type === TabType.DRIVER)
          .sort(
            (a: ChecklistItem, b: ChecklistItem) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );

        const vehicle = data.checklists
          .filter((item: ChecklistItem) => item.type === TabType.VEHICLE)
          .sort(
            (a: ChecklistItem, b: ChecklistItem) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );

        setDriverQuestions(driver);
        setVehicleQuestions(vehicle);
      } else {
        message.error('Checklist татаж чадсангүй.');
      }
    } catch (error) {
      console.error(error);
      message.error('Алдаа гарлаа.');
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchChecklist();
    }
  }, [session?.user?.email, fetchChecklist]);

  const handleAddOrUpdate = async () => {
    if (!inputValue.trim() || correctAnswer === null) {
      message.error('Асуулт болон хариултын утгаа бөглөнө үү!');
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        const response = await fetch(`/api/checklist/update?id=${editId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: inputValue,
            ...(currentTab === TabType.DRIVER
              ? { isCorrect: correctAnswer }
              : { isFix: correctAnswer }),
          }),
        });
        const data = await response.json();

        if (data.success) {
          message.success('Амжилттай засагдлаа!');
        } else {
          message.error(data.message || 'Алдаа гарлаа.');
        }
      } else {
        const response = await fetch('/api/checklist/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: currentTab,
            question: inputValue,
            createdBy: session?.user?.email,
            ...(currentTab === TabType.DRIVER
              ? { isCorrect: correctAnswer }
              : { isFix: correctAnswer }),
          }),
        });
        const data = await response.json();

        if (data.success) {
          message.success('Асуулт амжилттай нэмэгдлээ!');
        } else {
          message.error(data.message || 'Алдаа гарлаа.');
        }
      }

      setInputValue('');
      setEditId(null);
      setCorrectAnswer(null);
      fetchChecklist();
    } catch (error) {
      console.error(error);
      message.error('Алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Устгах уу?',
      content: 'Энэ асуултыг устгахдаа итгэлтэй байна уу?',
      okText: 'Тийм',
      cancelText: 'Үгүй',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const res = await fetch(`/api/checklist/delete?id=${id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success) {
            message.success('Амжилттай устгалаа!');
            fetchChecklist();
          } else {
            message.error(data.message || 'Устгаж чадсангүй.');
          }
        } catch (error) {
          console.error(error);
          message.error('Алдаа гарлаа.');
        }
      },
    });
  };

  const currentQuestions =
    currentTab === TabType.DRIVER ? driverQuestions : vehicleQuestions;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-[#5c4033]">
        Шалгах хуудас үүсгэх, засах
      </h1>

      <div className="w-[400px]">
        <Tabs
          currentTab={currentTab}
          onChange={(key) => setCurrentTab(key as TabType)}
          isFull
          items={[
            {
              key: TabType.DRIVER,
              label: 'Жолооч',
              number: driverQuestions.length,
            },
            {
              key: TabType.VEHICLE,
              label: 'Тээврийн хэрэгсэл',
              number: vehicleQuestions.length,
            },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">
          {currentTab === TabType.DRIVER
            ? 'Жолоочийн асуултууд'
            : 'Тээврийн хэрэгслийн асуултууд'}
          :
        </h2>

        <div className="flex w-full flex-col gap-md">
          {currentQuestions.map((item, idx) => (
            <div
              key={idx}
              className="border group flex min-h-10xl items-center justify-between rounded-md bg-white p-md shadow-md"
            >
              <span className="text-base font-medium">{item.question}</span>

              <div className="hidden gap-sm group-hover:flex">
                <Button
                  type="primary"
                  onClick={() => {
                    setInputValue(item.question);
                    setEditId(item.id);
                  }}
                  leftIcon={<EditOutlined />}
                >
                  Засах
                </Button>
                <Button
                  type="primary"
                  destructive
                  onClick={() => handleDelete(item.id)}
                  leftIcon={<DeleteOutlined />}
                >
                  Устгах
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-md flex flex-col gap-md">
        <Input.TextArea
          placeholder={
            currentTab === TabType.DRIVER
              ? 'Жолоочид зориулсан асуултаа бичнэ үү...'
              : 'Тээврийн хэрэгсэлд зориулсан асуултаа бичнэ үү...'
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={4}
          className="p-4 border rounded-md"
        />

        {currentTab === TabType.DRIVER ? (
          <div className="flex gap-sm">
            <span>Зөв хариулт:</span>
            <label className="flex items-center gap-xxs">
              <input
                type="radio"
                value="true"
                checked={correctAnswer === true}
                onChange={() => setCorrectAnswer(true)}
              />
              Тийм
            </label>
            <label className="flex items-center gap-xxs">
              <input
                type="radio"
                value="false"
                checked={correctAnswer === false}
                onChange={() => setCorrectAnswer(false)}
              />
              Үгүй
            </label>
          </div>
        ) : (
          <div className="flex gap-xs">
            <span>Анхан байдал:</span>
            <label className="flex items-center gap-xxs">
              <input
                type="radio"
                value="false"
                checked={correctAnswer === false}
                onChange={() => setCorrectAnswer(false)}
              />
              Хэвийн
            </label>
            <label className="flex items-center gap-xxs">
              <input
                type="radio"
                value="true"
                checked={correctAnswer === true}
                onChange={() => setCorrectAnswer(true)}
              />
              Засах шаардлагатай
            </label>
          </div>
        )}

        <Button
          onClick={handleAddOrUpdate}
          className="self-end"
          loading={loading}
        >
          {editId ? 'Засах' : 'Нэмэх'}
        </Button>
      </div>
    </div>
  );
}
