/**
 * @app VietDangDental
 * @author TruongTV
 */

import {useController} from 'react-hook-form';
import React from 'react';
import './styles.scss';

type Props = {
  name: string;
};

const ErrorMessage: React.FC<Props> = ({name}) => {
  const {
    fieldState: {error},
  } = useController({
    name,
  });

  return error?.message ? (
    <div className="error-message">{error.message}</div>
  ) : (
    <React.Fragment />
  );
};

ErrorMessage.displayName = 'ErrorMessage';
export {ErrorMessage};
