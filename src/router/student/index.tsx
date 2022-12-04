/**
 * @app VuonDau
 * @author phutruongck
 */

import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import {PrivateRoute} from './private-route';
import {PublicRoute} from './public-route';
import {
  studentPublicRoutes,
  studentPrivateRoues,
  STUDENT_URL_PAGE,
} from './navigation';

interface Props {}

const StudentRouteComponent: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Route exact path={['/', '/home']}>
        <Redirect to={STUDENT_URL_PAGE.HOME.PATH} />
      </Route>
      {studentPublicRoutes.map(({component: Component, path, exact, type}) => (
        <PublicRoute
          component={Component}
          exact={exact}
          path={path}
          type={type}
          key={path}
        />
      ))}
      {studentPrivateRoues.map(({component: Component, path, exact, type}) => (
        <PrivateRoute
          component={Component}
          exact={exact}
          path={path}
          type={type}
          key={path}
        />
      ))}
    </React.Fragment>
  );
};

StudentRouteComponent.displayName = 'StudentRouteComponent';
export {StudentRouteComponent};
