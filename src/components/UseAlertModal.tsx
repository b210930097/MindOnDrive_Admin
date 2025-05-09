'use client';

import type { ModalFuncProps as AntModalFuncProps } from 'antd';
import { App } from 'antd';

interface ModalFuncProps extends AntModalFuncProps {
  icon?: React.ReactNode;
  description?: string | React.ReactNode;
}

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps['type']>,
  ModalFunc
>;

let alertModal: Pick<ModalStaticFunctions, 'confirm'>;

export default function useAlertModal() {
  const staticFunction = App.useApp();

  alertModal = staticFunction.modal;

  const { success, confirm } = staticFunction.modal;

  alertModal.confirm = (props) => {
    const { icon, title, description, type, ..._props } = props;
    if (!icon) {
      if (props?.cancelText)
        return confirm({
          ..._props,
        });
      else
        return success({
          ..._props,
        });
    }
    if (props?.cancelText) {
      if (type === 'confirm') {
        return confirm({
          ..._props,
          className:
            '[&_.ant-modal-content]:w-full [&_.anticon-check-circle]:hidden [&_.anticon-exclamation-circle]:hidden [&_.ant-modal]:h-screen md:[&_.ant-modal-content]:w-[355px] [&_.ant-modal-close]:hover:bg-primary [&_.ant-modal-content]:p-[0px] p-[0px] w-[355px] [&_.ant-modal-confirm-btns]:text-center [&_.ant-modal-confirm-paragraph]:max-w-full [&_.ant-modal-confirm-btns]:m-[0px]',
          content: (
            <div className="flex w-full flex-col items-center justify-center gap-xl px-6xl py-3xl font-sans">
              <div className="flex w-full flex-col items-center justify-center text-center">
                {title && (
                  <div className="w-full text-display-xs font-medium">
                    {title}
                  </div>
                )}
                {description && (
                  <div className="w-full text-text-md font-regular text-secondary">
                    {description}
                  </div>
                )}
              </div>
            </div>
          ),

          icon: null,
          okButtonProps: {
            className:
              'text-text-md text-[#FFFFFF] items-center flex justify-center w-full font-sans font-medium rounded-md m-[0px] h-[44px]',
          },
          cancelButtonProps: {
            className:
              'bg-[#FFFFFF] text-text-md border-[1px] border-primary-light text-primary items-center flex justify-center w-full font-sans h-[44px] font-medium rounded-md m-[0px]',
          },
          footer: (_, { OkBtn }) => {
            return (
              <div className="border-tertiary m-none flex w-full items-center justify-center gap-xl border-none border-t-[1px] border-solid px-6xl pb-6xl pt-3xl">
                <OkBtn />
              </div>
            );
          },
        });
      }
      return confirm({
        ..._props,
        className:
          '[&_.ant-modal-content]:w-full [&_.anticon-check-circle]:hidden [&_.anticon-exclamation-circle]:hidden [&_.ant-modal]:h-screen md:[&_.ant-modal-content]:w-[355px] [&_.ant-modal-close]:hover:bg-primary [&_.ant-modal-content]:p-[0px] p-[0px] w-[355px] [&_.ant-modal-confirm-btns]:text-center [&_.ant-modal-confirm-paragraph]:max-w-full [&_.ant-modal-confirm-btns]:m-[0px]',
        content: (
          <div className="flex w-full flex-col items-start justify-center gap-xl px-6xl py-3xl font-sans">
            <div className="flex w-full flex-col items-start justify-center">
              {title && (
                <div className="w-full text-display-xs font-medium">
                  {title}
                </div>
              )}
              {description && (
                <div className="w-full text-text-md font-regular text-secondary">
                  {description}
                </div>
              )}
            </div>
          </div>
        ),
        icon: null,
        okButtonProps: {
          className:
            'bg-danger text-text-md text-[#FFFFFF] items-center flex justify-center w-full font-sans font-medium rounded-md m-[0px] h-[44px]',
        },
        cancelButtonProps: {
          className:
            'bg-[#FFFFFF] text-text-md border-[1px] border-danger-light text-danger items-center flex justify-center w-full font-sans h-[44px] font-medium rounded-md m-[0px]',
        },
        footer: (_, { OkBtn, CancelBtn }) => {
          return (
            <div className="border-tertiary m-none flex w-full items-center justify-center gap-xl border-none border-t-[1px] border-solid px-6xl pb-6xl pt-3xl">
              <CancelBtn />
              <OkBtn />
            </div>
          );
        },
      });
    } else {
      return success({
        ..._props,
        className:
          '[&_.ant-modal-content]:w-full [&_.anticon-exclamation-circle]:hidden [&_.anticon-check-circle]:hidden [&_.ant-modal]:h-screen md:[&_.ant-modal-content]:w-[345px] [&_.ant-modal-close]:hover:bg-primary [&_.ant-modal-content]:p-[0px] p-[0px] w-[345px] [&_.ant-modal-confirm-btns]:text-center [&_.ant-modal-confirm-paragraph]:max-w-full [&_.ant-modal-confirm-btns]:m-[0px]',
        content: (
          <div className="flex  flex-col items-center justify-center gap-6xl px-6xl py-3xl font-sans">
            <div className="flex w-full flex-col items-center justify-center gap-lg text-center">
              {title && (
                <div className="w-full text-display-xs font-medium">
                  {title}
                </div>
              )}
              {description && (
                <div className="w-[225px] text-text-md font-regular text-secondary">
                  {description}
                </div>
              )}
            </div>
          </div>
        ),
        footer: (_, { OkBtn }) => {
          return (
            <div className="m-none flex w-full items-center justify-center px-6xl pb-6xl pt-3xl">
              <OkBtn />
            </div>
          );
        },
      });
    }
  };
  return null;
}

export { alertModal };
