/**
 * @app VuonDau
 * @author phutruongck
 */

import React from 'react';
import {Carousel as CarouselBase} from 'rsuite';

interface Props {
  data: string[];
}

const Carousel: React.FC<Props> = React.memo(({data}) => {
  return (
    <div>
      <CarouselBase autoplay>
        {data.map((item: string, index: number) => (
          <img src={item} key={index} />
        ))}
      </CarouselBase>
    </div>
  );
});

Carousel.displayName = 'Carousel';
export {Carousel};
