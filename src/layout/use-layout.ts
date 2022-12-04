/**
 * @app VuonDau
 * @author phutruongck
 */

import * as React from 'react';
import {ILayoutContext} from '@custom-type';
import {LayoutContext} from './with-layout';

export default function useLayout<T extends ILayoutContext>(): T {
  const context = React.useContext(LayoutContext);

  if (context === undefined) {
    throw new Error("Couldn't find a context object.");
  }

  return context as T;
}
