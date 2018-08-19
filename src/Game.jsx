import React from 'react'
import { withStateHandlers } from 'recompose'
import { BaloonStatuses } from './Consts'
import gameStateHandler from './stateHandlers/gameStateHandler'
import Baloon from './stateless/Baloon'
import { nextStatusOf } from './helpers/BaloonHelper'

const Game = withStateHandlers(...gameStateHandler)(function Game ({
  baloons,
  baloonScore,

  changeBaloonStatus,
  breakBaloon,
  bearBaloon
}) {
  return (
    <a-scene vr-mode-ui='enabled: true'>
      {baloons.map(baloon => (
        <Baloon
          key={baloon.index}
          {...baloon}
          onTouch={() => {
            const { status } = baloon
            if (status === BaloonStatuses.AWAITING) {
              breakBaloon(baloon)
            }
          }}
          onStageEnd={() => {
            const { status, index } = baloon
            if (status === BaloonStatuses.GONE) {
              bearBaloon(baloon)
            } else {
              const nextStatus = nextStatusOf(status)
              changeBaloonStatus({ index, status: nextStatus })
            }
          }}
        />
      ))}

      <a-entity
        laser-controls='hand: right'
        raycaster='far: 10'
        oculus-go-controls='hand:right; armModel:true;'
      />
      <a-sky color='#ECECEC' />
    </a-scene>
  )
})

export default Game
