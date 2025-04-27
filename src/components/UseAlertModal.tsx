'use client';

import { useState } from 'react';
import { App, Button, Modal } from 'antd';
import { XClose } from '@untitled-ui/icons-react';
import type { ModalFuncProps as AntModalFuncProps } from 'antd';

interface ModalFuncProps extends AntModalFuncProps {
  base?:
    | 'copy'
    | 'success'
    | 'error'
    | 'warning'
    | 'noitemscard'
    | 'noconnection'
    | 'emptyinbox'
    | 'card';
  description?: string | React.ReactNode;
  copyToClipboard?: (text: string) => void;
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

type Props = {
  base?:
    | 'copy'
    | 'success'
    | 'error'
    | 'warning'
    | 'noitemscard'
    | 'noconnection'
    | 'emptyinbox'
    | 'card';
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  onCancel?: () => void;
  closable?:
    | boolean
    | ({
        closeIcon?: React.ReactNode;
      } & React.AriaAttributes);
  copyToClipboard?: (text: string) => void;
};

function AlertContent({
  base = 'warning',
  title,
  description,
  onCancel,
  closable = false,
  copyToClipboard,
}: Props) {
  const [buttonText, setButtonText] = useState('Copy link');

  const closeModal = () => {
    onCancel && onCancel();
    Modal.destroyAll();
  };

  const handleCopy = () => {
    if (copyToClipboard) {
      copyToClipboard(`${window.location.origin}${window.location.pathname}`);
      setButtonText('Copied');
    }
  };

  return (
    <div
      className={`${base === 'copy' ? '' : 'pb-3xl'} flex w-full flex-col items-center justify-center`}
    >
      {closable && (
        <div className="absolute right-[30px] top-[30px]">
          <Button
            className="rounded-4xl border-secondary hover:bg-secondary"
            icon={<XClose className="text-secondary" />}
            onClick={closeModal}
          />
        </div>
      )}
      <div className="relative">
        {base === 'copy' && (
          <img
            alt=""
            src="/assets/alert/copyBackground.svg"
            width={250}
            height={200}
          />
        )}
        <img
          alt=""
          src={`/assets/alert/${base}.svg`}
          width={250}
          height={200}
          className={
            base === 'copy'
              ? 'absolute bottom-[11px] left-none'
              : 'flex items-center'
          }
        />
      </div>
      {title || description ? (
        <div className="flex w-full flex-col items-center justify-center gap-xs">
          {title && (
            <div className="font-okta text-subtitle text-center font-bold text-primary">
              {title}
            </div>
          )}
          {description && (
            <div className="font-okta text-subtitle2 text-center font-medium text-secondary">
              {description}
            </div>
          )}

          {base === 'copy' && (
            <div className="font-okta text-subtitle2 mt-xl text-center text-secondary">
              <Button
                type="primary"
                onClick={handleCopy}
                className="font-okta text-subtitle2 font-normal !h-[55px] !w-[311px] bg-brand"
              >
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function useAlertModal() {
  const staticFunction = App.useApp();

  alertModal = staticFunction.modal;

  const { success, confirm } = staticFunction.modal;

  alertModal.confirm = (props) => {
    const {
      base,
      title,
      description,
      onCancel,
      closable,
      copyToClipboard,
      ..._props
    } = props;
    if (!base) {
      if (props?.cancelText)
        return confirm({
          ..._props,
        });
      else
        return success({
          ..._props,
        });
    }
    if (props?.cancelText)
      return confirm({
        ..._props,
        className:
          '[&_.ant-modal-content]:w-full [&_.ant-modal]:h-screen md:[&_.ant-modal-content]:w-[450px] p-[0px] w-[450px] [&_.ant-modal-content]:px-7xl [&_.ant-modal-content]:pt-4xl [&_.ant-modal-content]:pb-6xl [&_.ant-modal-confirm-btns]:text-center [&_.ant-modal-confirm-paragraph]:max-w-full [&_.ant-modal-confirm-btns]:m-[0px]',
        content: (
          <AlertContent
            title={title}
            description={description}
            base={base}
            onCancel={onCancel}
            closable={closable}
            copyToClipboard={copyToClipboard}
          />
        ),
        icon: null,
        okButtonProps: {
          className:
            'bg-brand text-subtitle2 items-center flex justify-center w-full font-okta font-medium rounded-[15px] m-[0px] h-[50px]',
        },
        cancelButtonProps: {
          className:
            'bg-[#FFFFFF] text-subtitle2 border border-secondary text-primary items-center flex justify-center w-full h-[50px] font-okta font-medium rounded-[15px] m-[0px]',
        },
        footer: (_, { OkBtn, CancelBtn }) => {
          return (
            <div className="m-none flex w-full items-center justify-center gap-5xl">
              <CancelBtn />
              <OkBtn />
            </div>
          );
        },
      });
    else
      return success({
        ..._props,
        className:
          '[&_.ant-modal-content]:w-full md:[&_.ant-modal-content]:w-[450px] p-[0px] w-[450px] [&_.ant-modal-content]:px-7xl [&_.ant-modal-content]:pt-4xl [&_.ant-modal-content]:pb-6xl [&_.ant-modal-confirm-btns]:text-center [&_.ant-modal-confirm-paragraph]:max-w-full [&_.ant-modal-confirm-btns]:m-[0px]',
        content: (
          <AlertContent
            title={title}
            description={description}
            base={base}
            onCancel={onCancel}
            closable={closable}
            copyToClipboard={copyToClipboard}
          />
        ),
        icon: null,
        okButtonProps: {
          className:
            'bg-brand text-subtitle2 items-center flex justify-center w-full font-okta font-medium rounded-[15px] m-[0px] h-[50px]',
        },
        footer: (_, { OkBtn }) => {
          if (base === 'copy') return;
          return <OkBtn />;
        },
      });
  };
  return null;
}
export { alertModal };
