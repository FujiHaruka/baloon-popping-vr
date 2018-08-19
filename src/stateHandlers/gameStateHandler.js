import {GameStatuses, BaloonStatuses, BaloonTypes} from '../Consts'
import {createBaloons} from '../helpers/BaloonHelper'
import {replace} from '../helpers/ArrayHelper'

const gameStateHandler = [
  (props) => ({
    // status: GameStatuses.INIT,
    status: GameStatuses.PLAYING,
    baloons: createBaloons(4),
    brokenBaloons: 0,
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
    resetBrokenBaloons: () => () => ({brokenBaloons: 0}),

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
        })
      }
    },

    /**
     * 風船を割る
     */
    breakBaloon: ({baloons, brokenBaloons}) => ({index}) => {
      const baloon = baloons[index]
      if (!baloon) {
        throw new Error(`Baloon at ${index} not found`)
      }
      // TODO: GOOD / BAD で変える
      return {
        baloons: replace(baloons).at(index).with({
          ...baloon,
          status: BaloonStatuses.BREAKING,
        }),
        brokenBaloons: brokenBaloons + 1,
      }
    },

    /**
     * 風船を生み出す
     */
    bearBaloon: ({baloons}) => ({index}) => {
      const baloon = baloons[index]
      if (!baloon) {
        throw new Error(`Baloon at ${index} not found`)
      }
      if (baloon.status !== BaloonStatuses.GONE) {
        throw new Error(`Baloon status is not GONE`)
      }
      return {
        baloons: replace(baloons).at(index).with({
          index,
          type: Math.random() > 0.7 ? BaloonTypes.GOOD : BaloonTypes.BAD,
          status: BaloonStatuses.BORNING,
          stageDuration: Math.random() * 10 * 1000,
        })
      }
    }
  }
]

export default gameStateHandler
