import type { Context, Next } from "onion-interceptor";

import { operate } from "onion-interceptor";

type Cb = (ctx: Context) => void;
type ErrCb = (err: unknown) => void;
type FinalizeCb = () => void;

export const tap = function (cb: Cb, errCb?: ErrCb, finalizeCb?: FinalizeCb) {
  return operate(async (ctx: Context, next: Next) => {
    try {
      await next();
      cb(ctx);
    } catch (error) {
      throw errCb?.(error) ?? error;
    } finally {
      finalizeCb?.();
    }
  });
};
