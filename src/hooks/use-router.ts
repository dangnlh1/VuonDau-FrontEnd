/**
 * @app VuonDau
 * @author phutruongck
 */

import queryString from 'query-string';
import {useMemo} from 'react';
import {
  useRouteMatch,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';

export const useRouter = <
  T extends {[K in keyof T]?: string | undefined},
>() => {
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams<T>();
  const history = useHistory();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      } as T,
      match,
      location,
      history,
      params,
      goBack: () => history.goBack(),
    };
  }, [params, match, location, history]);
};
