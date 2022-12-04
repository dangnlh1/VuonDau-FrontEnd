/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {AppRoute} from '@/router/app-route';
import {ILayoutType} from '@custom-type';

interface PrivateRouteType {
  type: ILayoutType;
  exact?: boolean;
  component: any;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteType> = ({
  component: Component,
  exact,
  path,
  type,
}) => {
  return (
    <AppRoute component={Component} exact={exact} path={path} type={type} />
  );
};

PrivateRoute.displayName = 'PrivateRoute';
export {PrivateRoute};
