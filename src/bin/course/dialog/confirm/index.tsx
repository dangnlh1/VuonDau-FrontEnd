import {Popconfirm} from 'antd';
import React, {useImperativeHandle, useState} from 'react';

type Props = {
  children?: React.ReactNode;
  onConfirm?: Function;
  onCancel?: Function;
  title?: string;
};

export type ConfirmDialogRef = {
  onConfirm: Function;
  onClose: Function;
};

const ConfirmDialog = React.forwardRef(
  ({children, onConfirm, onCancel, title}: Props, ref) => {
    const handleOnCancel = () => {
      if (typeof onCancel === 'function') {
        onCancel();
      }
    };

    const handleOnConfirm = () => {
      if (typeof onConfirm === 'function') {
        onConfirm();
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        onCancel() {
          handleOnCancel();
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    return (
      <Popconfirm
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
        cancelText="Không"
        title={title}
        okText="Có"
      >
        {children}
      </Popconfirm>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';
export {ConfirmDialog};
