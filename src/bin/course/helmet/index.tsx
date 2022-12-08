/**
 * @app VuonDau
 * @author phutruongck
 */

import {Helmet as HelmetBase} from 'react-helmet';
import React from 'react';

interface Props {
  title?: string;
}

const Helmet: React.FC<Props> = React.memo(({title}) => {
  return (
    <HelmetBase>
      <title>{`${title} | ${process.env.REACT_APP_TITLE}`}</title>
    </HelmetBase>
  );
});

Helmet.displayName = 'Helmet';
export {Helmet};
