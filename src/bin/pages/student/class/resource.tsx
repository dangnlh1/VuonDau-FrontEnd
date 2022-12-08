/**
 * @app VuonDau
 * @author phutruongck
 */

import {BsDot} from 'react-icons/bs';
import {Panel} from 'rsuite';
import React from 'react';
import {IResource} from '@custom-type';

interface Props {
  item: IResource;
}

const ResourceItem: React.FC<Props> = React.memo(({item}) => {
  return (
    <Panel header={item.name} collapsible bordered>
      <div>
        {item.modules
          .filter((i) => i.modname === 'lesson')
          .map((i) => {
            return (
              <div className="lesson__item__container">
                <BsDot size={30} />
                <div className="lesson__item__heading">{i.name}</div>
              </div>
            );
          })}
      </div>
    </Panel>
  );
});

ResourceItem.displayName = 'ResourceItem';
export {ResourceItem};
