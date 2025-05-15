'use client';

import { Modal, message } from 'antd';
import { Formik } from 'formik';
import { FormItem, Input, Button } from '@/components';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Байгууллагын нэр оруулна уу'),
  email: Yup.string().required('Имэйл оруулна уу').email('Имэйл буруу байна'),
  phone: Yup.string().required('Утас оруулна уу').min(8, 'Утас буруу байна'),
  password: Yup.string()
    .required('Нууц үг оруулна уу')
    .min(6, 'Нууц үг 6-аас дээш байх ёстой'),
});

interface CreateAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateAdminModal({
  open,
  onClose,
  onSuccess,
}: CreateAdminModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    values: {
      companyName: string;
      email: string;
      phone: string;
      password: string;
    },
    { resetForm }: { resetForm: () => void },
  ) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/create-branch-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          createdBy: session?.user?.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        message.success('Салбар амжилттай нэмэгдлээ!');
        resetForm();
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
      <h2 className="text-center">Шинэ Салбар үүсгэх</h2>
      <Formik
        initialValues={{
          companyName: '',
          email: '',
          phone: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-md p-md">
            <FormItem label="Байгууллагын нэр" name="companyName" required>
              <Input
                name="companyName"
                value={values.email}
                onChange={handleChange}
                placeholder="Байгууллагын нэр"
              />
            </FormItem>
            <FormItem label="Имэйл" name="email" required>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Имэйл"
              />
            </FormItem>
            <FormItem label="Утас" name="phone" required>
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Утас"
              />
            </FormItem>
            <FormItem label="Нууц үг" name="password" required>
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
              size="large"
              loading={loading}
            >
              Үүсгэх
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
