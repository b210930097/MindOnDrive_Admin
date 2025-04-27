'use client';

import { useEffect, useState } from 'react';
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

  const fetchChecklist = async () => {
    try {
      const response = await fetch(
        `/api/checklist/read?email=${session?.user.email}`,
      );
      const data = await response.json();

      if (data.success) {
        const driver = data.checklists.filter(
          (item: ChecklistItem) => item.type === TabType.DRIVER,
        );
        const vehicle = data.checklists.filter(
          (item: ChecklistItem) => item.type === TabType.VEHICLE,
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
  };

  useEffect(() => {
    fetchChecklist();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!inputValue.trim()) return;

    try {
      setLoading(true);

      if (editId) {
        // ✨ Update хийх
        const response = await fetch(`/api/checklist/update?id=${editId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: inputValue,
          }),
        });
        const data = await response.json();

        if (data.success) {
          message.success('Амжилттай засагдлаа!');
        } else {
          message.error(data.message || 'Алдаа гарлаа.');
        }
      } else {
        // ✨ Шинээр нэмэх
        const response = await fetch('/api/checklist/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: currentTab,
            question: inputValue,
            createdBy: session?.user?.email,
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
    <div className="p-6 gap-8 flex flex-col">
      <h1 className="text-3xl font-bold text-[#5c4033]">
        Шалгах хуудас үүсгэх, засах
      </h1>

      <div className="w-[300px]">
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

      <div className="mt-6">
        <h2 className="text-xl mb-4 font-semibold">
          {currentTab === TabType.DRIVER
            ? 'Жолоочийн асуултууд'
            : 'Тээврийн хэрэгслийн асуултууд'}
          :
        </h2>

        <ul className="gap-4 flex flex-col">
          {(currentTab === TabType.DRIVER
            ? driverQuestions
            : vehicleQuestions
          ).map((q, idx) => (
            <li
              key={idx}
              className="p-4 group flex items-center justify-between rounded-md border transition hover:shadow-md"
            >
              <span className="text-base font-medium">{q.question}</span>

              <div className="gap-2 hidden group-hover:flex">
                <Button
                  type="primary"
                  onClick={() => {
                    setInputValue(q.question);
                    setEditId(q.id);
                  }}
                  leftIcon={<EditOutlined />}
                >
                  Засах
                </Button>
                <Button
                  type="primary"
                  destructive
                  onClick={() => handleDelete(q.id)}
                  leftIcon={<DeleteOutlined />}
                >
                  Устгах
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="gap-6 mt-6 flex flex-col">
        <Input.TextArea
          placeholder={
            currentTab === TabType.DRIVER
              ? 'Жолоочид зориулсан асуултаа бичнэ үү...'
              : 'Тээврийн хэрэгсэлд зориулсан асуултаа бичнэ үү...'
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={4}
          className="p-4 rounded-md border"
        />

        <Button
          onClick={handleAddOrUpdate}
          className="self-end"
          type="secondary-color"
          size="large"
          loading={loading}
        >
          {editId ? 'Засах' : 'Нэмэх'}
        </Button>
      </div>
    </div>
  );
}
