/**
 * @app VuonDau
 * @author phutruongck
 */

import {SelectPicker} from 'rsuite';
import React from 'react';
import {ItemType} from '@custom-type';
import {ErrorMessage} from '../error-message';
import {useController} from '../use-form';

interface Props {
  onChangeDropdown?: (value: string) => void;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  items: ItemType[];
  label?: string;
  name: string;
}

const Dropdown: React.FC<Props> = ({
  placeholder = 'Chọn một',
  onChangeDropdown,
  isMarginTop,
  required,
  label,
  items,
  name,
}) => {
  const {
    field: {onChange, value},
  } = useController({
    name,
  });

  const handleOnChange = (value: any) => {
    onChange(value);
    if (onChangeDropdown && typeof onChangeDropdown === 'function') {
      onChangeDropdown(value);
    }
  };

  return (
    <div
      className="react__hook__form__input"
      style={{
        marginTop: isMarginTop ? 10 : 0,
      }}
    >
      {label ? (
        <div className="react__hook__form__label">
          {label}
          {required ? (
            <div className="react__hook__form__label__required">&nbsp;*</div>
          ) : undefined}
        </div>
      ) : undefined}
      <SelectPicker
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        data={items}
        locale={{
          noResultsText: 'Không tìm thấy dữ liệu!',
          emptyMessage: 'Không có dữ liệu!',
          searchPlaceholder: 'Tìm kiếm',
        }}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
export {Dropdown};
