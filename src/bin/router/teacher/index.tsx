/**
 * @app VuonDau
 * @author phutruongck
 */

import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import {teacherPublicRoutes, TEACHER_URL_PAGE} from './navigation';
import {PublicRoute} from './public-route';

interface Props {}

const TeacherRouteComponent: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Route exact path={['/teacher']}>
        <Redirect to={TEACHER_URL_PAGE.HOME.PATH} />
      </Route>
      {teacherPublicRoutes.map(({component: Component, path, exact, type}) => (
        <PublicRoute
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

TeacherRouteComponent.displayName = 'TeacherRouteComponent';
export {TeacherRouteComponent};
