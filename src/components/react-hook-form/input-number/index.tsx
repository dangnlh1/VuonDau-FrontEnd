/**
 * @app VuonDau
 * @author phutruongck
 */

import {InputNumber} from 'rsuite';
import React from 'react';
import {ErrorMessage} from '../error-message';
import {useController} from '../use-form';
import './styles.scss';

interface Props {
  onChangeInput?: (value: string | number) => void;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
}

const FormInputNumber: React.FC<Props> = ({
  onChangeInput,
  isMarginTop,
  placeholder,
  required,
  label,
  name,
}) => {
  const {
    field: {onChange, value},
  } = useController({
    name,
  });

  const handleOnChange = (value: string | number) => {
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
      <InputNumber
        onChange={handleOnChange}
        placeholder={placeholder}
        value={value}
        name={name}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

FormInputNumber.displayName = 'FormInputNumber';
export {FormInputNumber};
