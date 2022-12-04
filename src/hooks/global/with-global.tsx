/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useLayoutEffect, useState} from 'react';
import {Layout} from 'antd';
import {APILoading} from '@/components/api-loading';
import {Loading} from '@/components/loading';
import {IWithGlobal} from '@custom-type';
import {useGlobalSelector} from '../use-global-selectors';
import {useGlobalAction} from '../use-global-actions';
import {DefaultValues} from './init-data';

const {Content} = Layout;

const initGlobalContext: IWithGlobal = {
  filter: '',
  key: '',
};

const GlobalContext = React.createContext<IWithGlobal>(initGlobalContext);

interface Props {
  renderHeader?: ({
    onSearch,
    onFilter,
  }: {
    onSearch: (values: DefaultValues) => void;
    onFilter: (values: string) => void;
  }) => React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  pageTitle?: string;
}

const WithGlobal: React.FC<Props> = ({
  renderHeader,
  isLoading,
  pageTitle,
  children,
}) => {
  const {pageLoading, apiLoading} = useGlobalSelector();
  const {setPageTitle} = useGlobalAction();

  const [filterKey, setFilterKey] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');

  useLayoutEffect(() => {
    if (pageTitle) {
      setPageTitle(pageTitle.toUpperCase());
    }
  }, [pageTitle]);

  const handleOnSearch = (values: DefaultValues) => {
    setSearchKey(values.key);
  };

  const handleOnFilter = (value: string) => {
    setFilterKey(value);
  };

  const renderHeaderOverride = () => {
    if (renderHeader && typeof renderHeader === 'function') {
      return renderHeader({
        onSearch: handleOnSearch,
        onFilter: handleOnFilter,
      });
    }
    return <React.Fragment />;
  };

  return (
    <GlobalContext.Provider
      value={{
        filter: filterKey,
        key: searchKey,
      }}
    >
      {/* Page init loading */}
      <Loading isLoading={pageLoading} />

      {/* Loading when call API */}
      <APILoading isLoading={isLoading && apiLoading} />

      {/* Render header */}
      {renderHeaderOverride()}

      {/* Render content */}
      <Content className="global-theme">
        <div className="content container-fluid">{children}</div>
      </Content>
    </GlobalContext.Provider>
  );
};

export {WithGlobal, GlobalContext};
