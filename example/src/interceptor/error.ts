import type { Next, Context } from "onion-interceptor";
import { tap } from "@onion-interceptor/pipes";
export async function errorInterceptor(ctx: Context, next: Next) {
  console.log("errorInterceptor start", ctx);

  await next(
    tap(
      (ctx) => console.log("find error in res", ctx),
      (error) => {
        console.log("errorInterceptor catchError", error);
        return error;
      },
      () => console.log("errorInterceptor end", ctx)
    )
  );
}
