/**
 * @app VuonDau
 * @author phutruongck
 */

import {Pagination as BasePagination} from 'antd';
import React from 'react';
import './styles.scss';

interface Props {
  onPageChange?: (page: number, pageSize: number) => void;
  defaultCurrent?: number;
  pageSize?: number;
  total?: number;
}

const Pagination: React.FC<Props> = React.memo(
  ({
    defaultCurrent = 1,
    total = 1,
    pageSize = 20 || process.env.PAGE_SIZE,
    onPageChange,
  }) => {
    const handleOnChange = (page: number, pageSize: number) => {
      if (onPageChange && typeof onPageChange === 'function') {
        onPageChange(page, pageSize);
      }
    };

    return (
      <BasePagination
        defaultPageSize={pageSize}
        onChange={handleOnChange}
        current={defaultCurrent}
        showSizeChanger={false}
        pageSize={pageSize}
        total={total}
      />
    );
  },
);

Pagination.displayName = 'Pagination';
export {Pagination};
