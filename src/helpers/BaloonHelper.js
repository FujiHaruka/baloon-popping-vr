import {BaloonColors, BaloonTypes, BaloonStatuses} from '../Consts'

export const colorOf = (type) => {
  switch (type) {
    case BaloonTypes.GOOD:
      return BaloonColors.GOOD
    case BaloonTypes.BAD:
      return BaloonColors.BAD
    default: throw new Error(`Invalid type ${type}`)
  }
}

export const positionOf = (index) => `${index * 2.1 - 3} 0 -5`

export const nextStatusOf = (status) => {
  switch (status) {
    case BaloonStatuses.GONE:
      return BaloonStatuses.BORNING
    case BaloonStatuses.BORNING:
      return BaloonStatuses.AWAITING
    case BaloonStatuses.AWAITING:
      return BaloonStatuses.SHRINGING
    case BaloonStatuses.SHRINGING:
      return BaloonStatuses.GONE
    case BaloonStatuses.BREAKING:
      return BaloonStatuses.GONE
    default:
      throw new Error(`Invalid status ${status}`)
  }
}

export const createBaloons = (number) =>
  new Array(number)
    .fill(null)
    .map((_, i) => ({
      index: i,
      type: BaloonTypes.BAD,
      status: BaloonStatuses.GONE,
      // 最初に BORNING 状態に移行するまでの時間
      stageDuration: Math.random() * 10 * 1000
    }))
