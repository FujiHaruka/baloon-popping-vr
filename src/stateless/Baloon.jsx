import React from 'react'
import BaloonAmimation from './BaloonAnimation'
import {BaloonSizes, BaloonTypes, BaloonStatuses} from '../Consts'
import {colorOf, positionOf} from '../helpers/BaloonHelper'

const Baloon = ({
  type,
  status,
  index,
  stageDuration = 1000,
  onTouch,
  onStageEnd,
}) => (
  <a-sphere
    color={colorOf(type)}
    position={positionOf(index)}
    radius={BaloonSizes.NORMAL}
    onMouseEnter={onTouch}
    visible={status === BaloonStatuses.GONE ? 'false' : 'true'}
  >
    {/* アニメーションの変更が反映されない！ */}
    <BaloonAmimation {...{status, stageDuration, onStageEnd}} />
  </a-sphere>
)

export default Baloon
