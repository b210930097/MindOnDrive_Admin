'use client';

import { useState } from 'react';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { Input, Button, FormItem, ProfileCard } from '@/components';
import { Avatar, Form, message } from 'antd';
import * as Yup from 'yup';
import { updateUserProfile } from '@/services/updateUser';
import { UserOutlined } from '@ant-design/icons';

export type ProfileFormInput = {
  lastName: string;
  firstName: string;
  phone: string;
  companyName: string;
  email: string;
};

const validationSchema = Yup.object().shape({
  lastName: Yup.string().required('Овог шаардлагатай!'),
  firstName: Yup.string().required('Нэр шаардлагатай!'),
  phone: Yup.string()
    .matches(/^\d{8}$/, '8 оронтой утасны дугаар оруулна уу')
    .required('Утас шаардлагатай!'),
});

export default function ProfileEditPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const initialData: ProfileFormInput = {
    lastName: session.user.lastName || '',
    firstName: session.user.firstName || '',
    phone: session.user.phone || '',
    companyName: session.user.companyName || '',
    email: session.user.email || '',
  };

  const onSubmit = async (values: ProfileFormInput) => {
    setLoading(true);
    try {
      await updateUserProfile(userId, values);
      message.success('Таны мэдээлэл амжилттай хадгалагдлаа!');
      await update();
    } catch (error) {
      console.error('Profile update error:', error);
      message.error('Мэдээлэл хадгалахад алдаа гарлаа!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleReset, handleChange, values, dirty }) => (
          <Form
            name="form-profile"
            layout="vertical"
            onFinish={handleSubmit}
            onReset={handleReset}
            className="flex w-[800px] flex-col items-center gap-6xl"
          >
            <div className="flex w-full items-center justify-between gap-md">
              <div className="flex items-center gap-md">
                <Avatar icon={<UserOutlined />} size="large" />
                <div className="text-display-xs font-medium">
                  {session?.user.lastName && session?.user.firstName
                    ? session.user.lastName + ' ' + session.user.firstName
                    : session?.user.email}
                </div>
              </div>

              <Button
                size="small"
                htmlType="submit"
                disabled={!dirty}
                loading={loading}
              >
                Хадгалах
              </Button>
            </div>

            {session.user.email !== 'super@admin.com' && (
              <ProfileCard title="Байгууллагын мэдээлэл">
                <FormItem label="Байгууллагын нэр" name="companyName">
                  <Input
                    name="companyName"
                    disabled
                    placeholder="Байгууллагын нэр"
                  />
                </FormItem>
                <FormItem label="И-мэйл" name="email">
                  <Input name="email" disabled placeholder="И-мэйл" />
                </FormItem>
              </ProfileCard>
            )}

            <ProfileCard title="Хувийн мэдээлэл">
              <FormItem label="Овог" name="lastName" required>
                <Input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Овог"
                />
              </FormItem>

              <FormItem label="Нэр" name="firstName" required>
                <Input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="Нэр"
                />
              </FormItem>
              <FormItem label="Утас" name="phone" required>
                <Input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  maxLength={8}
                  placeholder="Утасны дугаар"
                />
              </FormItem>
            </ProfileCard>
          </Form>
        )}
      </Formik>
    </div>
  );
}
