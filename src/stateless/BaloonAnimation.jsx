import React from 'react'
import {BaloonStatuses, BaloonSizes} from '../Consts'
import animation from '../hoc/animation'

const BaloonAnimation = animation(({
  status,
  stageDuration,
  onStageEnd,
}) => {
  switch (status) {
    // GONE と AWAITING はアニメーションがないが次の状態に移行するためのイベントだけ保持する
    case BaloonStatuses.GONE:
      return (
        <a-animation
          dur={stageDuration}
          onAnimationEnd={onStageEnd}
          attribute='visible'
          from='false'
          to='false'
        />
      )
    case BaloonStatuses.AWAITING:
      return (
        <a-animation
          dur={stageDuration}
          onAnimationEnd={onStageEnd}
          attribute='visible'
          from='true'
          to='true'
        />
      )
    case BaloonStatuses.BORNING:
      return (
        <a-animation
          attribute='radius'
          from={0.01}
          to={BaloonSizes.NORMAL}
          dur={500}
          onAnimationEnd={onStageEnd}
        />
      )
    case BaloonStatuses.SHRINGING:
      return (
        <a-animation
          attribute='radius'
          from={BaloonSizes.NORMAL}
          to={0.01}
          dur={500}
          onAnimationEnd={onStageEnd}
        />
      )
    case BaloonStatuses.BREAKING:
      return (
        <a-animation
          attribute='opacity'
          from={1}
          to={0}
          dur={500}
          onAnimationEnd={onStageEnd}
        />
      )
    default: throw new Error(`Invalid baloon status: ${status}`)
  }
})

export default BaloonAnimation
