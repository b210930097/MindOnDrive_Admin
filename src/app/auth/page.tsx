'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { Form } from 'antd';
import { Input, Button, FormItem, Tabs } from '@/components';
import { Mail01, Lock01 } from '@untitled-ui/icons-react';
import * as Yup from 'yup';
import { message } from 'antd';
import { Routes } from '@/config/routes';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Имэйл хаягаа оруулна уу')
    .email('Буруу имэйл хаяг байна'),
  password: Yup.string()
    .required('Нууц үгээ оруулна уу')
    .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
});

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        message.success('Амжилттай нэвтэрлээ!');
        router.push(Routes.Home.Index.route);
      } else {
        message.error('Имэйл эсвэл нууц үг буруу байна!');
      }
    } catch (error) {
      console.error(error);
      message.error('Нэвтрэхэд алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <div className="p-8 flex w-full flex-col items-center justify-center lg:w-1/2">
        <div className=" flex w-full max-w-md flex-col items-center gap-3xl">
          <h1 className="text-center text-[60px] font-bold text-secondary">
            Нэвтрэх
          </h1>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form
                onFinish={handleSubmit}
                layout="vertical"
                className="space-y-md"
              >
                <FormItem name="email" label="Имэйл" required>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Имэйл хаягаа оруулна уу"
                    leftIcon={<Mail01 />}
                    size="large"
                    disabled={loading}
                  />
                </FormItem>

                <FormItem name="password" label="Нууц үг" required>
                  <Input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Нууц үгээ оруулна уу"
                    leftIcon={<Lock01 />}
                    size="large"
                    disabled={loading}
                  />
                </FormItem>

                <div className="flex w-full justify-end">
                  <Button size="small" type="link">
                    Нууц үг мартсан
                  </Button>
                </div>

                <Button
                  htmlType="submit"
                  className="min-w-[330px]"
                  size="large"
                  loading={loading}
                >
                  Нэвтрэх
                </Button>
              </Form>
            )}
          </Formik>
          <Tabs
            items={[
              {
                label: 'Ажлын',
                key: '1',
                number: 2,
              },
              {
                label: 'Хувийн',
                key: '2',
                number: 2,
                disabled: true,
              },
            ]}
          />
        </div>
      </div>

      <div className="hidden w-1/2 items-center justify-center bg-primary lg:flex">
        <img
          src="/images/MapleLeaf.png"
          alt="Login Illustration"
          className="max-h-[500px] object-contain"
        />
      </div>
    </div>
  );
}
