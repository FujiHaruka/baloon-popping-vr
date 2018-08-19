import React from 'react'
import {withStateHandlers} from 'recompose'
import {GameStatuses, BaloonStatuses} from './Consts'
import gameStateHandler from './stateHandlers/gameStateHandler'
import Baloon from './stateless/Baloon'
import {nextStatusOf} from './helpers/BaloonHelper'

const Game = withStateHandlers(...gameStateHandler)(
  function Game ({
    baloons,
    // brokenBaloons,

    changeBaloonStatus,
    breakBaloon,
    bearBaloon,
  }) {
    console.log(baloons)
    return (
      <a-scene>
        {
          baloons.map((baloon) =>
            <Baloon
              key={baloon.index}
              {...baloon}
              onTouch={() => {
                const {status} = baloon
                if (status === BaloonStatuses.AWAITING) {
                  breakBaloon(baloon)
                }
              }}
              onStageEnd={() => {
                const {status, index} = baloon
                if (status === BaloonStatuses.GONE) {
                  bearBaloon(baloon)
                } else {
                  const nextStatus = nextStatusOf(status)
                  changeBaloonStatus({index, status: nextStatus})
                }
              }}
            />
          )
        }
        <a-sky color='#ECECEC'></a-sky>
      </a-scene>
    )
  }
)

export default Game
