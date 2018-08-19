import {GameStatuses, BaloonStatuses, BaloonTypes, Times} from '../Consts'
import {createBaloons} from '../helpers/BaloonHelper'
import {replace} from '../helpers/ArrayHelper'

const gameStateHandler = [
  (props) => ({
    // status: GameStatuses.INIT,
    status: GameStatuses.PLAYING,
    baloons: createBaloons(4),
    baloonScore: 0,
  }), {
    /**
     * ゲーム開始
     */
    startGame: () => () => ({status: GameStatuses.PLAYING}),
    /**
     * ゲーム終了
     */
    finishGame: () => () => ({status: GameStatuses.OVER}),

    /**
     * 割った風船の数をリセット
     */
    resetbaloonScore: () => () => ({baloonScore: 0}),

    /**
     * ある風船のステータスを変更する
     */
    changeBaloonStatus: ({baloons}) => ({index, status}) => {
      const baloon = baloons[index]
      if (!baloon) {
        throw new Error(`Baloon at ${index} not found`)
      }
      return {
        baloons: replace(baloons).at(index).with({
          ...baloon,
          status,
          stageDuration: Math.random() * Times.GONE_MAX_TIME * 1000,
        })
      }
    },

    /**
     * 風船を割る
     */
    breakBaloon: ({baloons, baloonScore}) => (baloon) => {
      const nextScore = baloon.type === BaloonTypes.GOOD
        ? baloonScore + 1
        : Math.max(baloonScore - 1, 0)
      return {
        baloons: replace(baloons).at(baloon.index).with({
          ...baloon,
          status: BaloonStatuses.BREAKING,
          stageDuration: Math.random() * Times.GONE_MAX_TIME * 1000,
        }),
        baloonScore: nextScore,
      }
    },

    /**
     * 風船を生み出す
     */
    bearBaloon: ({baloons}) => (baloon) => {
      if (baloon.status !== BaloonStatuses.GONE) {
        throw new Error(`Baloon status is not GONE`)
      }
      return {
        baloons: replace(baloons).at(baloon.index).with({
          index: baloon.index,
          type: Math.random() > 0.7 ? BaloonTypes.GOOD : BaloonTypes.BAD,
          status: BaloonStatuses.BORNING,
          stageDuration: Math.random() * Times.AWAITING_MAX_TIME * 1000,
        })
      }
    }
  }
]

export default gameStateHandler
