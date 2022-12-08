/**
 * @app SME Web App
 * @author phutruongck
 */

import * as React from 'react';
import {IWithGlobal} from '@custom-type';
import {GlobalContext} from './with-global';

export default function useGlobal<T extends IWithGlobal>(): T {
  const context = React.useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("Couldn't find a context object.");
  }

  return context as T;
}
