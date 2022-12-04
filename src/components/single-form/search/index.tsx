/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {ElementType, useState} from 'react';
import SearchIcon from '@rsuite/icons/Search';
import {Input, InputGroup} from 'rsuite';
import './styles.scss';

interface Props {
  onChangeInput?: (value: string) => void;
  type?: ElementType<any>;
  isMarginTop?: boolean;
  placeholder?: string;
  required?: boolean;
  label?: string;
  row?: number;
}

const SearchForm: React.FC<Props> = ({
  onChangeInput,
  isMarginTop,
  placeholder,
  required,
  label,
  type,
  row,
}) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = (value: string) => {
    setValue(value);
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
            <div className="react__hook__form__label__required">*</div>
          ) : undefined}
        </div>
      ) : undefined}
      <InputGroup inside>
        <Input
          onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          row={row}
          as={type}
        />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

SearchForm.displayName = 'SearchForm';
export {SearchForm};
