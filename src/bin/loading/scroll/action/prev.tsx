/**
 * @app VuonDau
 * @author phutruongck
 */

import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { BiLeftArrow } from 'react-icons/bi'
import React, { useContext } from 'react'
import { GLOBAL_COLORS } from '@/bin/common/theme'

interface Props {}

const PrevRelativeIcon: React.FC<Props> = () => {
  const { scrollPrev } = useContext(VisibilityContext)

  return (
    <div onClick={() => scrollPrev()}>
      <BiLeftArrow
        color={GLOBAL_COLORS.PRIMARY}
        size={20}
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

PrevRelativeIcon.displayName = 'PrevRelativeIcon'
export { PrevRelativeIcon }
