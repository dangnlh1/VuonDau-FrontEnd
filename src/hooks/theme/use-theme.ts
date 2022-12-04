/**
 * @app VuonDau
 * @author phutruongck
 */

import * as React from 'react';
import {ITheme} from '@custom-type';
import {ThemeContext} from './with-theme';

export default function useTheme<T extends ITheme>(): T {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Couldn't find a context object.");
  }

  return context as T;
}
