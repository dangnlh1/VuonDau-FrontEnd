/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {ElementType} from 'react';
import {Input} from 'rsuite';
import {ErrorMessage} from '../error-message';
import {useController} from '../use-form';
import './styles.scss';

interface Props {
  onChangeInput?: (value: string) => void;
  type?: ElementType<any>;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
  row?: number;
}

const FormInput: React.FC<Props> = ({
  onChangeInput,
  isMarginTop,
  placeholder,
  required,
  label,
  type,
  name,
  row,
}) => {
  const {
    field: {onChange, value},
  } = useController({
    name,
  });

  const handleOnChange = (value: string) => {
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
      <Input
        onChange={handleOnChange}
        placeholder={placeholder}
        value={value}
        name={name}
        row={row}
        as={type}
      />
      <ErrorMessage name={name} />
    </div>
  );
};

FormInput.displayName = 'FormInput';
export {FormInput};
