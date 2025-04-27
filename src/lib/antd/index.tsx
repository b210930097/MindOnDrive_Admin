import { App, ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import UseAlertModal from '@/components/UseAlertModal';
import UseAntApp from '@/components/UseAntApp';
import theme from './themeConfig';

export default function AntConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <UseAntApp />
        <UseAlertModal />
        <AntdRegistry>{children}</AntdRegistry>
      </App>
    </ConfigProvider>
  );
}
