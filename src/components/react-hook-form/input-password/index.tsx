/**
 * @app VuonDau
 * @author phutruongck
 */

import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import {Input, InputGroup} from 'rsuite';
import React, {useState} from 'react';
import {ErrorMessage} from '../error-message';
import {useController} from '../use-form';

interface Props {
  onChangeInput?: (value: string) => void;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
}

const InputPassword: React.FC<Props> = ({
  onChangeInput,
  placeholder,
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

  const [visible, setVisible] = useState(false);

  const handleOnChange = (value: string) => {
    onChange(value);
    if (onChangeInput && typeof onChangeInput === 'function') {
      onChangeInput(value);
    }
  };

  const handleOnChangeVisible = () => {
    setVisible(!visible);
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
      <InputGroup inside>
        <Input
          type={visible ? 'text' : 'password'}
          onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          name={name}
        />
        <InputGroup.Button onClick={handleOnChangeVisible}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
      </InputGroup>
      <ErrorMessage name={name} />
    </div>
  );
};

InputPassword.displayName = 'InputPassword';
export {InputPassword};
