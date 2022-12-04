/**
 * @app VuonDau
 * @author phutruongck
 */

import {selectors as selectorsLoading} from '@/ducks/utils/loading';
import {selectors as layoutSelectors} from '@/ducks/utils/layout';
import {selectors as errorSelectors} from '@/ducks/status-error';
import {StatusErrorType} from '@/ducks/status-error/models';
import {useMemoriedSelector} from '@/hooks';
import {ILayoutType} from '@custom-type';

export const useGlobalSelector = () => {
  const apiLoading: boolean = useMemoriedSelector(
    selectorsLoading.getLoadingIsEnabled,
  );

  const statusError: StatusErrorType = useMemoriedSelector(
    errorSelectors.statusError,
  );

  const getCollapse: boolean = useMemoriedSelector(layoutSelectors.getCollapse);

  const pageTitle: string = useMemoriedSelector(layoutSelectors.getPageTitle);

  const pageLoading: boolean = useMemoriedSelector(
    layoutSelectors.getPageLoading,
  );

  const layoutType: ILayoutType = useMemoriedSelector(
    layoutSelectors.getLayoutType,
  );

  return {
    statusError,
    pageLoading,
    getCollapse,
    apiLoading,
    layoutType,
    pageTitle,
  };
};
