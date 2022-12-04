/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {AppRoute} from '@/router/app-route';
import {ILayoutType} from '@custom-type';

interface PublicRouteType {
  type: ILayoutType;
  exact?: boolean;
  component: any;
  path: string;
}

const PublicRoute: React.FC<PublicRouteType> = ({
  component: Component,
  exact,
  path,
  type,
}) => {
  return (
    <AppRoute component={Component} exact={exact} path={path} type={type} />
  );
};

PublicRoute.displayName = 'PublicRoute';
export {PublicRoute};
