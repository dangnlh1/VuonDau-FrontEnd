/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {
  ToastPosition,
  ToastContent,
  TypeOptions,
  Bounce,
  toast,
  Id,
} from 'react-toastify';

interface Props {
  type?: 'error' | 'success' | 'loading' | 'info' | string;
  message?: string | React.ReactNode;
  resultType?: TypeOptions;
  position?: ToastPosition;
  onClose?: Function;
  id?: Id;
}

const initToast: ToastContent = {
  pauseOnFocusLoss: false,
  position: 'top-center',
  hideProgressBar: true,
  pauseOnHover: false,
  closeOnClick: true,
  draggable: false,
  autoClose: 2000,
  theme: 'dark',
};

export const showToast = ({
  position = 'top-center',
  resultType = 'success',
  onClose,
  message,
  id = '',
  type,
}: Props) => {
  switch (type) {
    case 'success': {
      return toast.success(message, {
        ...initToast,
        position,
        onClose: () => {
          if (typeof onClose === 'function' && onClose) {
            onClose();
          }
        },
      });
    }
    case 'info': {
      return toast.info(message, {
        ...initToast,
        onClose: () => {
          if (typeof onClose === 'function' && onClose) {
            onClose();
          }
        },
      });
    }
    case 'error': {
      return toast.error(message, {
        ...initToast,
        onClose: () => {
          if (typeof onClose === 'function' && onClose) {
            onClose();
          }
        },
      });
    }
    case 'loading': {
      return toast(message, {
        autoClose: false,
        isLoading: true,
        theme: 'dark',
      });
    }
    case 'notification': {
      return toast(message, {
        pauseOnFocusLoss: true,
        hideProgressBar: false,
        pauseOnHover: true,
        isLoading: false,
        autoClose: 5000,
        theme: 'dark',
        position,
      });
    }
    case 'setToast': {
      return toast.update(id, {
        ...initToast,
        type: resultType,
        transition: Bounce,
        isLoading: false,
        onClose: () => {
          if (typeof onClose === 'function' && onClose) {
            onClose();
          }
        },
      });
    }
    default: {
      return toast(message, {
        ...initToast,
        position,
        onClose: () => {
          if (typeof onClose === 'function' && onClose) {
            onClose();
          }
        },
      });
      return '';
    }
  }
};
