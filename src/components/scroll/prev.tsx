/**
 * @app VuonDau
 * @author phutruongck
 */

import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {BiLeftArrow} from 'react-icons/bi';
import React, {useContext} from 'react';
import './styles.scss';

interface Props {}

const PrevIcon: React.FC<Props> = () => {
  const {scrollPrev} = useContext(VisibilityContext);

  return (
    <div className="scroll__icon__container" onClick={() => scrollPrev()}>
      <BiLeftArrow
        color="#fff"
        size={20}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

PrevIcon.displayName = 'PrevIcon';
export {PrevIcon};
