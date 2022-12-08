/**
 * @app VuonDau
 * @author phutruongck
 */

import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import {ADMIN_URL_PAGE, ADMIN_ROOT_URL, adminRoutes} from './navigation';
import {AdminRoute} from './route';

export const adminRouterComponent = () => {
  return (
    <React.Fragment>
      {/* <Route exact path={['/', ADMIN_ROOT_URL.USER]}>
        <Redirect to={ADMIN_URL_PAGE.USER.CHILD.ACCOUNT} />
      </Route>
      <Route exact path={ADMIN_ROOT_URL.ORDER}>
        <Redirect to={ADMIN_URL_PAGE.ORDER.CHILD.CREATE_CERTIFICATE} />
      </Route>
      {adminRoutes.map(({component: Component, path, exact, type}) => (
        <AdminRoute
          component={Component}
          exact={exact}
          path={path}
          type={type}
          key={path}
        />
      ))} */}
    </React.Fragment>
  );
};
