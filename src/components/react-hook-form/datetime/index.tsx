/**
 * @app VuonDau
 * @author phutruongck
 */

import {DatePicker} from 'rsuite';
import React from 'react';
import {ErrorMessage} from '../error-message';
import {useController} from '../use-form';
import './styles.scss';

interface Props {
  onChangeInput?: (value: Date | null) => void;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
}

const InputDateTime: React.FC<Props> = ({
  placeholder = 'Chọn ngày',
  onChangeInput,
  isMarginTop,
  required,
  label,
  name,
}) => {
  const {
    field: {onChange, value},
  } = useController({
    name,
  });

  const handleOnChange = (value: Date | null) => {
    onChange(value);
    if (onChangeInput && typeof onChangeInput === 'function') {
      onChangeInput(value);
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
      <DatePicker
        onChange={handleOnChange}
        placeholder={placeholder}
        format="dd-MM-yyyy"
        value={value}
        name={name}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

InputDateTime.displayName = 'InputDateTime';
export {InputDateTime};
