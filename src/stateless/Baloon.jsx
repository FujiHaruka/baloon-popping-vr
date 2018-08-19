import React from 'react'
import BaloonAmimation from './BaloonAnimation'
import {BaloonSizes, BaloonStatuses} from '../Consts'
import {colorOf, positionOf} from '../helpers/BaloonHelper'

class Baloon extends React.Component {
  render () {
    const {
      type,
      status,
      index,
      stageDuration = 1000,
      onStageEnd,
    } = this.props
    return (
      <a-sphere
        color={colorOf(type)}
        position={positionOf(index)}
        radius={status === BaloonStatuses.BORNING ? 0.01 : BaloonSizes.NORMAL}
        ref={this.ref}
      >
        <BaloonAmimation {...{status, stageDuration, onStageEnd}} />
      </a-sphere>
    )
  }

  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount () {
    const sphere = this.ref.current
    // onMouseEnter prop に与えても反応しない
    // ので、こうやるしかない
    // 関数を一度しかセットしないので不便
    sphere.addEventListener('mouseenter', () => {
      this.props.onTouchLaser()
    })
  }
}

export default Baloon
