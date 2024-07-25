import type { Opeartion } from './types'
import { isOpeartionKey } from './constants'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * Determines whether it is an operator.
 * @param val
 */
export const isOperation = (val: unknown): val is Function & Opeartion =>
  isFunction(val) && (val as Opeartion)[isOpeartionKey] === true

export const isNil = (val: unknown): val is null | undefined => val == null