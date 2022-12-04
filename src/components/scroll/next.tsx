/**
 * @app VuonDau
 * @author phutruongck
 */

import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {BiRightArrow} from 'react-icons/bi';
import React, {useContext} from 'react';
import './styles.scss';

interface Props {}

const NextIcon: React.FC<Props> = () => {
  const {scrollNext} = useContext(VisibilityContext);

  return (
    <div className="scroll__icon__container" onClick={() => scrollNext()}>
      <BiRightArrow
        color="#fff"
        size={20}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

NextIcon.displayName = 'NextIcon';
export {NextIcon};
