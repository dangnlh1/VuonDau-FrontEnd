/**
 * @app VuonDau
 * @author phutruongck
 */

import Lottie from 'react-lottie';
import React from 'react';
import layoutLoading from '@/assets/animations/layout-loading.json';
import './styles.scss';

type Props = {
  isLoading: boolean;
};

const Loading: React.FC<Props> = ({isLoading}) => {
  return (
    <React.Fragment>
      {isLoading && (
        <div className="loading-container">
          <div className="loading"></div>
          <Lottie
            options={{
              animationData: layoutLoading,
              autoplay: true,
              loop: true,
            }}
            isClickToPauseDisabled
            height={200}
            width={200}
          />
        </div>
      )}
    </React.Fragment>
  );
};

Loading.displayName = 'Loading';
export {Loading};
