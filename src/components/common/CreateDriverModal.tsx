'use client';

import { Modal, message } from 'antd';
import { Formik } from 'formik';
import { FormItem, Input, Button } from '@/components';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Имэйл оруулна уу').email('Имэйл буруу байна'),
  phone: Yup.string().required('Утас оруулна уу').min(8, 'Утас буруу байна'),
  password: Yup.string()
    .required('Нууц үг оруулна уу')
    .min(6, 'Нууц үг 6-аас дээш байх ёстой'),
});

interface CreateDriverModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateDriverModal({
  open,
  onClose,
  onSuccess,
}: CreateDriverModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: {
    email: string;
    phone: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/create-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          createdBy: session?.user?.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        message.success('Жолооч амжилттай нэмэгдлээ!');
        onClose();
        onSuccess();
      } else {
        message.error('Алдаа: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Системийн алдаа!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered>
      <div className="p-8">
        <h2 className="text-2xl mb-6 text-center font-bold">
          Шинэ Жолооч нэмэх
        </h2>
        <Formik
          initialValues={{ email: '', phone: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormItem name="email" required>
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Имэйл"
                />
              </FormItem>
              <FormItem name="phone" required>
                <Input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Утас"
                />
              </FormItem>
              <FormItem name="password" required>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Нууц үг"
                />
              </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Үүсгэх
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
