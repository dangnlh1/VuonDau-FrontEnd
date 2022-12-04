/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useImperativeHandle, useState} from 'react';
import {ModalSize} from 'rsuite/esm/Modal/Modal';
import {Modal as ModalBase} from 'rsuite';
import {wait} from '@/common/function';

interface Props {
  footer?: (data?: any) => React.ReactNode;
  body?: (data?: any) => React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  size?: ModalSize;
}

export interface ModalRef {
  onClose: Function;
  visible: boolean;
  onOpen: Function;
}

const Modal = React.forwardRef(
  ({size = 'lg', title, body, onClose, footer}: Props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      () => ({
        onOpen() {
          showModal();
        },
        onClose() {
          handleOnClose();
        },
        visible: open,
      }),
      [open],
    );

    const showModal = () => {
      setOpen(true);
    };

    const handleOnClose = () => {
      setOpen(false);
      wait(500).then(() => {
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
      });
    };

    const renderFooter = (): React.ReactNode => {
      return footer ? (
        <ModalBase.Footer>{footer()}</ModalBase.Footer>
      ) : undefined;
    };

    const renderBody = (): React.ReactNode => {
      return body ? <ModalBase.Body>{body()}</ModalBase.Body> : undefined;
    };

    return (
      <ModalBase size={size} open={open} onClose={handleOnClose}>
        <ModalBase.Header>
          <ModalBase.Title>{title}</ModalBase.Title>
        </ModalBase.Header>
        {renderBody()}
        {renderFooter()}
      </ModalBase>
    );
  },
);

Modal.displayName = 'Modal';
export {Modal};
