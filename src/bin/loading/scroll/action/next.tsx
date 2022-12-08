/**
 * @app VuonDau
 * @author phutruongck
 */

import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { BiRightArrow } from 'react-icons/bi'
import React, { useContext } from 'react'
import { GLOBAL_COLORS } from '@/bin/common/theme'

interface Props {}

const NextRelativeIcon: React.FC<Props> = () => {
  const { scrollNext } = useContext(VisibilityContext)

  return (
    <div onClick={() => scrollNext()}>
      <BiRightArrow
        color={GLOBAL_COLORS.PRIMARY}
        size={20}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

NextRelativeIcon.displayName = 'NextRelativeIcon'
export { NextRelativeIcon }
