/**
 * @app VuonDau
 * @author phutruongck
 */

import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {lazy} from 'react';
import {LAYOUT_TYPE} from '@/common/constants';
import {WithStudent} from '@/hooks/student';
import {studentPublicRoutes, STUDENT_URL_PAGE} from './student/navigation';
import {teacherPublicRoutes, TEACHER_URL_PAGE} from './teacher/navigation';
import {AppRoute} from './app-route';

const ErrorPage = lazy(() => import('@/pages/common/errors'));

const AppRouter = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <WithStudent>
        <Switch>
          {/* Student Route */}
          {studentPublicRoutes.map(
            ({component: Component, path, exact, type}) => (
              <AppRoute
                component={Component}
                exact={exact}
                path={path}
                type={type}
                key={path}
              />
            ),
          )}
          <Route exact path={['/', '/home']}>
            <Redirect to={STUDENT_URL_PAGE.HOME.PATH} />
          </Route>

          {/* Teacher Route */}
          {teacherPublicRoutes.map(
            ({component: Component, path, exact, type}) => (
              <AppRoute
                component={Component}
                exact={exact}
                path={path}
                type={type}
                key={path}
              />
            ),
          )}
          <Route exact path={['/teacher']}>
            <Redirect to={TEACHER_URL_PAGE.HOME.PATH} />
          </Route>

          {/* Error Route */}
          <AppRoute path="*" component={ErrorPage} type={LAYOUT_TYPE.BLANK} />
        </Switch>
      </WithStudent>
    </Router>
  );
};

export default AppRouter;
