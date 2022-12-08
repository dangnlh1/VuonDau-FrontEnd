/**
 * @app VuonDau
 * @author phutruongck
 */

import Lottie from 'react-lottie';
import React from 'react';
import buttonLoading from '@/assets/animations/button-loading.json';
import './styles.scss';

type Props = {
  isLoading?: boolean;
};

const APILoading: React.FC<Props> = ({isLoading}) => {
  return isLoading ? (
    <div className="loading-container">
      <div className="loading"></div>
      <Lottie
        isClickToPauseDisabled
        height={200}
        width={200}
        options={{
          animationData: buttonLoading,
          autoplay: true,
          loop: true,
        }}
      />
    </div>
  ) : (
    <React.Fragment />
  );
};

APILoading.displayName = 'APILoading';
export {APILoading};
